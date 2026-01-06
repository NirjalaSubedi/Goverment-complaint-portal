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
if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON body']);
    exit;
}

$citizenId     = (int)$_SESSION['user_id'];
$draftId       = isset($input['draft_id']) ? (int)$input['draft_id'] : 0;
$complaintType = trim($input['complaintType'] ?? '');
$subject       = trim($input['subject'] ?? '');
$location      = trim($input['location'] ?? '');
$priorityRaw   = strtolower(trim($input['priorityLevel'] ?? ''));
$description   = trim($input['description'] ?? '');

$priorityMap = [
    'high' => 'High',
    'medium' => 'Medium',
    'low' => 'Low'
];
$priorityLevel = $priorityMap[$priorityRaw] ?? '';

if ($subject === '' && $description === '' && $location === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please enter at least subject, location, or description to save a draft.']);
    exit;
}

try {
    if ($draftId > 0) {
        $stmt = $conn->prepare('SELECT draft_id FROM complaint_drafts WHERE draft_id = ? AND citizen_id = ? LIMIT 1');
        $stmt->bind_param('ii', $draftId, $citizenId);
        $stmt->execute();
        $res = $stmt->get_result();
        $exists = $res && $res->num_rows === 1;
        $stmt->close();
    } else {
        $exists = false;
    }

    if ($exists) {
        $stmt = $conn->prepare('UPDATE complaint_drafts SET complaint_type = ?, subject = ?, location = ?, priority_level = ?, description = ?, updated_at = NOW() WHERE draft_id = ? AND citizen_id = ?');
        $stmt->bind_param('ssssssi', $complaintType, $subject, $location, $priorityLevel, $description, $draftId, $citizenId);
        $ok = $stmt->execute();
        $stmt->close();
    } else {
        $stmt = $conn->prepare('INSERT INTO complaint_drafts (citizen_id, complaint_type, subject, location, priority_level, description) VALUES (?, ?, ?, ?, ?, ?)');
        $stmt->bind_param('isssss', $citizenId, $complaintType, $subject, $location, $priorityLevel, $description);
        $ok = $stmt->execute();
        if ($ok) {
            $draftId = $stmt->insert_id;
        }
        $stmt->close();
    }

    if (!$ok) {
        throw new Exception('Database error saving draft.');
    }

    echo json_encode(['success' => true, 'draft_id' => $draftId]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

$conn->close();
