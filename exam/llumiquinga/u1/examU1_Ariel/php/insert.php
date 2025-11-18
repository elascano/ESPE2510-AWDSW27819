<?php
include 'db_connection.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $username = $_POST['username'];
    $age = $_POST['age'];
    $career = $_POST['career'];

    $sql = "INSERT INTO estudiantes (name, username, age, career) VALUES (?, ?, ?, ?)";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("ssis", $name, $username, $age, $career);

    if ($stmt->execute()) {
        echo "¡Estudiante insertado correctamente!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conexion->close();
}
?>
