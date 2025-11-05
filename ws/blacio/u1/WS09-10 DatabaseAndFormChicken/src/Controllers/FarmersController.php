<?php
namespace App\Controllers;
use App\Repositories\FarmersRepo;
use App\Repositories\CoopsRepo;
use App\Utils\Response;

class FarmersController {
    private FarmersRepo $farmers;
    private CoopsRepo $coops;
    public function __construct() {
        $this->farmers = new FarmersRepo();
        $this->coops = new CoopsRepo();
    }

    public function index() {
        $farmers = $this->farmers->findAll();
        include __DIR__ . '/../../public/views/farmers/index.php';
    }

    public function create() {
        $name = $_POST['name'] ?? 'Farmer';
        $this->farmers->insert(['name'=>$name, 'coops'=>[]]);
        Response::redirect('/?r=farmers');
    }

    public function addCoop() {
        $farmerId = $_POST['farmer_id'] ?? '';
        $coopId = $this->coops->insert(['chickens'=>[]]);
        $farmer = $this->farmers->findById($farmerId);
        $coops = $farmer['coops'] ?? [];
        $coops[] = (string)$coopId;
        $this->farmers->update($farmerId, ['coops'=>$coops]);
        Response::redirect('/?r=farmers');
    }
}