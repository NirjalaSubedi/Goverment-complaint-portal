<?php
session_start();
include '../includes/databaseConnection.php';
include './emailVerify/sendVerification.php';

if (isset($_POST['submit'])) {
    $fullname    = mysqli_real_escape_string($conn, $_POST['fullName'] ?? '');
    $phonenumber = mysqli_real_escape_string($conn, $_POST['phonenumber'] ?? '');
    $email       = mysqli_real_escape_string($conn, $_POST['email'] ?? '');
    $address     = mysqli_real_escape_string($conn, $_POST['address'] ?? '');
    $citizenship = mysqli_real_escape_string($conn, $_POST['citizenshipNumber'] ?? '');
    $password    = $_POST['password'] ?? '';
    $user_type   = mysqli_real_escape_string($conn, $_POST['userType'] ?? 'Citizen');

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Generate verification code BEFORE storing
    $verificationCode = generateVerificationCode();
    $expiryTime = date('Y-m-d H:i:s', strtotime('+24 hours'));

    if ($user_type === 'Officer') {
        // Get department name from form
        $departmentName = mysqli_real_escape_string($conn, $_POST['department'] ?? '');
        $position = mysqli_real_escape_string($conn, $_POST['position'] ?? '');
        
        $departmentId = null;
        
        if ($departmentName !== '') {
            $depRes = mysqli_query($conn, "SELECT department_id FROM departments WHERE department_name = '$departmentName' LIMIT 1");
            if ($depRes && mysqli_num_rows($depRes) === 1) {
                $depRow = mysqli_fetch_assoc($depRes);
                $departmentId = (int)$depRow['department_id'];
            } else {
                $insertDept = mysqli_query($conn, "INSERT INTO departments (department_name) VALUES ('$departmentName')");
                if ($insertDept) {
                    $departmentId = mysqli_insert_id($conn);
                }
            }
        }
        
        // Handle officer ID file upload
        $uploadedDocPath = '';

        if (isset($_FILES['officerId']) && $_FILES['officerId']['error'] === 0) {
            $uploadDir = '../uploads/officer_ids/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }

            $fileName = time() . '_' . basename($_FILES['officerId']['name']);
            $uploadFile = $uploadDir . $fileName;
            if (move_uploaded_file($_FILES['officerId']['tmp_name'], $uploadFile)) {
                $uploadedDocPath = $uploadFile;
            }
        }
        
        $_SESSION['pending_registration'] = [
            'full_name' => $fullname,
            'phone_number' => $phonenumber,
            'email' => $email,
            'address' => $address,
            'citizenship_number' => $citizenship,
            'password_hash' => $hashed_password,
            'user_type' => $user_type,
            'department_id' => $departmentId,
            'position' => $position,
            'officer_id_path' => $uploadedDocPath,
            'verification_code' => $verificationCode
        ];
    } else {
        $_SESSION['pending_registration'] = [
            'full_name' => $fullname,
            'phone_number' => $phonenumber,
            'email' => $email,
            'address' => $address,
            'citizenship_number' => $citizenship,
            'password_hash' => $hashed_password,
            'user_type' => $user_type,
            'verification_code' => $verificationCode
        ];
    }
    
    if (sendVerificationEmail($email, $fullname, $verificationCode)) {
        header("Location: ../frontend/auth.html?email=" . urlencode($email));
        exit();
    } else {
        header("Location: ../frontend/auth.html?email=" . urlencode($email));
        exit();
    }
}


?>