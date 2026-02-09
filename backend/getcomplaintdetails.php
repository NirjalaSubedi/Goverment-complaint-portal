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

    // Fetch complaint details with user information, category, and department
    $sql = "SELECT 
                c.complaint_id,
                c.subject,
                c.description,
                c.location,
                c.status,
                c.priority_level,
                c.complaint_attachment,
                c.department_id,
                c.submission_date as created_at,
                u.full_name,
                u.email,
                cat.category_name,
                d.department_name
            FROM complaints c
            LEFT JOIN users u ON c.citizen_id = u.user_id
            LEFT JOIN complaintcategories cat ON c.category_id = cat.category_id
            LEFT JOIN departments d ON c.department_id = d.department_id
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
        
        // Fetch officer responses from complaintactivity table
        $responsesSql = "SELECT 
                            ca.activity_text as message,
                            ca.activity_date,
                            ca.file_path,
                            u.full_name as officer_name,
                            u.email as officer_email
                        FROM complaintactivity ca
                        LEFT JOIN users u ON ca.actor_id = u.user_id
                        WHERE ca.complaint_id = ? 
                        AND ca.activity_type = 'Response'
                        ORDER BY ca.activity_date DESC";
        
        $responseStmt = $conn->prepare($responsesSql);
        $responseStmt->bind_param('i', $complaintId);
        $responseStmt->execute();
        $responsesResult = $responseStmt->get_result();
        
        $responses = [];
        while ($row = $responsesResult->fetch_assoc()) {
            $responses[] = $row;
        }
        
        $responseStmt->close();
        
        // Fetch completion activity history
        $completionHistory = [];
        $completionSql = "SELECT 
                            ca.activity_text,
                            ca.activity_date,
                            ca.file_path,
                            ca.status_changed_to,
                            u.full_name as officer_name
                        FROM complaintactivity ca
                        LEFT JOIN users u ON ca.actor_id = u.user_id
                        WHERE ca.complaint_id = ? 
                        AND ca.activity_type = 'StatusChange'
                        AND (ca.status_changed_to = 'Resolved' OR ca.status_changed_to = 'Completed')
                        ORDER BY ca.activity_date DESC";
        
        $completionStmt = $conn->prepare($completionSql);
        if ($completionStmt) {
            $completionStmt->bind_param('i', $complaintId);
            $completionStmt->execute();
            $completionResult = $completionStmt->get_result();
            
            while ($row = $completionResult->fetch_assoc()) {
                $completionHistory[] = $row;
            }
            
            $completionStmt->close();
        }

        // Fetch latest rejection info if any
        $rejectionInfo = null;
        $rejectionSql = "SELECT 
                            ca.activity_text as reason,
                            ca.activity_date,
                            u.full_name as officer_name,
                            u.email as officer_email
                        FROM complaintactivity ca
                        LEFT JOIN users u ON ca.actor_id = u.user_id
                        WHERE ca.complaint_id = ?
                        AND ca.activity_type = 'StatusChange'
                        AND ca.status_changed_to = 'Rejected'
                        ORDER BY ca.activity_date DESC
                        LIMIT 1";
        $rejectionStmt = $conn->prepare($rejectionSql);
        if ($rejectionStmt) {
            $rejectionStmt->bind_param('i', $complaintId);
            $rejectionStmt->execute();
            $rejectionResult = $rejectionStmt->get_result();
            if ($rejectionResult && $rejectionResult->num_rows > 0) {
                $rejectionInfo = $rejectionResult->fetch_assoc();
            }
            $rejectionStmt->close();
        }
        
        // Get officer's department if logged in as officer
        $officerDepartmentId = null;
        $officerDepartmentName = null;
        if (isset($_SESSION['user_type']) && $_SESSION['user_type'] === 'Officer' && isset($_SESSION['user_id'])) {
            $officerDeptQuery = "SELECT u.department_id, d.department_name FROM users u LEFT JOIN departments d ON u.department_id = d.department_id WHERE u.user_id = ?";
            $officerStmt = $conn->prepare($officerDeptQuery);
            $officerStmt->bind_param('i', $_SESSION['user_id']);
            $officerStmt->execute();
            $officerDeptResult = $officerStmt->get_result();
            if ($officerDeptResult->num_rows > 0) {
                $officerDept = $officerDeptResult->fetch_assoc();
                $officerDepartmentId = $officerDept['department_id'];
                $officerDepartmentName = $officerDept['department_name'];
            }
            $officerStmt->close();
        }
        
        echo json_encode([
            'success' => true,
            'complaint' => $complaint,
            'responses' => $responses,
            'completion_history' => $completionHistory,
            'rejection_info' => $rejectionInfo,
            'officer_department_id' => $officerDepartmentId,
            'officer_department_name' => $officerDepartmentName
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
