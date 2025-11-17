<?php
require __DIR__ . '/../src/db.php';

$stmt = $pdo->query("SELECT id, name, gallinero, created_at FROM chickens ORDER BY created_at DESC");
$rows = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Agregar Pollo</title>
  <link rel="stylesheet" href="style/style.css">
</head>
<body>
  <div class="container">
    <h1 class="title">Agregar Pollo</h1>
    <form class="form" action="add.php" method="post">
      <label class="label">Nombre:<br>
        <input class="input" type="text" name="name" required maxlength="100">
      </label>
      <br>
      <label class="label">Gallinero:<br>
        <select class="select" name="gallinero" required>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </label>
      <br>
      <button class="btn" type="submit">Agregar</button>
    </form>

    <p><a class="link" href="view.php">Ver pollos (lista / borrar)</a></p>
  </div>
</body>
</html>