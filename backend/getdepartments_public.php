<?php
include '../includes/databaseConnection.php';
header('Content-Type: application/json');

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
