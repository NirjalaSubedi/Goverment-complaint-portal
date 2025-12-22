<?php
session_start();
include '../includes/databaseConnection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = mysqli_real_escape_string($conn, $_POST['loginemail'] ?? '');
    $password = $_POST['loginpassword'] ?? '';

    if (empty($email) || empty($password)) {
        echo "<script>alert('Please enter both email and password'); window.location.href='../frontend/login.html';</script>";
        exit();
    }

    // Query to get user by email
    $sql = "SELECT user_id, full_name, email, password_hash, user_type, is_approved FROM users WHERE email = '$email' LIMIT 1";
    $result = mysqli_query($conn, $sql);

    if ($result && mysqli_num_rows($result) === 1) {
        $user = mysqli_fetch_assoc($result);

        // Verify password
        if (password_verify($password, $user['password_hash'])) {
            // Check if officer is approved
            if ($user['user_type'] === 'Officer' && $user['is_approved'] !== 'Approved') {
                echo "<script>alert('Your account is pending approval. Please wait for admin approval.'); window.location.href='../frontend/login.html';</script>";
                exit();
            }

            // Set session variables
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['full_name'] = $user['full_name'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['user_type'] = $user['user_type'];

            // Redirect based on user type
            if ($user['user_type'] === 'Citizen') {
                header("Location: ../frontend/citizendashboard.html");
            } else if ($user['user_type'] === 'Officer') {
                header("Location: ../frontend/officerdasboard.html");
            }
            exit();
        } else {
            echo "<script>alert('Invalid email or password'); window.location.href='../frontend/login.html';</script>";
            exit();
        }
    } else {
        echo "<script>alert('Invalid email or password'); window.location.href='../frontend/login.html';</script>";
        exit();
    }
} else {
    header("Location: ../frontend/login.html");
    exit();
}
?>
