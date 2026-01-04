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

// Update complaint status to Completed
$sql = "UPDATE complaints SET status = 'Completed' WHERE complaint_id = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(['success' => false, 'error' => 'Database prepare error: ' . $conn->error]);
    exit;
}

$stmt->bind_param('i', $complaintId);

if (!$stmt->execute()) {
    echo json_encode(['success' => false, 'error' => 'Failed to update status: ' . $stmt->error]);
    $stmt->close();
    exit;
}

$stmt->close();

// Add activity log
$activitySql = "INSERT INTO complaintactivity (complaint_id, actor_id, activity_type, activity_text, file_path, activity_date) 
                VALUES (?, ?, 'StatusChange', 'Task marked as completed', ?, NOW())";

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
