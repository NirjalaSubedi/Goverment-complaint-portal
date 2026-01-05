<?php
session_start();
header('Content-Type: application/json');
if (!isset($_SESSION['user_id']) || !isset($_SESSION['user_type'])) {
    echo json_encode(['success' => false, 'error' => 'Not logged in']);
    exit;
}

if ($_SESSION['user_type'] !== 'Officer') {
    echo json_encode(['success' => false, 'error' => 'Only officers can complete tasks']);
    exit;
}

if (!isset($_POST['complaint_id']) || !isset($_FILES['completion_image'])) {
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit;
}

$complaintId = intval($_POST['complaint_id']);
$officerId = $_SESSION['user_id'];
$uploadError = false;
$uploadedFile = null;

// Handle file upload
if (isset($_FILES['completion_image']) && $_FILES['completion_image']['error'] === UPLOAD_ERR_OK) {
    $file = $_FILES['completion_image'];
    $allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    
    if (!in_array($file['type'], $allowedTypes)) {
        echo json_encode(['success' => false, 'error' => 'Only image files are allowed']);
        exit;
    }
    
    // Create upload directory if it doesn't exist
    $uploadDir = '../uploads/completions/';
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    
    // Generate unique filename
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $newFileName = time() . '_' . $complaintId . '.' . $extension;
    $uploadPath = $uploadDir . $newFileName;
    
    if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
        $uploadedFile = 'uploads/completions/' . $newFileName;
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to upload file']);
        exit;
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Please upload completion evidence image']);
    exit;
}

include('../includes/databaseConnection.php');

// Get officer's department
$deptQuery = "SELECT department_id FROM users WHERE user_id = ?";
$deptStmt = $conn->prepare($deptQuery);
$deptStmt->bind_param('i', $officerId);
$deptStmt->execute();
$deptResult = $deptStmt->get_result();

if ($deptResult->num_rows === 0) {
    echo json_encode(['success' => false, 'error' => 'Officer not found']);
    exit;
}

$officerDept = $deptResult->fetch_assoc();
$departmentId = $officerDept['department_id'];
$deptStmt->close();

// Verify complaint belongs to officer's department
$verifyQuery = "SELECT department_id FROM complaints WHERE complaint_id = ?";
$verifyStmt = $conn->prepare($verifyQuery);
$verifyStmt->bind_param('i', $complaintId);
$verifyStmt->execute();
$verifyResult = $verifyStmt->get_result();

if ($verifyResult->num_rows === 0) {
    echo json_encode(['success' => false, 'error' => 'Complaint not found']);
    exit;
}

$complaint = $verifyResult->fetch_assoc();
$complaintDeptId = intval($complaint['department_id']);
$officerDeptId = intval($departmentId);

if ($complaintDeptId === 0 || $complaintDeptId !== $officerDeptId) {
    echo json_encode(['success' => false, 'error' => 'You can only complete complaints from your own department']);
    exit;
}

$verifyStmt->close();

// Update complaint status to Resolved (Completed)
$sql = "UPDATE complaints SET status = 'Resolved' WHERE complaint_id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    error_log("ERROR preparing status update: " . $conn->error);
    echo json_encode(['success' => false, 'error' => 'Database prepare error: ' . $conn->error]);
    exit;
}

$stmt->bind_param('i', $complaintId);

if (!$stmt->execute()) {
    error_log("ERROR executing status update: " . $stmt->error);
    echo json_encode(['success' => false, 'error' => 'Failed to update status: ' . $stmt->error]);
    $stmt->close();
    exit;
}

error_log("SUCCESS: Updated complaint $complaintId status to Resolved");
$stmt->close();

// Add activity log with status change
$activitySql = "INSERT INTO complaintactivity (complaint_id, actor_id, activity_type, activity_text, status_changed_to, file_path, activity_date) 
                VALUES (?, ?, 'StatusChange', 'Task marked as completed', 'Resolved', ?, NOW())";

$activityStmt = $conn->prepare($activitySql);

if ($activityStmt) {
    $activityStmt->bind_param('iis', $complaintId, $officerId, $uploadedFile);
    $activityStmt->execute();
    $activityStmt->close();
}

$conn->close();

echo json_encode([
    'success' => true,
    'message' => 'Task completed successfully',
    'image_path' => $uploadedFile
]);
?>
