<?php
session_start();
header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['user_id']) || !isset($_SESSION['user_type'])) {
    echo json_encode(['error' => 'User not logged in']);
    exit;
}

// Only officers can approve complaints
if ($_SESSION['user_type'] !== 'Officer') {
    echo json_encode(['error' => 'Only officers can approve complaints']);
    exit;
}

require '../includes/databaseConnection.php';

$officer_id = $_SESSION['user_id'];
$complaint_id = isset($_POST['complaint_id']) ? intval($_POST['complaint_id']) : 0;
$action = isset($_POST['action']) ? $_POST['action'] : ''; // 'approve' or 'reject'

if (!$complaint_id || !in_array($action, ['approve', 'reject'])) {
    echo json_encode(['error' => 'Invalid complaint ID or action']);
    exit;
}

// Get officer's department
$deptQuery = "SELECT department_id FROM users WHERE user_id = ?";
$deptStmt = $conn->prepare($deptQuery);
$deptStmt->bind_param('i', $officer_id);
$deptStmt->execute();
$deptResult = $deptStmt->get_result();

if ($deptResult->num_rows === 0) {
    echo json_encode(['error' => 'Officer not found']);
    exit;
}

$officerDept = $deptResult->fetch_assoc();
$departmentId = $officerDept['department_id'];
$deptStmt->close();

// Verify complaint belongs to officer's department
$verifyQuery = "SELECT department_id FROM complaints WHERE complaint_id = ?";
$verifyStmt = $conn->prepare($verifyQuery);
$verifyStmt->bind_param('i', $complaint_id);
$verifyStmt->execute();
$verifyResult = $verifyStmt->get_result();

if ($verifyResult->num_rows === 0) {
    echo json_encode(['error' => 'Complaint not found']);
    exit;
}

$complaint = $verifyResult->fetch_assoc();
$complaintDeptId = intval($complaint['department_id']);
$officerDeptId = intval($departmentId);

if ($complaintDeptId === 0 || $complaintDeptId !== $officerDeptId) {
    echo json_encode(['error' => 'You can only manage complaints from your own department']);
    exit;
}

$verifyStmt->close();

// Update complaint status
if ($action === 'approve') {
    $status = 'InProgress';
} else {
    $status = 'Rejected';
}

$query = "UPDATE complaints SET status = ? WHERE complaint_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("si", $status, $complaint_id);

if ($stmt->execute()) {
    // Create notification for the citizen
    $userQuery = "SELECT citizen_id FROM complaints WHERE complaint_id = ?";
    $userStmt = $conn->prepare($userQuery);
    
    if ($userStmt) {
        $userStmt->bind_param("i", $complaint_id);
        $userStmt->execute();
        $userResult = $userStmt->get_result();
        $userRow = $userResult->fetch_assoc();
        
        if ($userRow) {
            $citizen_id = $userRow['citizen_id'];
            $message = ($action === 'approve') ? "Your complaint has been approved and is now in progress" : "Your complaint has been rejected";
            
            // Insert notification
            $notifQuery = "INSERT INTO notifications (user_id, complaint_id, status, message, is_read) VALUES (?, ?, ?, ?, 0)";
            $notifStmt = $conn->prepare($notifQuery);
            
            if ($notifStmt) {
                $notifStmt->bind_param("iiss", $citizen_id, $complaint_id, $status, $message);
                $notifStmt->execute();
                $notifStmt->close();
            }
        }
        $userStmt->close();
    }
    
    // Always return success if complaint status was updated
    echo json_encode(['success' => true, 'message' => 'Complaint ' . $action . 'ed successfully', 'status' => $status]);
} else {
    echo json_encode(['error' => 'Failed to update complaint']);
}

$stmt->close();
$conn->close();
?>
