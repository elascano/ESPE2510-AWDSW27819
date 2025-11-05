<?php
namespace App\Models;

class ChickenFarmer {
    public string $id;
    public string $name;
    /** @var string[] Coop IDs */
    public array $coops;

    public function __construct(array $data) {
        $this->id = (string)($data['_id'] ?? $data['id'] ?? uniqid('farmer_'));
        $this->name = $data['name'] ?? 'Farmer';
        $this->coops = $data['coops'] ?? [];
    }
}