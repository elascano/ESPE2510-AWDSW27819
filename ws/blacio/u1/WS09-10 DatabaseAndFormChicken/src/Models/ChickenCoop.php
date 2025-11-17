<?php
namespace App\Models;

class ChickenCoop {
    public string $id;
    /** @var string[] Chicken IDs */
    public array $chickens;

    public function __construct(array $data) {
        $this->id = (string)($data['_id'] ?? $data['id'] ?? uniqid('coop_'));
        $this->chickens = $data['chickens'] ?? [];
    }
}