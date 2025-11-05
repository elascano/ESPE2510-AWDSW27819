<?php
namespace App;

class Config {
    public static function env(string $key, $default = null) {
        static $loaded = false;
        static $data = [];
        if (!$loaded) {
            $file = __DIR__ . '/../.env';
            if (is_file($file)) {
                foreach (file($file) as $line) {
                    $line = trim($line);
                    if ($line === '' || str_starts_with($line, '#')) continue;
                    [$k, $v] = array_map('trim', explode('=', $line, 2));
                    $data[$k] = $v;
                }
            }
            $loaded = true;
        }
        return $data[$key] ?? $default;
    }
}