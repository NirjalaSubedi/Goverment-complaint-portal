<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

require_once '../includes/databaseConnection.php';

$user_id = $_SESSION['user_id'];

try {
    $query = "SELECT * FROM notifications WHERE user_id = ? AND is_read = 0 ORDER BY created_at DESC LIMIT 10";
    $stmt = $conn->prepare($query);
    
    if (!$stmt) {
        echo json_encode(['error' => 'Database error']);
        exit;
    }
    
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $notifications = [];
    while ($row = $result->fetch_assoc()) {
        $notifications[] = $row;
    }
    
    $countQuery = "SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = 0";
    $countStmt = $conn->prepare($countQuery);
    $countStmt->bind_param("i", $user_id);
    $countStmt->execute();
    $countResult = $countStmt->get_result();
    $countRow = $countResult->fetch_assoc();
    
    echo json_encode([
        'success' => true,
        'notifications' => $notifications,
        'unread_count' => $countRow['count']
    ]);
    
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

$stmt->close();
$conn->close();
?>
