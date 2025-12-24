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

// Sanitize incoming fields
$categoryName = strtolower(trim($_POST['complaint-type'] ?? ''));
$subject      = mysqli_real_escape_string($conn, $_POST['subject'] ?? '');
$location     = mysqli_real_escape_string($conn, $_POST['location'] ?? '');
$priorityRaw  = strtolower(trim($_POST['priorityLevel'] ?? ''));
$description  = mysqli_real_escape_string($conn, $_POST['description'] ?? '');

// Map priority to DB enum values
$priorityMap = [
    'high' => 'High',
    'medium' => 'Medium',
    'low' => 'Low'
];
$priority = $priorityMap[$priorityRaw] ?? 'Low';

// Normalize category names (you can add more mappings as needed)
$categoryAliases = [
    'watersupply' => 'Water Supply',
    'water' => 'Water Supply',
    'electricity' => 'Electricity',
    'roaddamage' => 'Road Damage',
    'road' => 'Road Damage',
    'healthcare' => 'Health Care',
    'health' => 'Health Care',
    'corruption' => 'Corruption',
    'other' => 'Other'
];
$normalizedCategory = $categoryAliases[$categoryName] ?? ucfirst($categoryName);

// Ensure category exists and get category_id
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

// Handle file upload
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

// Prepare insert into complaints
$citizenId = (int)($_SESSION['user_id'] ?? 0);
if ($citizenId <= 0) {
    echo "<script>alert('Invalid user session.'); window.location.href='../frontend/login.html';</script>";
    exit;
}

// Note: complaints table screenshot does not have subject;
// we append subject to description if provided.
if ($subject !== '') {
    $description = $subject . "\n\n" . $description;
}

$status = 'Pending';

$insert = $conn->prepare('INSERT INTO complaints (citizen_id, category_id, location, description, priority_level, status, complaint_attachment) VALUES (?, ?, ?, ?, ?, ?, ?)');
$insert->bind_param('iisssss', $citizenId, $categoryId, $location, $description, $priority, $status, $attachmentPath);

if ($insert->execute()) {
    $insert->close();
    echo "<script>alert('Complaint submitted successfully'); window.location.href='../frontend/citizendashboard.html';</script>";
} else {
    $err = $conn->error;
    $insert->close();
    echo "<script>alert('Error submitting complaint: $err'); window.history.back();</script>";
}

$conn->close();
?>