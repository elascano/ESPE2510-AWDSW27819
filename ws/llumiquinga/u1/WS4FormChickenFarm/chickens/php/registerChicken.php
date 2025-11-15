<?php
// --- data base config ---
$host = "localhost";
$user = "admin";
$password = "admin";
$database = "chicken_farm_simulator";

$conn = mysqli_connect($host, $user, $password, $database);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
else {
    echo "Connection successful<br>";
}
// --- obtain the form data ---
$name  = $_POST['nombre'] ?? '';
$color = $_POST['color'] ?? '';
$age   = $_POST['edad'] ?? 0;
$is_molting = isset($_POST['muda']) ? 1 : 0;
$coop_id = $_POST['coop_id'] ?? '';

// --- Validate required fields ---
if (empty($name) || empty($color) || empty($age) || empty($coop_id)) {
    die("All fields are required.");
}

// --- Prepare the SQL query ---
$sql = "INSERT INTO chicken (coop_id, name, color, age, is_molting)
        VALUES (?, ?, ?, ?, ?)";

// prepare the sentence
$stmt = $conn->prepare($sql);
$stmt->bind_param("issii", $coop_id, $name, $color, $age, $is_molting);

// execute the sentence
if ($stmt->execute()) {
    echo "<h3>Chicken registered successfully!</h3>";
    echo "<a href='chicken_form.html'>Register another chicken</a>";
} else {
    echo "error the registration: " . $stmt->error;
}

// Close connections
$stmt->close();
$conn->close();
?>
