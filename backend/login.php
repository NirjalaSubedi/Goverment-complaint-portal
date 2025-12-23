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
    echo "<script>
        alert('Email ra password halnu hos.');
        window.location.href = '../frontend/login.html';
    </script>";
    exit;
}

$stmt = $conn->prepare('SELECT user_id, email, full_name, password_hash, user_type FROM users WHERE email = ? LIMIT 1');
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows === 1) {
    $row = $result->fetch_assoc();

    // hashed passwords; fallback to plain-text match if legacy data
    $valid = password_verify($password, $row['password_hash']) || hash_equals($row['password_hash'], $password);

    if ($valid) {
        $_SESSION['user_id'] = $row['user_id'];
        $_SESSION['user_email'] = $row['email'];
        $_SESSION['user_name'] = $row['full_name'];
        $_SESSION['user_type'] = $row['user_type'];

        // Update last_login_at
        $updateStmt = $conn->prepare('UPDATE users SET last_login_at = NOW() WHERE user_id = ?');
        $updateStmt->bind_param('i', $row['user_id']);
        $updateStmt->execute();
        $updateStmt->close();

        // Redirect based on user type
        if ($row['user_type'] === 'Citizen') {
            echo "<script>window.location.href = '../frontend/citizendashboard.html';</script>";
        } else if ($row['user_type'] === 'Officer') {
            echo "<script>window.location.href = '../frontend/officerdasboard.html';</script>";
        } else {
            //admin or other types  
            echo "window.location.href = '../frontend/index1.html';</script>";
        }
        exit;
    } else {
        echo "<script>
            alert('Invalid Password');
            window.location.href = '../frontend/login.html';
        </script>";
        exit;
    }
} else {
    echo "<script>
        alert('Invalid Email');
        window.location.href = '../frontend/login.html';
    </script>";
    exit;
}

$stmt->close();
$conn->close();