<?php
session_start();
include '../includes/databaseConnection.php';
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Not logged in']);
    exit;
}
if (!isset($_SESSION['user_type']) || !in_array($_SESSION['user_type'], ['Officer', 'Admin'], true)) {
    echo json_encode(['error' => 'Access denied. Officers or admins only.']);
    exit;
}

$query = "SELECT 
    c.complaint_id,
    c.subject,
    c.location,
    c.description,
    c.priority_level,
    c.status,
    c.submission_date,
    c.complaint_attachment,
    c.category_id,
    cc.category_name,
    u.full_name as citizen_name,
    d.department_name
FROM complaints c
LEFT JOIN complaintcategories cc ON c.category_id = cc.category_id
LEFT JOIN users u ON c.citizen_id = u.user_id
LEFT JOIN departments d ON c.department_id = d.department_id
";

if ($_SESSION['user_type'] === 'Officer') {
    $query .= "WHERE c.status IN ('Pending', 'InProgress', 'Resolved', 'Completed', 'Rejected') OR c.status IS NULL\n";
}

$query .= "ORDER BY c.submission_date DESC";

$stmt = $conn->prepare($query);
$stmt->execute();
$result = $stmt->get_result();

if (!$result) {
    echo json_encode(['error' => 'Failed to load complaints: ' . $conn->error]);
    exit;
}

$complaints = [];
while ($row = $result->fetch_assoc()) {
    $complaints[] = $row;
}

header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'complaints' => $complaints,
    'total_complaints' => count($complaints)
]);

$conn->close();
?>
