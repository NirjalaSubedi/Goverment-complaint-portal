<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "goverment_complaint_portal";

// Database connection
$conn = mysqli_connect($host, $user, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}else{
    echo"connection sucecssfull";
}
?>