<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Not logged in']);
    exit;
}

include('../includes/databaseConnection.php');

// Fetch department if user is an officer
$department = null;
if (isset($_SESSION['user_type']) && $_SESSION['user_type'] === 'Officer') {
    $userId = $_SESSION['user_id'];
    $stmt = $conn->prepare('SELECT d.department_name FROM users u LEFT JOIN departments d ON u.department_id = d.department_id WHERE u.user_id = ?');
    $stmt->bind_param('i', $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        $department = $row['department_name'];
    }
    $stmt->close();
}

// Return user information from session
$userInfo = [
    'fullName' => $_SESSION['user_name'] ?? 'User',
    'email' => $_SESSION['user_email'] ?? '',
    'userType' => $_SESSION['user_type'] ?? '',
    'userId' => $_SESSION['user_id'] ?? 0,
    'department' => $department
];

header('Content-Type: application/json');
echo json_encode($userInfo);
?>
