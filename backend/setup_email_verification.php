<?php
include '../includes/databaseConnection.php';
$checkTable = mysqli_query($conn, "SHOW TABLES LIKE 'email_verification'");
$tableExists = mysqli_num_rows($checkTable) > 0;

if ($tableExists) {
    echo "<h3 style='color: green;'>Email verification table already exists.</h3>";
} else {
    $createTable = "CREATE TABLE email_verification (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        email VARCHAR(255) NOT NULL,
        verification_code VARCHAR(6) NOT NULL,
        code_expiry DATETIME NOT NULL,
        is_verified TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    )";
    
    if (mysqli_query($conn, $createTable)) {
        echo "<h3 style='color: green;'>Email verification table created successfully!</h3>";
    } else {
        echo "<h3 style='color: red;'>Error creating table: " . mysqli_error($conn) . "</h3>";
    }
}

$checkColumn = mysqli_query($conn, "SHOW COLUMNS FROM users LIKE 'email_verified'");
$columnExists = mysqli_num_rows($checkColumn) > 0;

if ($columnExists) {
    echo "<p style='color: green;'>Column 'email_verified' already exists in users table.</p>";
} else {
    $addColumn = "ALTER TABLE users ADD COLUMN email_verified TINYINT(1) DEFAULT 0";
    if (mysqli_query($conn, $addColumn)) {
        echo "<p style='color: green;'>Column 'email_verified' added to users table successfully!</p>";
    } else {
        echo "<p style='color: red;'>Error adding column: " . mysqli_error($conn) . "</p>";
    }
}

echo "<hr>";
echo "<h3>Setup Instructions:</h3>";
echo "<ol>";
echo "<li>Update the PHPMailer settings in <strong>backend/emailVerify/sendVerification.php</strong>:</li>";
echo "<ul>";
echo "<li>Change <code>your-email@gmail.com</code> to your Gmail address</li>";
echo "<li>Change <code>your-app-password</code> to your Gmail App Password</li>";
echo "<li>To get an App Password: Enable 2-factor authentication in your Google Account, then generate an App Password</li>";
echo "</ul>";
echo "<li>After updating credentials, the email verification system will be ready to use</li>";
echo "</ol>";

echo "<style>";
echo "body { font-family: Arial, sans-serif; margin: 20px; }";
echo "code { background-color: #f4f4f4; padding: 2px 6px; border-radius: 3px; }";
echo "</style>";

mysqli_close($conn);
?>
