<?php

require_once '../conection/databaseconection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $lastname = $_POST['lastname'] ?? '';
    $age = $_POST['age'] ?? '';
    $ocupation = $_POST['ocupation'] ?? '';
    $boss = $_POST['boss'] ?? '';

    try {
        $sql = "INSERT INTO employes (name, lastname, age, ocupation, boss) VALUES (:name, :lastname, :age, :ocupation, :boss)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':lastname', $lastname);
        $stmt->bindParam(':age', $age);
        $stmt->bindParam(':ocupation', $ocupation);
        $stmt->bindParam(':boss', $boss);
        $stmt->execute();

        $response = [
            'success' => true,
            'message' => 'Employee Data Insert Succesfully'
        ];
    } catch (PDOException $e) {
        $response = [
            'success' => false,
            'error' => 'Error to keep employee data: ' . $e->getMessage()
        ];
    }
} else {
    $response = [
        'success' => false,
        'error' => 'Method does not allowed'
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
exit;
?>