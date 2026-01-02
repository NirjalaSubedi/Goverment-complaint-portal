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

if (empty($oldPassword) || empty($newPassword) || empty($confirmPassword)) {
    echo "<script>
        alert('Please fill all fields.');
        window.location.href = '../frontend/password/changepassword.html';
    </script>";
    exit;
}

// Check if new passwords match
if ($newPassword !== $confirmPassword) {
    echo "<script>
        alert('New password and confirm password do not match.');
        window.location.href = '../frontend/password/changepassword.html';
    </script>";
    exit;
}

// Get current password from database
$stmt = $conn->prepare('SELECT password_hash FROM users WHERE user_id = ?');
$stmt->bind_param('i', $userId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows !== 1) {
    echo "<script>
        alert('User not found.');
        window.location.href = '../frontend/login.html';
    </script>";
    exit;
}

$row = $result->fetch_assoc();
$currentPasswordHash = $row['password_hash'];

// Verify old password
$validOldPassword = password_verify($oldPassword, $currentPasswordHash) || hash_equals($currentPasswordHash, $oldPassword);

if (!$validOldPassword) {
    echo "<script>
        alert('Old password is incorrect.');
        window.location.href = '../frontend/password/changepassword.html';
    </script>";
    exit;
}

// Hash new password
$newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);

// Update password in database
$updateStmt = $conn->prepare('UPDATE users SET password_hash = ? WHERE user_id = ?');
$updateStmt->bind_param('si', $newPasswordHash, $userId);

if ($updateStmt->execute()) {
    echo "<script>
        alert('Password changed successfully!');
        window.location.href = '../frontend/settings.html';
    </script>";
} else {
    echo "<script>
        alert('Error changing password. Please try again.');
        window.location.href = '../frontend/password/changepassword.html';
    </script>";
}

$stmt->close();
$updateStmt->close();
$conn->close();
?>
