<?php
    include 'databaseConnection.php';
    if($_POST['submit']){
        $complaintType= $_POST['complaint-type'];
        $subject= $_POST['subject'];
        $Location= $_POST['location'];
        $priorityLevel= $_POST['priorityLevel'];
        $description= $_POST['description'];
        $attachment= $_POST['attachment'];

    }
    
 ?>