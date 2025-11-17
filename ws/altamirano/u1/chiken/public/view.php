<?php
require __DIR__ . '/../src/db.php';

$stmt = $pdo->query("SELECT id, name, gallinero, created_at FROM chickens ORDER BY created_at DESC");
$rows = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Lista de Pollos</title>
  <link rel="stylesheet" href="style/style.css">
</head>
<body>
  <div class="container">
    <h1 class="title">Pollos</h1>
    <p><a class="link" href="index.php">Agregar nuevo</a></p>
    <?php if (count($rows) === 0): ?>
      <p class="muted">No hay pollos registrados.</p>
    <?php else: ?>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>Gallinero</th><th>Creado</th><th>Acción</th>
          </tr>
        </thead>
        <tbody>
        <?php foreach ($rows as $r): ?>
          <tr>
            <td><?php echo htmlspecialchars($r['id']); ?></td>
            <td><?php echo htmlspecialchars($r['name']); ?></td>
            <td><?php echo htmlspecialchars($r['gallinero']); ?></td>
            <td><?php echo htmlspecialchars($r['created_at']); ?></td>
            <td>
              <a class="btn-delete" href="delete.php?id=<?php echo urlencode($r['id']); ?>" onclick="return confirm('Eliminar este pollo?');">Borrar</a>
            </td>
          </tr>
        <?php endforeach; ?>
        </tbody>
      </table>
    <?php endif; ?>
  </div>
</body>
</html>
