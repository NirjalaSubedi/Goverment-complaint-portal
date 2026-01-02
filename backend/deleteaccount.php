<?php
session_start();
include '../includes/databaseConnection.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Please login first.']);
    exit;
}

$userId = $_SESSION['user_id'];

// Delete user from database
$stmt = $conn->prepare('DELETE FROM users WHERE user_id = ?');
$stmt->bind_param('i', $userId);

if ($stmt->execute()) {
    // Destroy session after successful deletion
    session_destroy();
    echo json_encode(['success' => true, 'message' => 'Account deleted successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error deleting account. Please try again.']);
}

$stmt->close();
$conn->close();
?>
