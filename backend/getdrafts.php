<?php
session_start();
header('Content-Type: application/json');
require_once '../includes/databaseConnection.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'Unauthorized']);
    exit;
}

$citizenId = (int)$_SESSION['user_id'];

$stmt = $conn->prepare('SELECT draft_id, complaint_type, subject, location, priority_level, description, created_at, updated_at FROM complaint_drafts WHERE citizen_id = ? ORDER BY updated_at DESC');
$stmt->bind_param('i', $citizenId);
$stmt->execute();
$result = $stmt->get_result();
$drafts = [];
while ($row = $result->fetch_assoc()) {
    $drafts[] = $row;
}
$stmt->close();
$conn->close();

echo json_encode(['success' => true, 'drafts' => $drafts]);
