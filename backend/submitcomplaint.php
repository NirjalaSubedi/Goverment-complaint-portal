<?php
    include '../includes/databaseConnection.php';
    if(isset($_POST['submit'])){
         $subject= mysqli_real_escape_string($conn, $_POST['subject'] ?? '');
         $location= mysqli_real_escape_string($conn, $_POST['location'] ?? '');
        $description= mysqli_real_escape_string($conn, $_POST['description'] ?? '');
    }

?>