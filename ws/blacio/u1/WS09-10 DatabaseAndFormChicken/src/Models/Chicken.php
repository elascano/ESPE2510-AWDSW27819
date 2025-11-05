<?php
namespace App\Models;

class Chicken {
    public string $id;
    public string $name;
    public string $color;
    public int $age;
    public bool $isMolting;

    public function __construct(array $data) {
        $this->id = (string)($data['_id'] ?? $data['id'] ?? uniqid('chk_'));
        $this->name = $data['name'] ?? 'Chicken';
        $this->color = $data['color'] ?? 'white';
        $this->age = (int)($data['age'] ?? 0);
        $this->isMolting = (bool)($data['isMolting'] ?? false);
    }

    public function doStuff(int $forTime) : array {
        $actions = ['cluck','wander','eat','drink','poop'];
        $log = [];
        for ($i=0; $i<$forTime; $i++) {
            $log[] = $actions[array_rand($actions)];
        }
        return $log;
    }

    public function layAnEgg(): array {
        return ['id' => uniqid('egg_'), 'laidAt' => date('c'), 'chickenId' => $this->id];
    }
}