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
$categoryName = strtolower(trim($_POST['complaint-type'] ?? ''));
$subject      = mysqli_real_escape_string($conn, $_POST['subject'] ?? '');
$location     = mysqli_real_escape_string($conn, $_POST['location'] ?? '');
$priorityRaw  = strtolower(trim($_POST['priorityLevel'] ?? ''));
$description  = mysqli_real_escape_string($conn, $_POST['description'] ?? '');
$priorityMap = [
    'high' => 'High',
    'medium' => 'Medium',
    'low' => 'Low'
];
$priority = $priorityMap[$priorityRaw] ?? 'Low';

// Normalize category names
$categoryAliases = [
    'watersupply' => 'Water Supply',
    'water' => 'Water Supply',
    'electricity' => 'Electricity',
    'roaddamage' => 'Road Damage',
    'road' => 'Road Damage',
    'healthcare' => 'Health Care',
    'health' => 'Health Care',
    'corruption' => 'Corruption',
    'other' => 'Other'
];
$normalizedCategory = $categoryAliases[$categoryName] ?? ucfirst($categoryName);



$conn->close();
?>