<?php
$searchTerm = trim($_GET['term'] ?? '');

$sampleProducts = [
    ['name' => 'Red Mug', 'sku' => 'MUG-001'],
    ['name' => 'Blue Mug', 'sku' => 'MUG-002'],
    ['name' => 'Green Bottle', 'sku' => 'BOT-010'],
    ['name' => 'Black Notebook', 'sku' => 'NOTE-101'],
    ['name' => 'Graphite Pencil', 'sku' => 'PEN-007'],
    ['name' => 'Orange Backpack', 'sku' => 'BAG-009'],
];

function fetchProducts(string $term, array $fallbackProducts): array
{
    $results = [];

    if (class_exists('MongoDB\\Client')) {
        try {
            $client = new MongoDB\Client($_ENV['MONGODB_URI'] ?? 'mongodb://localhost:27017');
            $collection = $client->selectCollection($_ENV['MONGODB_DB'] ?? 'catalog', $_ENV['MONGODB_COLLECTION'] ?? 'products');
            $filter = [];
            if ($term !== '') {
                $filter = ['name' => ['$regex' => $term, '$options' => 'i']];
            }
            $cursor = $collection->find($filter, ['limit' => 20]);
            foreach ($cursor as $item) {
                $results[] = [
                    'name' => $item['name'] ?? 'Unnamed item',
                    'sku' => $item['sku'] ?? 'N/A',
                ];
            }
        } catch (Throwable $e) {
            $results = [];
        }
    }

    if (empty($results)) {
        if ($term === '') {
            $results = $fallbackProducts;
        } else {
            $termLower = mb_strtolower($term);
            $results = array_values(array_filter($fallbackProducts, static function ($product) use ($termLower) {
                return str_contains(mb_strtolower($product['name']), $termLower) ||
                    str_contains(mb_strtolower($product['sku']), $termLower);
            }));
        }
    }

    return $results;
}

$products = fetchProducts($searchTerm, $sampleProducts);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Listado de productos</title>
    <link rel="stylesheet" href="assets/styles.css" />
</head>
<body>
<header class="app-header"></header>
<main class="app-shell">
    <section class="search-panel">
        <form class="search-form" method="get" autocomplete="off">
            <label class="search-label" for="search">Find</label>
            <div class="search-controls">
                <input
                    id="search"
                    name="term"
                    class="search-input"
                    type="text"
                    placeholder="Buscar productos"
                    value="<?= htmlspecialchars($searchTerm, ENT_QUOTES, 'UTF-8'); ?>"
                />
                <button type="submit" class="search-button" id="findBtn">Find</button>
            </div>
        </form>
    </section>

    <section class="list-panel" aria-live="polite">
        <h2 class="list-title">List of products</h2>
        <div class="list-area" id="results">
            <?php if (empty($products)): ?>
                <p class="empty-state">No se encontraron productos.</p>
            <?php else: ?>
                <ul class="product-list">
                    <?php foreach ($products as $product): ?>
                        <li class="product-item">
                            <span class="product-name"><?= htmlspecialchars($product['name'], ENT_QUOTES, 'UTF-8'); ?></span>
                            <span class="product-sku">SKU: <?= htmlspecialchars($product['sku'], ENT_QUOTES, 'UTF-8'); ?></span>
                        </li>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>
        </div>
    </section>
</main>
<script src="assets/app.js" defer></script>
</body>
</html>
