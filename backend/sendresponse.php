<?php
session_start();
header('Content-Type: application/json');

// Check if user is logged in and is an officer
if (!isset($_SESSION['user_id']) || !isset($_SESSION['user_type'])) {
    echo json_encode(['success' => false, 'error' => 'Not logged in']);
    exit;
}

if ($_SESSION['user_type'] !== 'Officer') {
    echo json_encode(['success' => false, 'error' => 'Only officers can send responses']);
    exit;
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['complaint_id']) || !isset($input['message'])) {
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit;
}

$complaintId = intval($input['complaint_id']);
$message = trim($input['message']);
$officerId = $_SESSION['user_id'];

if (empty($message)) {
    echo json_encode(['success' => false, 'error' => 'Message cannot be empty']);
    exit;
}

include('../includes/databaseConnection.php');

// Insert response into complaintactivity table
$sql = "INSERT INTO complaintactivity (complaint_id, actor_id, activity_type, activity_text, activity_date) 
        VALUES (?, ?, 'Response', ?, NOW())";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(['success' => false, 'error' => 'Database prepare error: ' . $conn->error]);
    exit;
}

$stmt->bind_param('iis', $complaintId, $officerId, $message);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Response sent successfully'
    ]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to send response: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
