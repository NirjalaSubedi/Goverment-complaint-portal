<?php
$host='localhost';
$user='dbuser';
$password='';
$database='goverment_complaint_portal';
$connection = mysqli_connect($host, $user, $password, $database);
if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}else{
    echo "Connected successfully";
}
?>
