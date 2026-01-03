<?php
session_start();
include __DIR__ . '/../includes/databaseConnection.php';
include __DIR__ . '/emailVerify/sendVerification.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $action = $_POST['action'];
    
    // Verify submitted code
    if ($action === 'verify_code') {
        $email = mysqli_real_escape_string($conn, $_POST['email'] ?? '');
        $submittedCode = mysqli_real_escape_string($conn, $_POST['code'] ?? '');
        
        // Check if pending registration exists
        
    }
}
?>
