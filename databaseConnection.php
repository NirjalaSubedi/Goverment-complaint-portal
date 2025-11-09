<?php
$host = "localhost";    
$user = "root";          
$password = "";       
$dbname = "goverment_complaint_portal"; 
$conn = mysqli_connect($host, $user, $password, $dbname);
if ($conn) {
    echo "(Connection successful)";
} else {
    echo "error";
}
?>