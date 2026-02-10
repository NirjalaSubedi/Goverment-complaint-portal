<?php
include '../includes/databaseConnection.php';

$createPendingTable = "CREATE TABLE IF NOT EXISTS pending_registrations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    email VARCHAR(255) NOT NULL UNIQUE,
    address TEXT,
    citizenship_number VARCHAR(50),
    password_hash VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) DEFAULT 'Citizen',
    department_id INT,
    position VARCHAR(100),
    officer_id_path VARCHAR(255),
    verification_code VARCHAR(6) NOT NULL,
    code_expiry DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE SET NULL
)";

if (mysqli_query($conn, $createPendingTable)) {
    echo "<p style='color: green;'><strong>✓ pending_registrations table created successfully!</strong></p>";
} else {
    echo "<p style='color: red;'>Error: " . mysqli_error($conn) . "</p>";
}

echo "<hr>";
echo "<p>Now unverified users will be stored in <strong>pending_registrations</strong> table.</p>";
echo "<p>After email verification, user will be moved to <strong>users</strong> table.</p>";

mysqli_close($conn);
?>
