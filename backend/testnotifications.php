<?php
session_start();
header('Content-Type: application/json');

require_once '../includes/databaseConnection.php';

$checkTableQuery = "SHOW TABLES LIKE 'notifications'";
$result = $conn->query($checkTableQuery);
$tableExists = $result->num_rows > 0;

$allNotifications = [];
if ($tableExists) {
    $notifQuery = "SELECT * FROM notifications ORDER BY created_at DESC LIMIT 5";
    $notifResult = $conn->query($notifQuery);
    while ($row = $notifResult->fetch_assoc()) {
        $allNotifications[] = $row;
    }
}

$user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 'Not Set';

echo json_encode([
    'table_exists' => $tableExists,
    'user_id' => $user_id,
    'all_notifications' => $allNotifications,
    'notification_count' => count($allNotifications)
]);

$conn->close();
?>
