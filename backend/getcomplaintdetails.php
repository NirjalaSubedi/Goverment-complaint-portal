<?php
session_start();
header('Content-Type: application/json');

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Check if complaint_id is provided
if (!isset($_GET['complaint_id'])) {
    echo json_encode(['error' => 'Complaint ID not provided']);
    exit;
}

try {
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
                c.submission_date as created_at,
                u.full_name,
                u.email,
                cat.category_name
            FROM complaints c
            LEFT JOIN users u ON c.citizen_id = u.user_id
            LEFT JOIN complaintcategories cat ON c.category_id = cat.category_id
            WHERE c.complaint_id = ?";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        echo json_encode(['error' => 'Database prepare error: ' . $conn->error]);
        exit;
    }
    
    $stmt->bind_param('i', $complaintId);
    
    if (!$stmt->execute()) {
        echo json_encode(['error' => 'Database execute error: ' . $stmt->error]);
        exit;
    }
    
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $complaint = $result->fetch_assoc();
        echo json_encode([
            'success' => true,
            'complaint' => $complaint
        ]);
    } else {
        echo json_encode(['error' => 'Complaint not found with ID: ' . $complaintId]);
    }

    $stmt->close();
    $conn->close();
    
} catch (Exception $e) {
    echo json_encode(['error' => 'Exception: ' . $e->getMessage()]);
}
?>
