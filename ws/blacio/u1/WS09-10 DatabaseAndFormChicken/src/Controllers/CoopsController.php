<?php
namespace App\Controllers;
use App\Repositories\CoopsRepo;
use App\Repositories\ChickensRepo;
use App\Utils\Response;

class CoopsController {
    private CoopsRepo $coops;
    private ChickensRepo $chickens;
    public function __construct() {
        $this->coops = new CoopsRepo();
        $this->chickens = new ChickensRepo();
    }

    public function show() {
        $id = $_GET['id'] ?? '';
        $coop = $this->coops->findById($id);
        $chickens = [];
        if ($coop) {
            foreach (($coop['chickens'] ?? []) as $cid) {
                $c = $this->chickens->findById($cid);
                if ($c) $chickens[] = $c;
            }
        }
        include __DIR__ . '/../../public/views/coops/show.php';
    }

    public function addChicken() {
        $id = $_POST['coop_id'] ?? '';
        $name = $_POST['name'] ?? 'Lola';
        $color = $_POST['color'] ?? 'white';
        $age = (int)($_POST['age'] ?? 1);
        $chId = $this->chickens->insert(['name'=>$name,'color'=>$color,'age'=>$age,'isMolting'=>false]);
        $coop = $this->coops->findById($id);
        $arr = $coop['chickens'] ?? [];
        $arr[] = (string)$chId;
        $this->coops->update($id, ['chickens'=>$arr]);
        Response::redirect('/?r=coops.show&id=' . $id);
    }

    public function removeChicken() {
        $id = $_POST['coop_id'] ?? '';
        $chickenId = $_POST['chicken_id'] ?? '';
        $coop = $this->coops->findById($id);
        $arr = array_values(array_filter($coop['chickens'] ?? [], fn($x)=>$x !== $chickenId));
        $this->coops->update($id, ['chickens'=>$arr]);
        $this->chickens->delete($chickenId);
        Response::redirect('/?r=coops.show&id=' . $id);
    }
}