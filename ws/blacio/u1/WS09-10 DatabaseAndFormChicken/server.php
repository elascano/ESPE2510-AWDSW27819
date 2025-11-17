<?php

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

if (strpos($uri, '..') !== false) {
    http_response_code(400);
    echo 'Bad request';
    return;
}

$projectRoot = __DIR__;
$publicRoot  = $projectRoot . '/public';

$requestedPublicPath = realpath($publicRoot . $uri);
if ($uri !== '/' && $requestedPublicPath !== false && str_starts_with($requestedPublicPath, realpath($publicRoot)) && is_file($requestedPublicPath)) {
    return false; 
}

require_once $publicRoot . '/index.php';
