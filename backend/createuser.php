<?php
include '../includes/databaseConnection.php';
if (isset($_POST['submit'])) {
    $fullname = $_POST['fullName'];
    $phonenumber = $_POST['phonenumber'];
    $email = $_POST['email']; 
    $citizenship = $_POST['citizenshipNumber'];
    $sql = "INSERT INTO users(full_name, phone_number, email,  citizenshipnumber) 
            VALUES ('$fullname', '$phonenumber', '$email', '$citizenship')";
    if (mysqli_query($conn, $sql)) {
        echo "User created successfully";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>