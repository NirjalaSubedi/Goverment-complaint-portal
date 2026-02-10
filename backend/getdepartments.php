<?php
session_start();
include '../includes/databaseConnection.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || !isset($_SESSION['user_type']) || $_SESSION['user_type'] !== 'Admin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Access denied']);
    exit;
}

$query = 'SELECT department_id, department_name FROM departments ORDER BY department_name ASC';
$result = $conn->query($query);

if (!$result) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
    exit;
}

$departments = [];
while ($row = $result->fetch_assoc()) {
    $departments[] = $row;
}

echo json_encode(['success' => true, 'departments' => $departments]);
$conn->close();
?>
