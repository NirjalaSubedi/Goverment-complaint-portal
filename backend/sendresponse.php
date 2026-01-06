<?php
session_start();
header('Content-Type: application/json');

// Check if user is logged in and is an officer
if (!isset($_SESSION['user_id']) || !isset($_SESSION['user_type'])) {
    echo json_encode(['success' => false, 'error' => 'Not logged in']);
    exit;
}

if ($_SESSION['user_type'] !== 'Officer') {
    echo json_encode(['success' => false, 'error' => 'Only officers can send responses']);
    exit;
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['complaint_id']) || !isset($input['message'])) {
    echo json_encode(['success' => false, 'error' => 'Missing required fields']);
    exit;
}

$complaintId = intval($input['complaint_id']);
$message = trim($input['message']);
$officerId = $_SESSION['user_id'];

if (empty($message)) {
    echo json_encode(['success' => false, 'error' => 'Message cannot be empty']);
    exit;
}

include('../includes/databaseConnection.php');

// Get officer's department
$deptQuery = "SELECT department_id FROM users WHERE user_id = ?";
$deptStmt = $conn->prepare($deptQuery);
$deptStmt->bind_param('i', $officerId);
$deptStmt->execute();
$deptResult = $deptStmt->get_result();

if ($deptResult->num_rows === 0) {
    echo json_encode(['success' => false, 'error' => 'Officer not found']);
    exit;
}

$officerDept = $deptResult->fetch_assoc();
$departmentId = $officerDept['department_id'];
$deptStmt->close();

// Verify complaint belongs to officer's department
$verifyQuery = "SELECT department_id FROM complaints WHERE complaint_id = ?";
$verifyStmt = $conn->prepare($verifyQuery);
$verifyStmt->bind_param('i', $complaintId);
$verifyStmt->execute();
$verifyResult = $verifyStmt->get_result();

if ($verifyResult->num_rows === 0) {
    echo json_encode(['success' => false, 'error' => 'Complaint not found']);
    exit;
}

$complaint = $verifyResult->fetch_assoc();
$complaintDeptId = intval($complaint['department_id']);
$officerDeptId = intval($departmentId);

if ($complaintDeptId === 0 || $complaintDeptId !== $officerDeptId) {
    echo json_encode(['success' => false, 'error' => 'You can only respond to complaints from your own department']);
    exit;
}

$verifyStmt->close();

// Insert response into complaintactivity table
$sql = "INSERT INTO complaintactivity (complaint_id, actor_id, activity_type, activity_text, activity_date) 
        VALUES (?, ?, 'Response', ?, NOW())";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(['success' => false, 'error' => 'Database prepare error: ' . $conn->error]);
    exit;
}

$stmt->bind_param('iis', $complaintId, $officerId, $message);

if ($stmt->execute()) {
    // Create notification for the citizen
    $userQuery = "SELECT citizen_id FROM complaints WHERE complaint_id = ?";
    $userStmt = $conn->prepare($userQuery);
    if ($userStmt) {
        $userStmt->bind_param('i', $complaintId);
        $userStmt->execute();
        $userRes = $userStmt->get_result();
        if ($userRes && $userRes->num_rows > 0) {
            $row = $userRes->fetch_assoc();
            $citizenId = (int)$row['citizen_id'];
            $notifMsg = 'Officer responded to your complaint';
            $statusForNotif = 'InProgress';

            $notifStmt = $conn->prepare("INSERT INTO notifications (user_id, complaint_id, status, message, is_read) VALUES (?, ?, ?, ?, 0)");
            if ($notifStmt) {
                $notifStmt->bind_param('iiss', $citizenId, $complaintId, $statusForNotif, $notifMsg);
                $notifStmt->execute();
                $notifStmt->close();
            }
        }
        $userStmt->close();
    }

    echo json_encode([
        'success' => true,
        'message' => 'Response sent successfully'
    ]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to send response: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
