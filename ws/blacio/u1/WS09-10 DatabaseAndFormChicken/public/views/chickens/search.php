<?php include_once __DIR__ . '/../partials/header.php'; ?>
<section class="card">
  <h2>Search chickens</h2>
  <form method="get" action="/">
    <input type="hidden" name="r" value="chickens.search">
    <input type="text" name="q" value="<?= htmlspecialchars($_GET['q'] ?? '') ?>" placeholder="Name" style="min-width:260px">
    <button class="btn" type="submit">Search</button>
  </form>
  <hr>
  <?php
  $results = $results ?? [];
  if (empty($results)) {
    echo '<p class="muted">No results.</p>';
  } else {
    foreach ($results as $c) {
      $id = $c['_id'] ?? ($c['id'] ?? '');
      if (is_array($id) && isset($id['$oid'])) { $id = $id['$oid']; }
      echo '<div class="row">';
      echo '<div><strong>' . htmlspecialchars($c['name'] ?? 'Chicken') . '</strong>';
      echo '<div class="muted">ID: ' . htmlspecialchars((string)$id) . '</div>';
      echo '<div>Color: ' . htmlspecialchars($c['color'] ?? '') . ' | Age: ' . (int)($c['age'] ?? 0) . '</div></div>';
      echo '<div class="actions">';
  echo '<button class="btn" onclick="postJSON(\'/?r=chickens.doStuff\',{chicken_id:\'' . htmlspecialchars((string)$id) . '\', minutes:5}).then(x=>alert(`Actions: ${x.actions.join(", ")}`))">Simulate</button>';
      echo '<button class="btn" onclick="postJSON(\'/?r=chickens.lay\',{chicken_id:\'' . htmlspecialchars((string)$id) . '\'}).then(x=>alert(\'Egg ID: \' +x.egg_id))">Lay egg</button>';
      echo '</div></div><hr>';
    }
  }
  ?>
</section>
<?php include_once __DIR__ . '/../partials/footer.php'; ?>
