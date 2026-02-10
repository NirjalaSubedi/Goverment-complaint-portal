<?php
session_start();
require_once '../includes/databaseConnection.php';

$test_user_id = 3;
$test_complaint_id = 31;
$test_status = "InProgress";
$test_message = "Test notification";

echo "<h2>Testing Notification Insertion</h2>";

$query = "INSERT INTO notifications (user_id, complaint_id, status, message, is_read) VALUES (?, ?, ?, ?, 0)";
$stmt = $conn->prepare($query);

if ($stmt) {
    echo "<p>✓ Statement prepared successfully</p>";
    
    $stmt->bind_param("iiss", $test_user_id, $test_complaint_id, $test_status, $test_message);
    
    if ($stmt->execute()) {
        echo "<p style='color:green;'>✓ Notification inserted successfully! ID: " . $stmt->insert_id . "</p>";
    } else {
        echo "<p style='color:red;'>✗ Execute failed: " . $stmt->error . "</p>";
    }
    $stmt->close();
} else {
    echo "<p style='color:red;'>✗ Prepare failed: " . $conn->error . "</p>";
}

$checkQuery = "SELECT * FROM notifications ORDER BY created_at DESC LIMIT 5";
$result = $conn->query($checkQuery);

echo "<h3>Recent Notifications:</h3>";
if ($result->num_rows > 0) {
    echo "<table border='1'>";
    echo "<tr><th>ID</th><th>User ID</th><th>Complaint ID</th><th>Status</th><th>Message</th><th>Is Read</th><th>Created At</th></tr>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row['notification_id'] . "</td>";
        echo "<td>" . $row['user_id'] . "</td>";
        echo "<td>" . $row['complaint_id'] . "</td>";
        echo "<td>" . $row['status'] . "</td>";
        echo "<td>" . $row['message'] . "</td>";
        echo "<td>" . $row['is_read'] . "</td>";
        echo "<td>" . $row['created_at'] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "<p>No notifications found</p>";
}

$conn->close();
?>
