<?php
require_once __DIR__ . '/../vendor/autoload.php';

use App\Repositories\{FarmersRepo, CoopsRepo, ChickensRepo};

$farmers = new FarmersRepo();
$coops = new CoopsRepo();
$chickens = new ChickensRepo();

$fid = $farmers->insert(['name' => 'Germán', 'coops' => []]);
$c1 = $coops->insert(['chickens' => []]);
$c2 = $coops->insert(['chickens' => []]);

$ch1 = $chickens->insert(['name' => 'Lola',   'color' => 'white', 'age' => 1, 'isMolting' => false]);
$ch2 = $chickens->insert(['name' => 'Pepita', 'color' => 'brown', 'age' => 2, 'isMolting' => false]);
$ch3 = $chickens->insert(['name' => 'Rosita', 'color' => 'black', 'age' => 1, 'isMolting' => false]);

$coops->update((string)$c1, ['chickens' => [(string)$ch1, (string)$ch2]]);
$coops->update((string)$c2, ['chickens' => [(string)$ch3]]);

$farm = $farmers->findById((string)$fid);
$coopsArr = $farm['coops'] ?? [];
$coopsArr[] = (string)$c1;
$coopsArr[] = (string)$c2;
$farmers->update((string)$fid, ['coops' => $coopsArr]);

echo "Seeding completed. Farmer ID: $fid\n";