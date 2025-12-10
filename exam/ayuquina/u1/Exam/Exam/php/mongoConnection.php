<?php
$MONGO_URI = getenv('MONGO_URI') ?: 'mongodb+srv://danny:danny@cluster0.oajqsmm.mongodb.net/?appName=Cluster0';

$MONGO_HOST = getenv('MONGO_HOST') ?: 'localhost';
$MONGO_PORT = getenv('MONGO_PORT') ?: '27017';
$MONGO_USER = getenv('MONGO_USER') ?: 'danny';
$MONGO_PASS = getenv('MONGO_PASS') ?: 'danny';
$MONGO_AUTH_DB = getenv('MONGO_AUTH_DB') ?: null;
$MONGO_REPLSET = getenv('MONGO_REPLSET') ?: null;
$MONGO_TLS = getenv('MONGO_TLS') ?: false;

$DB_NAME = 'TreesDB';
$COLLECTION_NAME = 'Trees';

if (isset($_GET['info']) && $_GET['info'] == '1') {
	$info = [
		'description' => 'Parámetros necesarios para la conexión a MongoDB',
		'recommended' => 'PROVIDE EITHER MONGO_URI OR THE INDIVIDUAL PARAMS',
		'MONGO_URI_example' => 'mongodb://USER:PASS@HOST:PORT/?authSource=AUTH_DB',
		'or_parameters' => [
			'MONGO_HOST' => 'host or IP (e.g. "localhost")',
			'MONGO_PORT' => 'port (default 27017)',
			'MONGO_USER' => 'username (if auth enabled)',
			'MONGO_PASS' => 'password (if auth enabled)',
			'MONGO_AUTH_DB' => 'authentication database (e.g. "admin")',
			'MONGO_REPLSET' => 'replica set name (optional)',
			'MONGO_TLS' => 'true/false if using TLS/SSL (optional)'
		],
		'example_env_windows' => 'setx MONGO_URI "mongodb://user:pass@host:27017/?authSource=admin"'
	];
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($info, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
	exit;
}

if ($MONGO_URI) {
	$uri = $MONGO_URI;
} else {
	$credentials = '';
	if ($MONGO_USER !== null && $MONGO_PASS !== null) {
		$credentials = rawurlencode($MONGO_USER) . ':' . rawurlencode($MONGO_PASS) . '@';
	}
	$hostPort = $MONGO_HOST . ':' . $MONGO_PORT;
	$options = [];
	if ($MONGO_AUTH_DB) {
		$options[] = 'authSource=' . rawurlencode($MONGO_AUTH_DB);
	}
	if ($MONGO_REPLSET) {
		$options[] = 'replicaSet=' . rawurlencode($MONGO_REPLSET);
	}
	if ($MONGO_TLS && ($MONGO_TLS === 'true' || $MONGO_TLS === true)) {
		$options[] = 'tls=true';
	}
	$optStr = count($options) ? ('?' . implode('&', $options)) : '';
	$uri = "mongodb://{$credentials}{$hostPort}/{$optStr}";
}

try {
	if (class_exists('MongoDB\Driver\Manager')) {
		$manager = new MongoDB\Driver\Manager($uri);

		$filter = [];
		$options = [
			'projection' => [
				'id' => 1,
				'treeName' => 1,
				'height' => 1,
				'treeTypes' => 1,
				'_id' => 0
			],
			'sort' => ['id' => 1]
		];

		$query = new MongoDB\Driver\Query($filter, $options);
		$namespace = $DB_NAME . '.' . $COLLECTION_NAME;
		$cursor = $manager->executeQuery($namespace, $query);

		$results = [];
		foreach ($cursor as $doc) {
			$arr = json_decode(json_encode($doc), true);
			$results[] = [
				'id' => isset($arr['id']) ? $arr['id'] : null,
				'treeName' => isset($arr['treeName']) ? $arr['treeName'] : null,
				'height' => isset($arr['height']) ? $arr['height'] : null,
				'treeTypes' => isset($arr['treeTypes']) ? $arr['treeTypes'] : null,
			];
		}

	} elseif (class_exists('MongoDB\Client')) {
		$client = new MongoDB\Client($uri);
		$collection = $client->{$DB_NAME}->{$COLLECTION_NAME};

		$options = [
			'projection' => [
				'id' => 1,
				'treeName' => 1,
				'height' => 1,
				'treeTypes' => 1,
				'_id' => 0
			],
			'sort' => ['id' => 1]
		];

		$cursor = $collection->find([], $options);

		$results = [];
		foreach ($cursor as $doc) {
			$arr = json_decode(json_encode($doc), true);
			$results[] = [
				'id' => isset($arr['id']) ? $arr['id'] : null,
				'treeName' => isset($arr['treeName']) ? $arr['treeName'] : null,
				'height' => isset($arr['height']) ? $arr['height'] : null,
				'treeTypes' => isset($arr['treeTypes']) ? $arr['treeTypes'] : null,
			];
		}

	} else {
		http_response_code(500);
		$hint = [
			'success' => false,
			'error' => 'MongoDB extension/library not found',
			'message' => 'Install the PHP mongodb extension (pecl install mongodb) and the mongodb/mongodb Composer package, or provide MONGO_URI and use a runtime that has the extension.',
			'instructions' => [
				'install_extension' => 'pecl install mongodb  (then enable extension in php.ini: extension=mongodb.so or extension=php_mongodb.dll)',
				'composer_package' => 'composer require mongodb/mongodb',
				'windows_notes' => 'On Windows, download php_mongodb.dll matching your PHP version and enable it in php.ini'
			]
		];
		header('Content-Type: application/json; charset=utf-8');
		echo json_encode($hint, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
		exit;
	}

	header('Content-Type: application/json; charset=utf-8');
	echo json_encode(['success' => true, 'count' => count($results), 'data' => $results], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
	exit;

} catch (Exception $e) {
	http_response_code(500);
	echo json_encode(['success' => false, 'error' => 'Unexpected error', 'message' => $e->getMessage()]);
	exit;
}

?>

