<?php
session_start();
include '../includes/databaseConnection.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}
if (!isset($_SESSION['user_id'])) {
    echo "<script>alert('Please login first.'); window.location.href='../frontend/login.html';</script>";
    exit;
}
$categoryName = strtolower(trim($_POST['complaint-type'] ?? ''));
$subject      = mysqli_real_escape_string($conn, $_POST['subject'] ?? '');
$location     = mysqli_real_escape_string($conn, $_POST['location'] ?? '');
$priorityRaw  = strtolower(trim($_POST['priorityLevel'] ?? ''));
$description  = mysqli_real_escape_string($conn, $_POST['description'] ?? '');
$priorityMap = [
    'high' => 'High',
    'medium' => 'Medium',
    'low' => 'Low'
];
$priority = $priorityMap[$priorityRaw] ?? 'Low';
// Normalize category names to match departments
$categoryAliases = [
    'roaddamage' => 'Roads Department',
    'road' => 'Roads Department',
    'watersupply' => 'Water Supply Department',
    'water' => 'Water Supply Department',
    'electricity' => 'Electricity Authority',
    'corruption' => 'Anti-Corruption Commission',
    'anticorruption' => 'Anti-Corruption Commission',
    'other' => 'Other'
];
$normalizedCategory = $categoryAliases[$categoryName] ?? ucfirst($categoryName);
$categoryId = null;
$stmt = $conn->prepare('SELECT category_id FROM complaintcategories WHERE LOWER(category_name) = LOWER(?) LIMIT 1');
$stmt->bind_param('s', $normalizedCategory);
$stmt->execute();
$res = $stmt->get_result();
if ($res && $res->num_rows === 1) {
    $row = $res->fetch_assoc();
    $categoryId = (int)$row['category_id'];
} else {
    $insertCat = $conn->prepare('INSERT INTO complaintcategories(category_name) VALUES (?)');
    $insertCat->bind_param('s', $normalizedCategory);
    if (!$insertCat->execute()) {
        echo "<script>alert('Failed to create category.'); window.history.back();</script>";
        exit;
    }
    $categoryId = $insertCat->insert_id;
    $insertCat->close();
}
$stmt->close();
$attachmentPath = '';
if (!empty($_FILES['attachment']['name'])) {
    $uploadsDir = realpath(__DIR__ . '/../uploads');
    if ($uploadsDir === false) {
        $uploadsDir = __DIR__ . '/../uploads';
    }
    $complaintsDir = $uploadsDir . '/complaints';
    if (!is_dir($complaintsDir)) {
        @mkdir($complaintsDir, 0755, true);
    }

    $safeName = preg_replace('/[^A-Za-z0-9_.-]/', '_', basename($_FILES['attachment']['name']));
    $uniqueName = time() . '_' . $safeName;
    $targetPath = $complaintsDir . '/' . $uniqueName;

    if (move_uploaded_file($_FILES['attachment']['tmp_name'], $targetPath)) {
        // Save relative path for DB
        $attachmentPath = 'uploads/complaints/' . $uniqueName;
    }
}
$citizenId = (int)($_SESSION['user_id'] ?? 0);
if ($citizenId <= 0) {
    echo "<script>alert('Invalid user session.'); window.location.href='../frontend/login.html';</script>";
    exit;
}

// Find department based on complaint category
$departmentId = null;

error_log("DEBUG: Looking for department: '$normalizedCategory'");

$depStmt = $conn->prepare('SELECT department_id FROM departments WHERE LOWER(department_name) = LOWER(?) LIMIT 1');
$depStmt->bind_param('s', $normalizedCategory);
$depStmt->execute();
$depRes = $depStmt->get_result();

if ($depRes && $depRes->num_rows === 1) {
    $depRow = $depRes->fetch_assoc();
    $departmentId = (int)$depRow['department_id'];
    error_log("DEBUG: Found department_id: $departmentId");
} else {
    error_log("DEBUG: Department '$normalizedCategory' not found in database");
    $allDepts = $conn->query("SELECT department_id, department_name FROM departments");
    if ($allDepts) {
        while ($d = $allDepts->fetch_assoc()) {
            error_log("DEBUG: Available department - ID: {$d['department_id']}, Name: {$d['department_name']}");
        }
    }
}
$depStmt->close();

$status = 'Pending';

$insert = $conn->prepare('INSERT INTO complaints (citizen_id, category_id, department_id, location, description, priority_level, status, complaint_attachment, subject) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
$insert->bind_param('iiissssss', $citizenId, $categoryId, $departmentId, $location, $description, $priority, $status, $attachmentPath, $subject);

if ($insert->execute()) {
    // Get new complaint id for notifications
    $complaintId = $insert->insert_id;
    $insert->close();

    // Notify all officers in the same department (if department detected)
    if (!empty($departmentId)) {
        $officerStmt = $conn->prepare('SELECT user_id FROM users WHERE user_type = "Officer" AND department_id = ?');
        if ($officerStmt) {
            $officerStmt->bind_param('i', $departmentId);
            if ($officerStmt->execute()) {
                $officersRes = $officerStmt->get_result();
                // Prepare notification insert once, reuse
                $notifStmt = $conn->prepare('INSERT INTO notifications (user_id, complaint_id, status, message, is_read) VALUES (?, ?, ?, ?, 0)');
                if ($notifStmt) {
                    $pendingStatus = 'Pending';
                    $notifMsg = 'New complaint submitted in your department';
                    while ($officer = $officersRes->fetch_assoc()) {
                        $officerId = (int)$officer['user_id'];
                        $notifStmt->bind_param('iiss', $officerId, $complaintId, $pendingStatus, $notifMsg);
                        $notifStmt->execute(); // intentionally ignore failures to not block submit
                    }
                    $notifStmt->close();
                }
            }
            $officerStmt->close();
        }
    }

    echo "<script>alert('Complaint submitted successfully'); window.location.href='../frontend/citizendashboard.html';</script>";
} else {
    $err = $conn->error;
    $insert->close();
    echo "<script>alert('Error submitting complaint: $err'); window.history.back();</script>";
}
$conn->close();
?>