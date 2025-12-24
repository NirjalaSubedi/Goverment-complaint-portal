<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Not logged in']);
    exit;
}
// Return user information from session
$userInfo = [
    'fullName' => $_SESSION['user_name'] ?? 'User',
    'email' => $_SESSION['user_email'] ?? '',
    'userType' => $_SESSION['user_type'] ?? '',
    'userId' => $_SESSION['user_id'] ?? 0
];

header('Content-Type: application/json');
echo json_encode($userInfo);
?>
