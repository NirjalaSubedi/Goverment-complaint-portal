<?php
session_start();
include '../includes/databaseConnection.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Please login first.']);
    exit;
}

$userId = $_SESSION['user_id'];

$conn->query('SET FOREIGN_KEY_CHECKS=0');

$stmt = $conn->prepare('DELETE FROM users WHERE user_id = ?');

if (!$stmt) {
    $conn->query('SET FOREIGN_KEY_CHECKS=1');
    echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $conn->error]);
    exit;
}

$stmt->bind_param('i', $userId);

if ($stmt->execute()) {
    $conn->query('SET FOREIGN_KEY_CHECKS=1');
    
    session_destroy();
    echo json_encode(['success' => true, 'message' => 'Account deleted successfully.']);
} else {
    $conn->query('SET FOREIGN_KEY_CHECKS=1');
    echo json_encode(['success' => false, 'message' => 'Execute failed: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
