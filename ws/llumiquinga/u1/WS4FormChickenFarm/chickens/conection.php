<?php
$host = "localhost";
$user = "admin";
$password = "admin";
$database = "chicken_farm_simulator";

$conn = mysqli_connect($host, $user, $password, $database);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
else {
    echo "Connection successful";
}
?>