<?php include __DIR__ . '/../partials/header.php'; ?>
<section class="grid">
  <div class="card">
    <h2>Create farmer</h2>
    <form method="post" action="/?r=farmers.create">
      <input name="name" placeholder="Name" required>
      <button class="btn" type="submit">Create</button>
    </form>
  </div>

  <div class="card">
    <h2>Farmers</h2>
    <?php if (!$farmers): ?>
      <p>No farmers.</p>
    <?php else: ?>
      <?php foreach ($farmers as $f): ?>
        <div class="row">
          <div>
            <strong><?= htmlspecialchars($f['name'] ?? 'No name') ?></strong>
            <div class="muted">ID: <?= (string)$f['_id'] ?></div>
            <div>Coops: <?= count($f['coops'] ?? []) ?></div>
          </div>
          <div class="actions">
            <form method="post" action="/?r=farmers.addCoop">
              <input type="hidden" name="farmer_id" value="<?= (string)$f['_id'] ?>">
              <button class="btn" type="submit">➕ Coop</button>
            </form>
            <?php foreach (($f['coops'] ?? []) as $cid): ?>
              <a class="btn secondary" href="/?r=coops.show&id=<?= $cid ?>">View Coop</a>
            <?php endforeach; ?>
          </div>
        </div>
        <hr>
      <?php endforeach; ?>
    <?php endif; ?>
  </div>
</section>
<?php include __DIR__ . '/../partials/footer.php'; ?>