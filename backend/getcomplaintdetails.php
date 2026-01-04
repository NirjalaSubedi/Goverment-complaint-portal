<?php
session_start();
header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Not logged in']);
    exit;
}

// Check if complaint_id is provided
if (!isset($_GET['complaint_id'])) {
    echo json_encode(['error' => 'Complaint ID not provided']);
    exit;
}

include('../includes/databaseConnection.php');

$complaintId = intval($_GET['complaint_id']);

// Fetch complaint details with user information and category
$sql = "SELECT 
            c.complaint_id,
            c.subject,
            c.description,
            c.location,
            c.status,
            c.priority_level,
            c.complaint_attachment,
            c.created_at,
            u.full_name,
            u.email,
            cat.category_name
        FROM complaints c
        LEFT JOIN users u ON c.user_id = u.user_id
        LEFT JOIN complaint_categories cat ON c.category_id = cat.category_id
        WHERE c.complaint_id = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $complaintId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $complaint = $result->fetch_assoc();
    echo json_encode([
        'success' => true,
        'complaint' => $complaint
    ]);
} else {
    echo json_encode(['error' => 'Complaint not found']);
}

$stmt->close();
$conn->close();
?>
