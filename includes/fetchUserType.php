<?php
// Fetch user type based on username
session_start();

if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $query = "SELECT user_type FROM users WHERE username = '$username'";
    $result = mysqli_query($conn, $query);
    if ($result) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
    } else {
        echo json_encode(['error' => 'User type not found.']);
    }
} else {
    echo json_encode(['error' => 'No user logged in.']);
}
?>