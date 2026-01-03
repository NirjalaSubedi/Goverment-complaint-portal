<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php';
function sendVerificationEmail($recipientEmail, $recipientName, $verificationCode) {
    $mail = new PHPMailer(true);
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; 
        $mail->SMTPAuth   = true;
        $mail->Username   = 'nikaasGoverment@gmail.com';  
        $mail->Password   = 'nocf qdgg liwd ezif';    
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        
        // Recipients
        $mail->setFrom('nikaasGoverment@gmail.com', 'Government Complaint Portal');
        $mail->addAddress($recipientEmail, $recipientName);
        
        // Content
        $mail->isHTML(true);
        $mail->Subject = 'Email Verification Code - Government Complaint Portal';
        
        
/**
 * Generate a random verification code
 * @return string - 6-digit verification code
 */
function generateVerificationCode() {
    return str_pad(mt_rand(0, 999999), 6, '0', STR_PAD_LEFT);
}
?>
