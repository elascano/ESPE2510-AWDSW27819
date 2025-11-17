<?php
require __DIR__ . '/../src/db.php';

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$gallinero = isset($_POST['gallinero']) ? (int)$_POST['gallinero'] : 0;

if ($name === '' || !in_array($gallinero, [1,2,3], true)) {
    die('Datos inválidos. <a href="index.php">Volver</a>');
}

$stmt = $pdo->prepare("INSERT INTO chickens (name, gallinero) VALUES (:name, :gallinero)");
$stmt->execute([':name' => $name, ':gallinero' => $gallinero]);

header('Location: view.php');
exit;
