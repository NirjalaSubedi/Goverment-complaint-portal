<?php
session_start();
header('Content-Type: application/json');
require_once '../includes/databaseConnection.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input) || !isset($input['draft_id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'draft_id is required']);
    exit;
}

$citizenId = (int)$_SESSION['user_id'];
$draftId   = (int)$input['draft_id'];

$stmt = $conn->prepare('DELETE FROM complaint_drafts WHERE draft_id = ? AND citizen_id = ?');
$stmt->bind_param('ii', $draftId, $citizenId);
$ok = $stmt->execute();
$stmt->close();
$conn->close();

if ($ok) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to delete draft']);
}
