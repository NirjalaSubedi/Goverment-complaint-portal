<?php
include '../includes/databaseConnection.php';

header('Content-Type: application/json');

$action = $_POST['action'] ?? $_GET['action'] ?? '';

if ($action === 'getPendingOfficers') {
    // Fetch all pending officers
    $sql = "SELECT u.user_id, u.full_name, u.email, u.phone_number, u.position, 
                   d.department_name, ud.file_path, u.is_approved
            FROM users u
            LEFT JOIN departments d ON u.department_id = d.department_id
            LEFT JOIN userdocuments ud ON u.user_id = ud.user_id AND ud.document_type = 'OfficerID'
            WHERE u.user_type = 'Officer' AND u.is_approved = 'Pending'
            ORDER BY u.user_id DESC";
    
    $result = mysqli_query($conn, $sql);
    $officers = [];
    
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $officers[] = $row;
        }
    }
    
    echo json_encode(['success' => true, 'officers' => $officers]);
    exit;
}


?>
