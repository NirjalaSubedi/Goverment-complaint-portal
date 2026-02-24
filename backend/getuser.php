<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Not logged in']);
    exit;
}

include('../includes/databaseConnection.php');

$expectedRole = trim($_GET['expectedRole'] ?? '');
$sessionUserType = $_SESSION['user_type'] ?? '';

if ($expectedRole !== '' && strcasecmp($sessionUserType, $expectedRole) !== 0) {
    http_response_code(403);
    echo json_encode([
        'error' => 'Role mismatch',
        'currentRole' => $sessionUserType,
        'expectedRole' => $expectedRole
    ]);
    exit;
}

$department = null;
if ($sessionUserType === 'Officer') {
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

$userInfo = [
    'fullName' => $_SESSION['user_name'] ?? 'User',
    'email' => $_SESSION['user_email'] ?? '',
    'userType' => $sessionUserType,
    'userId' => $_SESSION['user_id'] ?? 0,
    'department' => $department,
    'isAuthenticated' => true
];

echo json_encode($userInfo);
?>
