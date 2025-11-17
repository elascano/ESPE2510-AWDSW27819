<?php
require_once '../public/db.php';
    $nombre = $_POST['name'];
    $email = $_POST['color'];
    $edad = $_POST['age'];
    $isMolting = $_POST['isMolting'];

    $sql = "INSERT INTO chicken (name, email, age, isMolting) VALUES (:name, :color, :age, :isMolting)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':color', $color);
    $stmt->bindParam(':edad', $age);
    $stmt->bindParam(':isMolting', $isMolting);

    if ($stmt->execute()) {
    echo "El usuario $name ha sido creado";
} else {
    echo "Error al crear el usuarso";
}
?>