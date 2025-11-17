<?php
namespace App\Models;

class Egg {
    public string $id;
    public string $chickenId;
    public string $laidAt;

    public function __construct(array $data) {
        $this->id = (string)($data['_id'] ?? $data['id'] ?? uniqid('egg_'));
        $this->chickenId = $data['chickenId'] ?? '';
        $this->laidAt = $data['laidAt'] ?? date('c');
    }
}