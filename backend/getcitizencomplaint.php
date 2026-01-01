<?php
session_start();
include '../includes/databaseConnection.php';

header('Content-Type: application/json');

//active login session
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit;
}

$citizen_id = (int)($_SESSION['user_id']);

$query = "SELECT 
            c.complaint_id,
            c.subject,
            c.description,
            c.location,
            c.priority_level,
            CASE c.status 
                WHEN 'InProgress' THEN 'In Progress'
                WHEN 'Resolved' THEN 'Completed'
                ELSE c.status
            END AS status,
            c.submission_date AS created_at,
            c.complaint_attachment,
            cat.category_name
        FROM complaints c
        LEFT JOIN complaintcategories cat ON c.category_id = cat.category_id
        WHERE c.citizen_id = ?
        ORDER BY c.submission_date DESC";

$stmt = $conn->prepare($query);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Database error: ' . $conn->error]);
    exit;
}

$stmt->bind_param('i', $citizen_id);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to load complaints: ' . $stmt->error,
        'debug_query' => $query
    ]);
    $stmt->close();
    $conn->close();
    exit;
}

$result = $stmt->get_result();

$complaints = [];
while ($row = $result->fetch_assoc()) {
    $complaints[] = $row;
}

$stmt->close();
$conn->close();

echo json_encode([
    'success' => true,
    'complaints' => $complaints,
    'total_complaints' => count($complaints)
]);
?>
