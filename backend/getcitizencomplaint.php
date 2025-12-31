<?php
session_start();
include '../includes/databaseConnection.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}
$citizen_id = (int)($_SESSION['user_id']);
$query = "SELECT 
            c.complaint_id,
            c.subject,
            c.description,
            c.location,
            c.priority_level,
            c.status,
            c.created_at,
            c.complaint_attachment,
            cat.category_name
        FROM complaints c
        LEFT JOIN complaintcategories cat ON c.category_id = cat.category_id
        WHERE c.citizen_id = ?
        ORDER BY c.created_at DESC";

$stmt = $conn->prepare($query);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $conn->error]);
    exit;
}

$stmt->bind_param('i', $citizen_id);
$stmt->execute();
$result = $stmt->get_result();

$complaints = [];
while ($row = $result->fetch_assoc()) {
    $complaints[] = $row;
}

$stmt->close();
$conn->close();

header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'complaints' => $complaints,
    'total_complaints' => count($complaints)
]);
?>
