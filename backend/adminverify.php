<?php
include '../includes/databaseConnection.php';
header('Content-Type: application/json');
$action = $_POST['action'] ?? $_GET['action'] ?? '';
if ($action === 'getPendingOfficers') {
    // Fetch all pending officers
        // upload document of officer so admin can view it
        $sql = "SELECT u.user_id, u.full_name, u.email, u.phone_number, u.position,
                                     d.department_name,
                                     (SELECT ud.file_path
                                            FROM userdocuments ud
                                         WHERE ud.user_id = u.user_id
                                         ORDER BY ud.upload_date DESC
                                         LIMIT 1) AS file_path,
                                     u.is_approved
                            FROM users u
                            LEFT JOIN departments d ON u.department_id = d.department_id
                         WHERE u.user_type = 'Officer' AND u.is_approved = 'Pending'
                         ORDER BY u.user_id DESC";
    
    $result = mysqli_query($conn, $sql);
    $officers = [];
    
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $officers[] = $row;
        }
        echo json_encode(['success' => true, 'officers' => $officers, 'count' => count($officers)]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . mysqli_error($conn), 'officers' => []]);
    }
    exit;
}

else if ($action === 'approveOfficer') {
    $userId = intval($_POST['user_id'] ?? 0);
    
    if ($userId <= 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid user ID']);
        exit;
    }
    
    $updateSql = "UPDATE users SET is_approved = 'Approved' WHERE user_id = ? AND user_type = 'Officer'";
    $stmt = $conn->prepare($updateSql);
    $stmt->bind_param('i', $userId);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Officer approved successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to approve officer']);
    }
    $stmt->close();
    exit;
}

else if ($action === 'rejectOfficer') {
    $userId = intval($_POST['user_id'] ?? 0);
    
    if ($userId <= 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid user ID']);
        exit;
    }
    
    $updateSql = "UPDATE users SET is_approved = 'Rejected' WHERE user_id = ? AND user_type = 'Officer'";
    $stmt = $conn->prepare($updateSql);
    $stmt->bind_param('i', $userId);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Officer rejected']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to reject officer']);
    }
    $stmt->close();
    exit;
}

else if ($action === 'getAllUsers') {
    // Fetching all users (Citizens and Officers)
    $sql = "SELECT u.user_id, u.full_name, u.email, u.phone_number, u.position, u.user_type,
                   d.department_name,
                   u.is_approved
            FROM users u
            LEFT JOIN departments d ON u.department_id = d.department_id
            WHERE u.user_type IN ('Citizen', 'Officer')
            ORDER BY u.user_type ASC, u.user_id DESC";
    
    $result = mysqli_query($conn, $sql);
    $users = [];
    
    if ($result) {
        
        echo json_encode(['success' => true, 'users' => $users, 'count' => count($users)]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . mysqli_error($conn), 'users' => []]);
    }
    exit;
}

else {
    echo json_encode(['success' => false, 'message' => 'Invalid action']);
    exit;
}

$conn->close();
?>
