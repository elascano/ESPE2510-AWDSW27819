<?php
require __DIR__ . '/../src/db.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
if ($id <= 0) {
    header('Location: view.php');
    exit;
}

try {
    $pdo->beginTransaction();

    // Verificar existencia
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM chickens WHERE id = :id');
    $stmt->execute([':id' => $id]);
    if ((int)$stmt->fetchColumn() === 0) {
        $pdo->rollBack();
        header('Location: view.php');
        exit;
    }

    // Borrar el registro
    $stmt = $pdo->prepare('DELETE FROM chickens WHERE id = :id');
    $stmt->execute([':id' => $id]);

    // Renumerar ids: decrementar en 1 todos los ids mayores al eliminado
    $stmt = $pdo->prepare('UPDATE chickens SET id = id - 1 WHERE id > :id');
    $stmt->execute([':id' => $id]);

    // Confirmar cambios principales
    $pdo->commit();

    // Intentar ajustar AUTO_INCREMENT, pero no fallar la petición si esto da error
    try {
        $row = $pdo->query('SELECT COALESCE(MAX(id), 0) AS mx FROM chickens')->fetch(PDO::FETCH_ASSOC);
        $next = ((int)$row['mx']) + 1;
        $pdo->exec("ALTER TABLE chickens AUTO_INCREMENT = $next");
    } catch (Throwable $e) {
        error_log('delete.php AUTO_INCREMENT error: ' . $e->getMessage());
        // No interrumpir: la eliminación ya fue confirmada
    }

} catch (Throwable $e) {
    // Solo hacer rollBack si hay una transacción activa
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    error_log('delete.php error: ' . $e->getMessage());
    die('Error al borrar el pollo. Intenta de nuevo.');
}

header('Location: view.php');
exit;
