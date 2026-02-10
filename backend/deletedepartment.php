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

$departmentId = intval($_POST['department_id'] ?? 0);
if ($departmentId <= 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid department id']);
    exit;
}

$stmt = $conn->prepare('DELETE FROM departments WHERE department_id = ?');
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
    exit;
}

$stmt->bind_param('i', $departmentId);
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(['success' => true, 'message' => 'Department deleted successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Department not found']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to delete department: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
