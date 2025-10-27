const q = document.getElementById('q');
const btn = document.getElementById('btn');
const total = document.getElementById('total');
const count = document.getElementById('count');
const grid = document.getElementById('grid');
const alertBox = document.getElementById('alert');

const modal = document.getElementById('modal');
const modalClose = document.getElementById('close');
const modalBody = document.getElementById('body');

const jsonPanel = document.getElementById('jsonPanel');
const jsonOutput = document.getElementById('jsonOutput');
const toggleJsonBtn = document.getElementById('toggleJsonBtn');
const copyJsonBtn = document.getElementById('copyJsonBtn');
const clearJsonBtn = document.getElementById('clearJsonBtn');
const closeJsonBtn = document.getElementById('closeJsonBtn');

const loading = document.getElementById('loading');

let lastPayload = null;   // guarda el último JSON mostrado

function setAlert(msg){ alertBox.textContent = msg; alertBox.hidden = !msg; }
function show(el){ el.hidden = false; }
function hide(el){ el.hidden = true; }

function showJSON(obj, title = 'Respuesta JSON'){
  lastPayload = obj;
  jsonOutput.textContent = JSON.stringify(obj, null, 2);
  show(jsonPanel);
}

toggleJsonBtn.addEventListener('click', () => {
  if (jsonPanel.hidden) {
    if (!lastPayload) {
      jsonOutput.textContent = '// Realizar una busqueda para ver el JSON ';
    }
    show(jsonPanel);
  } else {
    hide(jsonPanel);
  }
});

copyJsonBtn?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(jsonOutput.textContent || '');
    setAlert('JSON copiado al portapapeles');
    setTimeout(()=> setAlert(''), 1500);
  } catch {
    setAlert('No se pudo copiar');
  }
});

clearJsonBtn?.addEventListener('click', () => {
  jsonOutput.textContent = '';
  lastPayload = null;
});

closeJsonBtn?.addEventListener('click', () => hide(jsonPanel));

async function search(){
  setAlert('');
  grid.innerHTML='';
  count.textContent='0';
  show(loading);
  try{
    const params = new URLSearchParams({ q: q.value.trim() });
    const res = await fetch(`/api/search?${params}`);
    const data = await res.json();

    // Mostrar JSON de la respuesta de búsqueda
    showJSON(data, 'Búsqueda');

    total.textContent = data.total?.toLocaleString?.() ?? '-';
    count.textContent = data.count ?? 0;
    if (!data.results?.length){ setAlert('Sin resultados'); return; }
    renderCards(data.results);
  }catch{
    setAlert('Error al buscar');
  }finally{
    hide(loading);
  }
}

function renderCards(items){
  // Dedupe extra en el cliente por seguridad
  const seen = new Set();
  const unique = items.filter(it => !seen.has(it.appid) && seen.add(it.appid));

  for(const it of unique){
    const card = document.createElement('article'); card.className='card';
    const img = document.createElement('img'); img.className='thumb'; img.alt=it.name; img.loading='lazy';
    img.src = `https://cdn.cloudflare.steamstatic.com/steam/apps/${it.appid}/header.jpg`;
    img.onerror = () => { img.replaceWith(Object.assign(document.createElement('div'), { className:'thumb' })); };
    const body = document.createElement('div'); body.className='body';
    const name = document.createElement('div'); name.className='name'; name.textContent = it.name;
    const meta = document.createElement('div'); meta.className='meta'; meta.textContent = `ID: ${it.appid}`;
    const link = document.createElement('a'); link.href = `https://store.steampowered.com/app/${it.appid}`; link.target='_blank'; link.className='link'; link.textContent='Ver en Steam';
    body.append(name, meta, link); card.append(img, body);
    card.addEventListener('click', () => openDetails(it.appid));
    grid.append(card);
  }
}

async function openDetails(appid){
  try{
    show(loading);
    const r = await fetch(`/api/details/${appid}`);
    const j = await r.json();

    // Mostrar JSON de detalles
    showJSON(j, `Detalles ${appid}`);

    const ent = j[appid]; if (!ent?.success) return;
    const d = ent.data;
    modalBody.innerHTML = `
      <h2>${d.name}</h2>
      ${d.header_image ? `<img src="${d.header_image}" alt="${d.name}">` : ''}
      <p><strong>Precio:</strong> ${d.is_free ? 'Gratis' : (d.price_overview?.final_formatted || 'No disponible')}</p>
      <p><strong>Fecha:</strong> ${d.release_date?.date || 'No disponible'}</p>
      <p><strong>Desarrolladores:</strong> ${(d.developers || []).join(', ') || 'N/D'}</p>
      <p><strong>Publicadores:</strong> ${(d.publishers || []).join(', ') || 'N/D'}</p>
      ${d.short_description ? `<p>${d.short_description}</p>` : ''}
      <a class="link" href="https://store.steampowered.com/app/${appid}" target="_blank">Abrir en Steam</a>
    `;
    modal.hidden = false;
  }catch{
    setAlert('No se pudo cargar el detalle');
  }finally{
    hide(loading);
  }
}

const indexer = document.getElementById('indexer');
const indexerFill = document.getElementById('indexerFill');
const indexerValue = document.getElementById('indexerValue');
const indexerCount = document.getElementById('indexerCount');
const indexerTarget = document.getElementById('indexerTarget');

let progressTimer = null;

async function fetchProgress(){
  try{
    const r = await fetch('/api/health');
    const j = await r.json();
    const cached = Number(j.cached || 0);
    const target = Number(j.target || 100000);
    const pct = Math.max(0, Math.min(100, Math.round((cached/target)*100)));

    indexerFill.style.width = pct + '%';
    indexerValue.textContent = pct + '%';
    indexerCount.textContent = cached.toLocaleString();
    indexerTarget.textContent = target.toLocaleString();

    if (cached < target) {
      indexer.hidden = false;
    } else {
      indexer.hidden = true; 
      stopProgress();
    }
  } catch {
    // si falla, mantén el estado anterior
  }
}

function startProgress(){
  if (progressTimer) return;
  indexer.hidden = false;
  fetchProgress();
  progressTimer = setInterval(fetchProgress, 1200);
}
function stopProgress(){
  if (progressTimer){ clearInterval(progressTimer); progressTimer = null; }
}

startProgress();

btn.addEventListener('click', () => { fetchProgress(); });
q.addEventListener('keydown', (e)=>{ if(e.key==='Enter') fetchProgress(); });


btn.addEventListener('click', search);
q.addEventListener('keydown', (e)=>{ if(e.key==='Enter') search(); });

modalClose.addEventListener('click', ()=>{ modal.hidden = true; });
modal.addEventListener('click', (e)=>{ if(e.target===modal) modal.hidden = true; });

search();
