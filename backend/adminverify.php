<?php
include '../includes/databaseConnection.php';
header('Content-Type: application/json');
$action = $_POST['action'] ?? $_GET['action'] ?? '';
if ($action === 'getPendingOfficers') {
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
        while ($row = mysqli_fetch_assoc($result)) {
            if ($row['user_type'] === 'Officer') {
                $docSql = "SELECT file_path FROM userdocuments WHERE user_id = {$row['user_id']} ORDER BY upload_date DESC LIMIT 1";
                $docResult = mysqli_query($conn, $docSql);
                if ($docResult && $docRow = mysqli_fetch_assoc($docResult)) {
                    $row['file_path'] = $docRow['file_path'];
                } else {
                    $row['file_path'] = null;
                }
            } else {
                $row['file_path'] = null;
            }
            $users[] = $row;
        }
        echo json_encode(['success' => true, 'users' => $users, 'count' => count($users)]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . mysqli_error($conn), 'users' => []]);
    }
    exit;
}

else if ($action === 'deleteUser') {
    $userId = intval($_POST['user_id'] ?? 0);
    
    if ($userId <= 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid user ID']);
        exit;
    }
    
    mysqli_begin_transaction($conn);
    
    try {
        $complaintIds = [];
        $complaintsStmt = $conn->prepare('SELECT complaint_id FROM complaints WHERE citizen_id = ?');
        if (!$complaintsStmt) {
            throw new Exception('Failed to prepare complaint lookup: ' . $conn->error);
        }
        $complaintsStmt->bind_param('i', $userId);
        if (!$complaintsStmt->execute()) {
            throw new Exception('Failed to lookup complaints: ' . $complaintsStmt->error);
        }
        $result = $complaintsStmt->get_result();
        while ($row = $result->fetch_assoc()) {
            $complaintIds[] = (int)$row['complaint_id'];
        }
        $complaintsStmt->close();

        if (!empty($complaintIds)) {
            $placeholders = implode(',', array_fill(0, count($complaintIds), '?'));
            $types = str_repeat('i', count($complaintIds));

            $notifByComplaintStmt = $conn->prepare("DELETE FROM notifications WHERE complaint_id IN ($placeholders)");
            if ($notifByComplaintStmt) {
                $notifByComplaintStmt->bind_param($types, ...$complaintIds);
                if (!$notifByComplaintStmt->execute()) {
                    throw new Exception('Failed to delete complaint notifications: ' . $notifByComplaintStmt->error);
                }
                $notifByComplaintStmt->close();
            }

            $activityStmt = $conn->prepare("DELETE FROM complaintactivity WHERE complaint_id IN ($placeholders)");
            if ($activityStmt) {
                $activityStmt->bind_param($types, ...$complaintIds);
                if (!$activityStmt->execute()) {
                    throw new Exception('Failed to delete complaint activity: ' . $activityStmt->error);
                }
                $activityStmt->close();
            }
        }

        $notifUserStmt = $conn->prepare('DELETE FROM notifications WHERE user_id = ?');
        if ($notifUserStmt) {
            $notifUserStmt->bind_param('i', $userId);
            if (!$notifUserStmt->execute()) {
                throw new Exception('Failed to delete user notifications: ' . $notifUserStmt->error);
            }
            $notifUserStmt->close();
        }

        $draftStmt = $conn->prepare('DELETE FROM complaint_drafts WHERE citizen_id = ?');
        if ($draftStmt) {
            $draftStmt->bind_param('i', $userId);
            if (!$draftStmt->execute()) {
                throw new Exception('Failed to delete complaint drafts: ' . $draftStmt->error);
            }
            $draftStmt->close();
        }

        $activityActorStmt = $conn->prepare('DELETE FROM complaintactivity WHERE actor_id = ?');
        if ($activityActorStmt) {
            $activityActorStmt->bind_param('i', $userId);
            if (!$activityActorStmt->execute()) {
                throw new Exception('Failed to delete actor activity: ' . $activityActorStmt->error);
            }
            $activityActorStmt->close();
        }

        $complaintStmt = $conn->prepare('DELETE FROM complaints WHERE citizen_id = ?');
        if ($complaintStmt) {
            $complaintStmt->bind_param('i', $userId);
            if (!$complaintStmt->execute()) {
                throw new Exception('Failed to delete complaints: ' . $complaintStmt->error);
            }
            $complaintStmt->close();
        }

        $docDeleteSql = "DELETE FROM userdocuments WHERE user_id = ?";
        $docStmt = $conn->prepare($docDeleteSql);
        $docStmt->bind_param('i', $userId);
        if (!$docStmt->execute()) {
            throw new Exception('Failed to delete user documents: ' . $docStmt->error);
        }
        $docStmt->close();
        
        $userDeleteSql = "DELETE FROM users WHERE user_id = ?";
        $userStmt = $conn->prepare($userDeleteSql);
        $userStmt->bind_param('i', $userId);
        if (!$userStmt->execute()) {
            throw new Exception('Failed to delete user: ' . $userStmt->error);
        }
        $userStmt->close();
        
        mysqli_commit($conn);
        echo json_encode(['success' => true, 'message' => 'User deleted successfully']);
    } catch (Exception $e) {
        mysqli_rollback($conn);
        echo json_encode(['success' => false, 'message' => 'Failed to delete user: ' . $e->getMessage()]);
    }
    exit;
}

else {
    echo json_encode(['success' => false, 'message' => 'Invalid action']);
    exit;
}

$conn->close();
?>
