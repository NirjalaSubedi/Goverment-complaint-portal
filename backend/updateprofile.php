<?php
session_start();
header('Content-Type: application/json');
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'Not logged in']);
    exit;
}
include('../includes/databaseConnection.php');
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['success' => false, 'error' => 'Invalid input']);
    exit;
}

$userId = $_SESSION['user_id'];
$fullName = trim($input['fullName'] ?? '');
$phoneNumber = trim($input['phoneNumber'] ?? '');
$email = trim($input['email'] ?? '');
$address = trim($input['address'] ?? '');
if (empty($fullName) || empty($phoneNumber) || empty($email) || empty($address)) {
    echo json_encode(['success' => false, 'error' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Invalid email format']);
    exit;
}

if (!preg_match('/^[0-9]{10}$/', $phoneNumber)) {
    echo json_encode(['success' => false, 'error' => 'Phone number must be 10 digits']);
    exit;
}

// Update user profile in database
$sql = "UPDATE users SET full_name = ?, phone_number = ?, email = ?, address = ? WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ssssi', $fullName, $phoneNumber, $email, $address, $userId);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true, 
        'message' => 'Profile updated successfully',
        'data' => [
            'fullName' => $fullName,
            'phoneNumber' => $phoneNumber,
            'email' => $email,
            'address' => $address
        ]
    ]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to update profile: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
