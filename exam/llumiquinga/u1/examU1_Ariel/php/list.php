<?php
include 'conection.php';

$sql = "SELECT * FROM estudiantes";
$result = $conexion->query($sql);

if ($result->num_rows > 0) {
    echo "<h2>Todos los estudiantes:</h2>";
    echo "<table border='1'>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Edad</th>
                <th>Carrera</th>
            </tr>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>{$row['id']}</td>
                <td>{$row['name']}</td>
                <td>{$row['username']}</td>
                <td>{$row['age']}</td>
                <td>{$row['career']}</td>
              </tr>";
    }
    echo "</table>";
} else {
    echo "No hay estudiantes registrados.";
}

$conexion->close();
?>
