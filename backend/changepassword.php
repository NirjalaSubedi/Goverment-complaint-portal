<?php
session_start();
include '../includes/databaseConnection.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo "<script>
        alert('Please login first.');
        window.location.href = '../frontend/login.html';
    </script>";
    exit;
}

$userId = $_SESSION['user_id'];
$oldPassword = $_POST['oldPassword'] ?? '';
$newPassword = $_POST['newPassword'] ?? '';
$confirmPassword = $_POST['confirmPassword'] ?? '';


$conn->close();
?>
