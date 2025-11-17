<?php
namespace App\Repositories;

use App\Database;
use MongoDB\BSON\ObjectId;

abstract class BaseRepo {
    protected string $collection;
    protected function col() { return Database::db()->selectCollection($this->collection); }

    public function findAll(): array {
        return $this->col()->find([], ['sort' => ['_id' => -1]])->toArray();
    }
    /**
     * Generic find with filter and options (limit, sort, projection, etc.).
     */
    public function find(array $filter = [], array $options = []): array {
        return $this->col()->find($filter, $options)->toArray();
    }
    public function findById(string $id): ?array {
        $doc = $this->col()->findOne(['_id' => $this->oid($id)]);
        return $doc ? json_decode(json_encode($doc), true) : null;
    }
    public function insert(array $data): string {
        $res = $this->col()->insertOne($data);
        return (string)$res->getInsertedId();
    }
    public function update(string $id, array $data): bool {
        $res = $this->col()->updateOne(['_id' => $this->oid($id)], ['$set' => $data]);
        return $res->isAcknowledged();
    }
    public function delete(string $id): bool {
        $res = $this->col()->deleteOne(['_id' => $this->oid($id)]);
        return $res->isAcknowledged();
    }
    protected function oid(string $id) {
        try { return new ObjectId($id); } catch (\Exception $e) { return $id; }
    }
}