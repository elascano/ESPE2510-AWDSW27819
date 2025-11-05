<?php
namespace App;

use MongoDB\Client;
use MongoDB\Collection;

class Database {
    private static ?Client $client = null;

    public static function client(): Client {
        if (!self::$client) {
            $uri = Config::env('MONGO_URI', 'mongodb://localhost:27017');
            self::$client = new Client($uri);
        }
        return self::$client;
    }

    public static function db() {
        $dbName = Config::env('MONGO_DB', 'chicken_farm');
        return self::client()->selectDatabase($dbName);
    }
    /**
     * Helper to select a collection from the configured database.
     * Usage: Database::collection('coops')->findOne(...)
     *
     * @param string $name
     * @return \MongoDB\Collection
     */
    public static function collection(string $name): \MongoDB\Collection {
        return self::db()->selectCollection($name);
    }
}