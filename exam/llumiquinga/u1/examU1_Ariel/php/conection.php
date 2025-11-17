<?php
$servidor = "localhost";
$usuario = "root";
$contraseña = "rootroot";
$base_de_datos = "studentsdb";


$conexion = new mysqli($servidor, $usuario, $contraseña, $base_de_datos);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
?>