<?php
namespace App\Utils;

final class Response {
public static function json($data, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}
public static function error(string $message, int $status = 400): void {
    self::json(['error'=>$message], $status);
}

public static function redirect(string $to, int $status = 302): void {
    // Basic redirect helper used by controllers
    header('Location: ' . $to, true, $status);
    exit;
}
}