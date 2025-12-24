<?php
session_start();
include '../includes/databaseConnection.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method not allowed');
}

if (!isset($_SESSION['user_id'])) {
    echo "<script>alert('Please login first.'); window.location.href='../frontend/login.html';</script>";
    exit;
}
?>