<?php
require_once __DIR__ . '/../vendor/autoload.php';

use App\Controllers\FarmersController;
use App\Controllers\CoopsController;
use App\Controllers\ChickensController;

$r = $_GET['r'] ?? '';

function view($file, $vars = []) {
    extract($vars);
    include_once __DIR__ . "/views/partials/header.php";
    include_once $file;
    include_once __DIR__ . "/views/partials/footer.php";
}

switch ($r) {
    case 'farmers':
        (new FarmersController())->index();
        break;
    case 'farmers.create':
        (new FarmersController())->create();
        break;
    case 'farmers.addCoop':
        (new FarmersController())->addCoop();
        break;
    case 'chickens.search':
        (new ChickensController())->search();
        break;
    case 'coops.show':
        (new CoopsController())->show();
        break;
    case 'coops.addChicken':
        (new CoopsController())->addChicken();
        break;
    case 'coops.removeChicken':
        (new CoopsController())->removeChicken();
        break;
    case 'chickens.doStuff':
        (new ChickensController())->doStuff();
        break;
    case 'chickens.lay':
        (new ChickensController())->lay();
        break;
    default:
        include_once __DIR__ . '/views/home.php';
}