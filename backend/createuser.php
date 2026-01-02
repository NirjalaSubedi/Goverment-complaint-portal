<?php
include '../includes/databaseConnection.php';
if (isset($_POST['submit'])) {
    $fullname    = mysqli_real_escape_string($conn, $_POST['fullName'] ?? '');
    $phonenumber = mysqli_real_escape_string($conn, $_POST['phonenumber'] ?? '');
    $email       = mysqli_real_escape_string($conn, $_POST['email'] ?? '');
    $address     = mysqli_real_escape_string($conn, $_POST['address'] ?? '');
    $citizenship = mysqli_real_escape_string($conn, $_POST['citizenshipNumber'] ?? '');
    $password    = $_POST['password'] ?? '';
    $user_type   = mysqli_real_escape_string($conn, $_POST['userType'] ?? 'Citizen');

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $is_approved = ($user_type === 'Officer') ? 'Pending' : 'Approved';

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
        
        $departmentIdSql = ($departmentId !== null) ? $departmentId : 'NULL';
        $positionSql = ($position !== '') ? "'$position'" : 'NULL';

        // Handle officer ID file upload; stored in userdocuments after user is created
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
        // Insert officer; use department_id column in users
        $sql = "INSERT INTO users(full_name, phone_number, email, address, citizenship_number, password_hash, user_type, department_id, position, is_approved)
                VALUES ('$fullname', '$phonenumber', '$email', '$address', '$citizenship', '$hashed_password', '$user_type', $departmentIdSql, $positionSql, '$is_approved')";
    } else {
        $sql = "INSERT INTO users(full_name, phone_number, email, address, citizenship_number, password_hash, user_type, is_approved)
                VALUES ('$fullname', '$phonenumber', '$email', '$address', '$citizenship', '$hashed_password', '$user_type', '$is_approved')";
    }
    
    if (mysqli_query($conn, $sql)) {
        $newUserId = mysqli_insert_id($conn);
        
        // If officer and we have a document path, insert into userdocuments
        if ($user_type === 'Officer' && !empty($uploadedDocPath)) {
            $docType = 'OfficerID';
            $docPathEsc = mysqli_real_escape_string($conn, $uploadedDocPath);
            mysqli_query($conn, "INSERT INTO userdocuments(user_id, document_type, file_path, upload_date) VALUES ($newUserId, '$docType', '$docPathEsc', NOW())");
        }
        header("Location: ../frontend/auth.html");
        exit();
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}


?>