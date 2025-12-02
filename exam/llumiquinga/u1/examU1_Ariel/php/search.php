<?php
include 'conection.php';

if (isset($_GET['query'])) {
    $query = $_GET['query'];
    
    $sql = "SELECT * FROM estudiantes WHERE name LIKE ? OR username LIKE ?";
    $stmt = $conexion->prepare($sql);
    $search = "%$query%";
    $stmt->bind_param("ss", $search, $search);
    $stmt->execute();
    
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        echo "<h2>Search Results:</h2>";
        echo "<table border='1'>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Age</th>
                    <th>Career</th>
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
        echo "No students found.";
    }

    $stmt->close();
    $conexion->close();
}
?>
