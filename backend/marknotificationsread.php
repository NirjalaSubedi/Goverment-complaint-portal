<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

require_once '../includes/databaseConnection.php';

$user_id = $_SESSION['user_id'];
$notification_id = isset($_POST['notification_id']) ? $_POST['notification_id'] : null;

try {
    if ($notification_id) {
        $query = "UPDATE notifications SET is_read = 1 WHERE notification_id = ? AND user_id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ii", $notification_id, $user_id);
        $stmt->execute();
    } else {
        $query = "UPDATE notifications SET is_read = 1 WHERE user_id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
    }
    
    echo json_encode(['success' => true]);
    
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

$stmt->close();
$conn->close();
?>
