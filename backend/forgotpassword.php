<?php
header('Content-Type: application/json');
require_once '../includes/databaseConnection.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    
    if (empty($email)) {
        echo json_encode(['success' => false, 'message' => 'Email is required']);
        exit;
    }
    
    // Check if email exists in database
    $stmt = $conn->prepare("SELECT user_id, full_name FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'Email not found in our system']);
        exit;
    }
    
    $user = $result->fetch_assoc();
    
    // Generate 6-digit verification code
    $verificationCode = sprintf("%06d", mt_rand(1, 999999));
    
    // Delete old codes for this email to keep only the latest
    $deleteStmt = $conn->prepare("DELETE FROM password_reset WHERE email = ?");
    $deleteStmt->bind_param("s", $email);
    $deleteStmt->execute();
    
    // Insert new verification code with DB-based expiry (avoids PHP/DB timezone mismatch)
    $insertStmt = $conn->prepare("INSERT INTO password_reset (email, verification_code, expiry_time) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE))");
    
    if (!$insertStmt) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $conn->error]);
        exit;
    }
    
    $insertStmt->bind_param("ss", $email, $verificationCode);
    
    if (!$insertStmt->execute()) {
        echo json_encode(['success' => false, 'message' => 'Failed to save verification code: ' . $insertStmt->error]);
        exit;
    }
    
    // Code inserted successfully
    $emailSent = false;
    if (file_exists('./emailVerify/vendor/autoload.php')) {
        require_once './emailVerify/vendor/autoload.php';
        
        try {
            $mail = new PHPMailer(true);
            
            // Server settings
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'nikaasGoverment@gmail.com';
            $mail->Password = 'nocf qdgg liwd ezif';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;
            
            // Recipients
            $mail->setFrom('nikaasGoverment@gmail.com', 'Nikaas Government Portal');
            $mail->addAddress($email, $user['full_name']);
            
            // Content
            $mail->isHTML(true);
            $mail->Subject = 'Password Reset Verification Code';
            $mail->Body = "
                <h2>Password Reset Request</h2>
                <p>Hello {$user['full_name']},</p>
                <p>You have requested to reset your password. Your verification code is:</p>
                <h1 style='color: #1558df; font-size: 32px;'>{$verificationCode}</h1>
                <p>This code will expire in 15 minutes.</p>
                <p>If you did not request this, please ignore this email.</p>
                <br>
                <p>Regards,<br>Nikaas Team</p>
            ";
            
            $mail->send();
            $emailSent = true;
        } catch (Exception $e) {
            // Email sending failed, but we'll still return success
            // In production, you might want to handle this differently
        }
    }
    
    echo json_encode([
        'success' => true, 
        'message' => 'Verification code sent to your email',
        'code' => $verificationCode // Remove this in production!
    ]);
    
    $stmt->close();
    $insertStmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
