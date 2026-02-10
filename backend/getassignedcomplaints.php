<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['user_id']) || !isset($_SESSION['user_type'])) {
    echo json_encode(['error' => 'User not logged in']);
    exit;
}

if ($_SESSION['user_type'] !== 'Officer') {
    echo json_encode(['error' => 'Only officers can view assigned complaints']);
    exit;
}

require '../includes/databaseConnection.php';

$officer_id = $_SESSION['user_id'];

$dept_query = "SELECT department_id FROM users WHERE user_id = ?";
$stmt = $conn->prepare($dept_query);
$stmt->bind_param("i", $officer_id);
$stmt->execute();
$dept_result = $stmt->get_result();

if ($dept_result->num_rows === 0) {
    echo json_encode(['error' => 'Officer not found']);
    exit;
}

$officer_dept = $dept_result->fetch_assoc();
$department_id = $officer_dept['department_id'];

$query = "SELECT c.*, cc.category_name, u.full_name, d.department_name 
          FROM complaints c 
          LEFT JOIN complaintcategories cc ON c.category_id = cc.category_id 
          LEFT JOIN users u ON c.citizen_id = u.user_id 
          LEFT JOIN departments d ON c.department_id = d.department_id 
          WHERE c.status != 'Pending' AND (c.department_id = ? OR (c.department_id IS NULL AND c.category_id IN (
              SELECT cat.category_id FROM complaintcategories cat
              WHERE LOWER(cat.category_name) IN (
                  SELECT LOWER(d2.department_name) FROM departments d2 WHERE d2.department_id = ?
              )
          )))
          ORDER BY c.submission_date DESC";

$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $department_id, $department_id);
$stmt->execute();
$result = $stmt->get_result();

$complaints = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $complaints[] = $row;
    }
}

echo json_encode(['complaints' => $complaints]);
$stmt->close();
$conn->close();
?>
