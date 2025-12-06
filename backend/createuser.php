<?php
include '../includes/databaseConnection.php';
if($_POST['submit']){
    $fullname=$_POST['fullName'];
    $phonenumber=$_POST['phonenumber'];
    $email=$_POST['email'];
    $address=$_POST['address'];
    $department=$_POST['department'];
    $citizenship=$_POST['citizenshipNumber'];
    $officerId=$_FILES['officerId']['name'];
    $password=$_POST['password'];
    $confirmPassword=$_POST['confirmPassword'];
}
?>

