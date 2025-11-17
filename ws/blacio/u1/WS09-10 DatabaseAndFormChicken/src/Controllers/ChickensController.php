<?php
namespace App\Controllers;
use App\Repositories\ChickensRepo;
use App\Repositories\EggsRepo;
use App\Utils\Response;
use App\Models\Chicken as ChickenModel;

class ChickensController {
    private ChickensRepo $chickens;
    private EggsRepo $eggs;
    public function __construct() {
        $this->chickens = new ChickensRepo();
        $this->eggs = new EggsRepo();
    }

    public function search() {
        $q = $_GET['q'] ?? '';
        $results = $q !== '' ? $this->chickens->search($q) : [];
        include __DIR__ . '/../../public/views/chickens/search.php';
    }

    public function doStuff() {
        $id = $_POST['chicken_id'] ?? '';
        $for = (int)($_POST['minutes'] ?? 3);
        $data = $this->chickens->findById($id);
        if (!$data) Response::json(['error'=>'Chicken not found'], 404);
        $c = new ChickenModel($data);
        $log = $c->doStuff($for);
        Response::json(['chicken'=>$id, 'actions'=>$log]);
    }

    public function lay() {
        $id = $_POST['chicken_id'] ?? '';
        $data = $this->chickens->findById($id);
        if (!$data) Response::json(['error'=>'Chicken not found'], 404);
        $egg = ['chickenId'=>$id, 'laidAt'=>date('c')];
        $eggId = $this->eggs->insert($egg);
        Response::json(['egg_id'=>(string)$eggId] );
    }
}