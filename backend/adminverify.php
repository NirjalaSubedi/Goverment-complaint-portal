<?php
include '../includes/databaseConnection.php';

header('Content-Type: application/json');

$action = $_POST['action'] ?? $_GET['action'] ?? '';


?>
