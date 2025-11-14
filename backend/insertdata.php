<?php
include 'databaseConnection.php';

if (isset($_POST['submit'])) {
    
    $complaintType = mysqli_real_escape_string($conn, $_POST['complaint-type']);
    $subject = mysqli_real_escape_string($conn, $_POST['subject']);
    $location = mysqli_real_escape_string($conn, $_POST['location']);
    $priorityLevel = (int)$_POST['priorityLevel']; 
    $description = mysqli_real_escape_string($conn, $_POST['description']);
    $attachment = mysqli_real_escape_string($conn, $_POST['attachment']);

    $sql = "INSERT INTO complaints (complaint_type, subject, location, priority_level, description, attachment)
            VALUES ('$complaintType', '$subject', '$location', $priorityLevel, '$description', '$attachment')";

    if (mysqli_query($conn, $sql)) {
        echo " Complaint submitted successfully!";
    } else {
        echo "Error: " . mysqli_error($conn);
    }

    mysqli_close($conn);
}
?>