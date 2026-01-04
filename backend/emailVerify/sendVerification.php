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
        
        $body = "
        <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
                    .container { 
                        max-width: 600px; 
                        margin: 0 auto; 
                        background-color: #ffffff; 
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .header { color: #333; margin-bottom: 20px; }
                    .code-box {
                        background-color: #f0f0f0;
                        border: 2px dashed #007bff;
                        padding: 15px;
                        text-align: center;
                        font-size: 24px;
                        font-weight: bold;
                        color: #007bff;
                        margin: 20px 0;
                        border-radius: 5px;
                    }
                    .footer { color: #666; font-size: 12px; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class='container'>
                    <h2 class='header'>Email Verification Required</h2>
                    <p>Hello " . htmlspecialchars($recipientName) . ",</p>
                    <p>Thank you for registering with Government Complaint Portal. To complete your registration, please verify your email address using the verification code below:</p>
                    
                    <div class='code-box'>" . htmlspecialchars($verificationCode) . "</div>
                    
                    <p>This verification code is valid for 24 hours.</p>
                    <p>If you did not create this account, please ignore this email.</p>
                    
                    <div class='footer'>
                        <p>Government Complaint Portal &copy; 2026</p>
                    </div>
                </div>
            </body>
        </html>
        ";
        
        $mail->Body = $body;
        $mail->AltBody = "Your verification code is: " . $verificationCode;
        
        $mail->send();
        return true;
        
    } catch (Exception $e) {
        $errorMsg = "Email sending failed: " . $mail->ErrorInfo;
        error_log($errorMsg);
        file_put_contents('../uploads/email_error_log.txt', date('Y-m-d H:i:s') . " - " . $errorMsg . "\n", FILE_APPEND);
        return false;
    }
}

/**
 * Generate a random verification code
 * @return string - 6-digit verification code
 */
function generateVerificationCode() {
    return str_pad(mt_rand(0, 999999), 6, '0', STR_PAD_LEFT);
}
?>
