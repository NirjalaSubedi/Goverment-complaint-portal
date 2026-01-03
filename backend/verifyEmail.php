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
        if (!isset($_SESSION['pending_registration']) || $_SESSION['pending_registration']['email'] !== $email) {
            echo json_encode(['success' => false, 'message' => 'Registration data not found. Please register again.']);
            exit();
        }
        
        $pending = $_SESSION['pending_registration'];
        
        // Check verification code
        if ($submittedCode !== $pending['verification_code']) {
            echo json_encode(['success' => false, 'message' => 'Invalid verification code']);
            exit();
        }
        
        // Code is valid - NOW insert into users table
        $fullname = mysqli_real_escape_string($conn, $pending['full_name']);
        $phonenumber = mysqli_real_escape_string($conn, $pending['phone_number']);
        $address = mysqli_real_escape_string($conn, $pending['address']);
        $citizenship = mysqli_real_escape_string($conn, $pending['citizenship_number']);
        $hashed_password = $pending['password_hash'];
        $user_type = $pending['user_type'];
        
        if ($user_type === 'Officer') {
            $departmentId = $pending['department_id'];
            $position = $pending['position'];
            $departmentIdSql = ($departmentId !== null) ? $departmentId : 'NULL';
            $positionSql = ($position !== '' && $position !== null) ? "'$position'" : 'NULL';
            
            $sql = "INSERT INTO users(full_name, phone_number, email, address, citizenship_number, password_hash, user_type, department_id, position, is_approved, email_verified)
                    VALUES ('$fullname', '$phonenumber', '$email', '$address', '$citizenship', '$hashed_password', '$user_type', $departmentIdSql, $positionSql, 'Pending', 1)";
        } else {
            $sql = "INSERT INTO users(full_name, phone_number, email, address, citizenship_number, password_hash, user_type, is_approved, email_verified)
                    VALUES ('$fullname', '$phonenumber', '$email', '$address', '$citizenship', '$hashed_password', '$user_type', 'Approved', 1)";
        }
        
        
        exit();
    }
}
?>
