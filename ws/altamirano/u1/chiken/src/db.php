<?php
$host = '127.0.0.1';
$db   = 'chicken';
$user = 'admin';    // usuario de MySQL
$pass = 'admin';     // contraseña de MySQL
$dsn  = "mysql:host=$host;dbname=$db;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];
try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    die('Error de DB: ' . $e->getMessage());
}
