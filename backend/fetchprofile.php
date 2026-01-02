<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Not logged in']);
    exit;
}

include('../includes/databaseConnection.php');

// Fetch user profile details from database
$userId = $_SESSION['user_id'];
$sql = "SELECT full_name, email, phone_number, address FROM users WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $userId);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

// Return user profile information
$profileInfo = [
    'fullName' => $user['full_name'] ?? '',
    'email' => $user['email'] ?? '',
    'phone' => $user['phone_number'] ?? '',
    'address' => $user['address'] ?? ''
];

header('Content-Type: application/json');
echo json_encode($profileInfo);
$stmt->close();
?>
