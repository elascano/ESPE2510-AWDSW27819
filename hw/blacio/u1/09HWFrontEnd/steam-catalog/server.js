// Cargar variables del entorno (.env en desarrollo)
import 'dotenv/config';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// ──────────────────────────────────────────────────────────────────────────────
// Config básica
// ──────────────────────────────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 3000;
const STEAM_API_KEY = process.env.STEAM_API_KEY;

if (!STEAM_API_KEY) {
  console.error('Falta STEAM_API_KEY');
  process.exit(1);
}

// Node 18+ trae fetch global; si usas <18, instala node-fetch y haz globalThis.fetch = ...
// import fetch from 'node-fetch'; globalThis.fetch = fetch;

// ──────────────────────────────────────────────────────────────────────────────
// Catálogo en memoria (deduplicado por appid)
// ──────────────────────────────────────────────────────────────────────────────
const PAGE_SIZE = 50000;                 // Límite permitido por página
let lastAppId = 0;                       // Cursor de paginación
const appIndex = new Map();              // appid -> { appid, name }
let loadingCatalog = null;               // Promesa de carga para evitar solapamientos

function normalizeName(name) {
  return (name || '').replace(/\s+/g, ' ').trim();
}

// Llama a IStoreService/GetAppList v1 con filtros para “solo juegos”
async function fetchAppListPage(cursor = 0) {
  const params = new URLSearchParams({
    key:        STEAM_API_KEY,
    include_games:     'true',
    include_dlc:       'false',
    include_software:  'false',
    include_videos:    'false',
    include_hardware:  'false',
    max_results:       String(PAGE_SIZE),
    last_appid:        String(cursor),
  });
  const url = `https://api.steampowered.com/IStoreService/GetAppList/v1/?${params}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Error HTTP ${res.status} al cargar catálogo: ${text.slice(0,120)}`);
  }
  return res.json();
}

// Carga incremental del catálogo en memoria hasta alcanzar un mínimo
async function ensureCatalogLoaded(minItems = 100000) {
  if (appIndex.size >= minItems) return;

  if (loadingCatalog) {
    await loadingCatalog;
    return;
  }

  loadingCatalog = (async () => {
    try {
      while (appIndex.size < minItems) {
        const data = await fetchAppListPage(lastAppId);
        const apps = data?.response?.apps ?? [];

        for (const a of apps) {
          const name = normalizeName(a?.name);
          // DEDUPE por appid y descartar entradas vacías
          if (name && !appIndex.has(a.appid)) {
            appIndex.set(a.appid, { appid: a.appid, name });
          }
        }

        lastAppId = data?.response?.last_appid ?? 0;

        // Si la página vino “corta”, no hay más
        if (apps.length < PAGE_SIZE) break;
      }
    } catch (err) {
      console.error('[ensureCatalogLoaded] fallo:', err?.message || err);
      // En caso de error, no bloquear futuras cargas
    }
  })();

  try {
    await loadingCatalog;
  } finally {
    loadingCatalog = null;
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Rutas API
// ──────────────────────────────────────────────────────────────────────────────

// Búsqueda por nombre sobre la caché deduplicada
app.get('/api/search', async (req, res) => {
  try {
    const q = String(req.query.q || '').toLowerCase().trim();

    // Asegura una base razonable para que las búsquedas funcionen desde el inicio
    await ensureCatalogLoaded(100000);

    const all = Array.from(appIndex.values());

    // Filtrado por nombre (case-insensitive)
    const filtered = q
      ? all.filter(a => a.name.toLowerCase().includes(q))
      : all;

    // “Cinturón y tirantes”: volver a deduplicar por si en el futuro cambias la fuente
    const unique = Array.from(new Map(filtered.map(x => [x.appid, x])).values());

    // Limitar la respuesta para UI
    res.json({
      total: all.length,
      count: unique.length,
      results: unique.slice(0, 60),
    });
  } catch (e) {
    console.error('/api/search error:', e?.message || e);
    res.status(500).json({ error: 'Fallo al buscar' });
  }
});

// Detalles por appid (precio, descripción, imágenes, etc.)
app.get('/api/details/:appid', async (req, res) => {
  try {
    const appid = String(req.params.appid);
    const url = `https://store.steampowered.com/api/appdetails?appids=${appid}`;
    const r = await fetch(url);
    if (!r.ok) {
      const text = await r.text().catch(() => '');
      throw new Error(`Error HTTP ${r.status} en appdetails: ${text.slice(0,120)}`);
    }
    const j = await r.json();
    res.json(j);
  } catch (e) {
    console.error('/api/details error:', e?.message || e);
    res.status(500).json({ error: 'Fallo al obtener detalles' });
  }
});

app.get('/api/health', (_req, res) => {
  const target = 100000; // Objetivo de apps en caché
  const cached = appIndex.size;
  res.json({ ok: true, cached, lastAppId, target });
});


// ──────────────────────────────────────────────────────────────────────────────
// Estáticos (frontend)
// ──────────────────────────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

// ──────────────────────────────────────────────────────────────────────────────
// Arranque
// ──────────────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
