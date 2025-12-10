<?php
include '../includes/databaseConnection.php';
if (isset($_POST['submit'])) {
    $fullname = $_POST['fullName'];
    $phonenumber = $_POST['phonenumber'];
    $email = $_POST['email']; 
    $citizenship = $_POST['citizenshipNumber']; 
    $password = $_POST['password']; 
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $user_type = 'Citizen'; 
    $is_approved = 'Approved'; 
    $sql = "INSERT INTO users(full_name, phone_number, email, citizenship_number, password_hash, user_type, is_approved) 
            VALUES ('$fullname', '$phonenumber', '$email', '$citizenship', '$hashed_password', '$user_type', '$is_approved')";
    
    if (mysqli_query($conn, $sql)) {
        echo "User created successfully";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>