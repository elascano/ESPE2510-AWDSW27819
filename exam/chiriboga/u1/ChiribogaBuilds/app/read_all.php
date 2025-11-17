<?php
require_once '../conexion/db.php';
$sql = "SELECT * FROM builds";
$builds = []; 

$stmt = $pdo->query($sql);
$builds = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Read</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</head>
<body>

<div class="container table-container">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="mb-0">READ</h2>
    </div>

    <table class="table table-hover">
        <thead class="table-primary">
            <tr>
                <th>ID</th>
                <th>BUILD ID</th>
                <th>COLOR</th>
                <th>PRICE</th>
            </tr>
        </thead>
        <tbody>
            <?php if (count($builds) > 0): ?>
                <?php foreach ($builds as $b): ?>
                    <tr>
                        <td><?= htmlspecialchars($b['id']) ?></td>
                        <td><?= htmlspecialchars($b['build_id']) ?></td>
                        <td><?= htmlspecialchars($b['color']) ?></td>
                        <td><?= htmlspecialchars($b['price']) ?></td>                    
                    </tr>
                <?php endforeach; ?>
            <?php else: ?>
                <tr>
                    <td colspan="4" class="text-center text-muted">Not found builds</td>
                </tr>
            <?php endif; ?>
        </tbody>
    </table>
</div>

<script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

</body>
</html>
