<?php include_once __DIR__ . '/../partials/header.php'; ?>
<?php
if (!function_exists('docId')) {
  function docId(array $doc): string {
    $id = $doc['_id'] ?? ($doc['id'] ?? '');
    if (is_array($id) && isset($id['$oid'])) {
      return (string)$id['$oid'];
    }
    return (string)$id;
  }
}
?>
<section class="grid">
  <div class="card">
    <h2>Coop <?= htmlspecialchars(docId($coop)) ?></h2>
    <form method="post" action="/?r=coops.addChicken">
      <input type="hidden" name="coop_id" value="<?= htmlspecialchars(docId($coop)) ?>">
      <input name="name" placeholder="Chicken name" required>
      <input name="color" placeholder="Color" value="white">
      <input name="age" placeholder="Age" type="number" min="0" value="1">
      <button class="btn" type="submit">Add chicken</button>
    </form>
  </div>

  <div class="card">
    <h2>Chickens</h2>
    <?php if (empty($chickens)): ?>
      <p>No chickens yet.</p>
    <?php else: foreach ($chickens as $c): ?>
      <div class="row">
        <div>
          <strong><?= htmlspecialchars($c['name'] ?? 'Chicken') ?></strong>
          <div class="muted">ID: <?= htmlspecialchars(docId($c)) ?></div>
          <div>Color: <?= htmlspecialchars($c['color'] ?? '') ?> | Age: <?= (int)($c['age'] ?? 0) ?></div>
        </div>
        <div class="actions">
          <form class="inline" method="post" action="/?r=coops.removeChicken">
            <input type="hidden" name="coop_id" value="<?= htmlspecialchars(docId($coop)) ?>">
            <input type="hidden" name="chicken_id" value="<?= htmlspecialchars(docId($c)) ?>">
            <button class="btn danger" type="submit">Remove</button>
          </form>
          <button class="btn" onclick="postJSON('/?r=chickens.doStuff',{chicken_id:'<?= htmlspecialchars(docId($c)) ?>', minutes:5}).then(x=>alert('Actions: '+x.actions.join(', ')))">Simulate</button>
          <button class="btn" onclick="postJSON('/?r=chickens.lay',{chicken_id:'<?= htmlspecialchars(docId($c)) ?>'}).then(x=>alert('Egg ID: '+x.egg_id))">Lay egg</button>
        </div>
      </div>
      <hr>
    <?php endforeach; endif; ?>
  </div>
</section>
<?php include_once __DIR__ . '/../partials/footer.php'; ?>