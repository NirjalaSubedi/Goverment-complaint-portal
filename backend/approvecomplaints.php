<?php
session_start();
header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['user_id']) || !isset($_SESSION['user_type'])) {
    echo json_encode(['error' => 'User not logged in']);
    exit;
}

// Only officers can approve complaints
if ($_SESSION['user_type'] !== 'Officer') {
    echo json_encode(['error' => 'Only officers can approve complaints']);
    exit;
}

require '../includes/databaseConnection.php';

$complaint_id = isset($_POST['complaint_id']) ? intval($_POST['complaint_id']) : 0;
$action = isset($_POST['action']) ? $_POST['action'] : ''; // 'approve' or 'reject'

if (!$complaint_id || !in_array($action, ['approve', 'reject'])) {
    echo json_encode(['error' => 'Invalid complaint ID or action']);
    exit;
}

// Update complaint status
if ($action === 'approve') {
    $status = 'InProgress';
} else {
    $status = 'Rejected';
}

$query = "UPDATE complaints SET status = ? WHERE complaint_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("si", $status, $complaint_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Complaint ' . $action . 'ed successfully', 'status' => $status]);
} else {
    echo json_encode(['error' => 'Failed to update complaint']);
}

$stmt->close();
$conn->close();
?>
