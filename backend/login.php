<?php
session_start();
include '../includes/databaseConnection.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

$email = trim($_POST['loginemail'] ?? '');
$password = $_POST['loginpassword'] ?? '';

if ($email === '' || $password === '') {
    echo "<script>alert('Email ra password halnu hos.'); window.history.back();</script>";
    exit;
}

// Prepared statement to prevent SQL injection
$stmt = $conn->prepare('SELECT user_id, email, full_name, password_hash FROM users WHERE email = ? LIMIT 1');
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows === 1) {
    $row = $result->fetch_assoc();

    // Support hashed passwords; fallback to plain-text match if legacy data
    $valid = password_verify($password, $row['password_hash']) || hash_equals($row['password_hash'], $password);

    if ($valid) {
        $_SESSION['user_id'] = $row['user_id'];
        $_SESSION['user_email'] = $row['email'];
        $_SESSION['user_name'] = $row['full_name'];

        echo "<script>alert('Login Successful!'); window.location.href = '../dashboard.php';</script>";
        exit;
    } else {
        // Password doesn't match
        echo "<script>alert('Invalid Password'); window.history.back();</script>";
        exit;
    }
} else {
    // Email not found in database
    echo "<script>alert('Invalid Email'); window.history.back();</script>";
    exit;
}

$stmt->close();
$conn->close();