</main>
<footer>
  <small>PHP + MongoDB demo project</small>
</footer>
<script>
// Very simple helpers
async function postJSON(url, data){
  const r = await fetch(url, {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:new URLSearchParams(data)});
  return r.json();
}
</script>
</body>
</html>