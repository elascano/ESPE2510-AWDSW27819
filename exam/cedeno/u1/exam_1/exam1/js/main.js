// Client-side code to search a chicken by id and display its attributes

const btn = document.getElementById('btnFind');
const input = document.getElementById('searchId');
const result = document.getElementById('result');

// If the page is opened via file:// use the local server base URL
const baseOrigin = (window.location.protocol === 'file:') ? 'http://localhost:3000' : window.location.origin;

function renderDoc(doc) {
  if (!doc) return '<div>No encontrado</div>';

  const rows = Object.keys(doc).map(key => {
    let val = doc[key];
    if (typeof val === 'object' && val !== null) {
      try { val = JSON.stringify(val); } catch (e) {}
    }
    return `<tr><td style="font-weight:600;padding:6px;border:1px solid #ddd">${key}</td><td style="padding:6px;border:1px solid #ddd">${val}</td></tr>`;
  }).join('');

  return `
    <table style="border-collapse:collapse;width:100%;max-width:700px">${rows}</table>
  `;
}

async function findChicken() {
  const id = input.value && input.value.trim();
  if (!id) return alert('Ingresa un id o chickenId');

  result.innerHTML = 'Buscando...';

  const url = `${baseOrigin}/api/chickens/${encodeURIComponent(id)}`;

  try {
    const res = await fetch(url);
    if (res.status === 404) {
      result.innerHTML = '<div>No encontrado</div>';
      return;
    }
    if (!res.ok) {
      // If server returned an error status
      const text = await res.text().catch(()=>null);
      result.innerHTML = `<div>Error del servidor: ${res.status}</div>`;
      console.error('Server error response:', res.status, text);
      return;
    }

    const doc = await res.json();
    result.innerHTML = renderDoc(doc);
  } catch (err) {
    console.error(err);
    result.innerHTML = '<div>Error buscando — no se pudo conectar al servidor. Asegúrate de ejecutar: <code>node server.js</code> en c:\\Users\\H\\Desktop\\exam1</div>';
  }
}

btn.addEventListener('click', findChicken);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') findChicken();
});
