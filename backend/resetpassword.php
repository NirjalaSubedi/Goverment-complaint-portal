<?php
header('Content-Type: application/json');
require_once '../includes/databaseConnection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $verificationCode = $_POST['verificationCode'] ?? '';
    $newPassword = $_POST['newPassword'] ?? '';
    
    if (empty($email) || empty($verificationCode) || empty($newPassword)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }
    
    $conn->query("DELETE FROM password_reset WHERE expiry_time < NOW() OR created_at < DATE_SUB(NOW(), INTERVAL 1 DAY)");
    
    $latestStmt = $conn->prepare("SELECT id, verification_code, expiry_time, used FROM password_reset WHERE email = ? ORDER BY created_at DESC LIMIT 1");
    $latestStmt->bind_param("s", $email);
    $latestStmt->execute();
    $latest = $latestStmt->get_result()->fetch_assoc();
    
    if (!$latest) {
        echo json_encode(['success' => false, 'message' => 'No verification code found for this email']);
        exit;
    }
    
    $codesMatch = ($latest['verification_code'] === $verificationCode);
    $isExpired = strtotime($latest['expiry_time']) < time();
    $alreadyUsed = (bool)$latest['used'];
    
    if (!$codesMatch || $isExpired || $alreadyUsed) {
        echo json_encode([
            'success' => false,
            'message' => 'Invalid or expired verification code',
            'debug' => [
                'expected_code' => $latest['verification_code'],
                'entered_code' => $verificationCode,
                'codes_match' => $codesMatch,
                'expiry_time' => $latest['expiry_time'],
                'current_time' => date('Y-m-d H:i:s'),
                'is_expired' => $isExpired,
                'already_used' => $alreadyUsed
            ]
        ]);
        exit;
    }
    
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
    
    $updateStmt = $conn->prepare("UPDATE users SET password_hash = ? WHERE email = ?");
    $updateStmt->bind_param("ss", $hashedPassword, $email);
    
    if ($updateStmt->execute()) {
        $markUsedStmt = $conn->prepare("UPDATE password_reset SET used = TRUE WHERE id = ?");
        $markUsedStmt->bind_param("i", $latest['id']);
        $markUsedStmt->execute();
        
        echo json_encode(['success' => true, 'message' => 'Password updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error updating password: ' . $updateStmt->error]);
    }
    
    $latestStmt->close();
    if(isset($updateStmt)) $updateStmt->close();
    if(isset($markUsedStmt)) $markUsedStmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
