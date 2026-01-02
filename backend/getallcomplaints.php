<?php
session_start();
include '../includes/databaseConnection.php';
// Check if user is logged in and is an officer
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Not logged in']);
    exit;
}
if (!isset($_SESSION['user_type']) || $_SESSION['user_type'] !== 'Officer') {
    echo json_encode(['error' => 'Access denied. Officers only.']);
    exit;
}

// Fetch all complaints from database
$query = "SELECT 
    c.complaint_id,
    c.subject,
    c.location,
    c.description,
    c.priority_level,
    c.status,
    c.submission_date,
    c.complaint_attachment,
    cc.category_name,
    u.full_name as citizen_name,
    d.department_name
FROM complaints c
LEFT JOIN complaintcategories cc ON c.category_id = cc.category_id
LEFT JOIN users u ON c.citizen_id = u.user_id
LEFT JOIN departments d ON c.department_id = d.department_id
ORDER BY c.submission_date DESC";
$conn->close();
?>
