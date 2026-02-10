<?php
session_start();
include '../includes/databaseConnection.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

if (!isset($_SESSION['user_id']) || !isset($_SESSION['user_type']) || $_SESSION['user_type'] !== 'Admin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Access denied']);
    exit;
}

$departmentName = trim($_POST['department_name'] ?? '');
if ($departmentName === '') {
    echo json_encode(['success' => false, 'message' => 'Department name is required']);
    exit;
}

$checkStmt = $conn->prepare('SELECT department_id FROM departments WHERE LOWER(department_name) = LOWER(?) LIMIT 1');
if (!$checkStmt) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
    exit;
}

$checkStmt->bind_param('s', $departmentName);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult && $checkResult->num_rows > 0) {
    $checkStmt->close();
    echo json_encode(['success' => false, 'message' => 'Department already exists']);
    exit;
}
$checkStmt->close();

$insertStmt = $conn->prepare('INSERT INTO departments (department_name) VALUES (?)');
if (!$insertStmt) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
    exit;
}

$insertStmt->bind_param('s', $departmentName);
if ($insertStmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Department added successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to add department: ' . $insertStmt->error]);
}

$insertStmt->close();
$conn->close();
?>
