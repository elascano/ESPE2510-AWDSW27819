// Simple Node HTTP server for days-to-expire API (no external deps)
import http from 'http';

const PORT = process.env.PORT || 3000;

// Helper: enable basic CORS
function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Helper: parse JSON body
function parseJson(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => (data += chunk));
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

// Core logic: compute days to expire from [day, month, year]
function daysToExpire(expirationArray) {
  if (!Array.isArray(expirationArray) || expirationArray.length !== 3) {
    return { error: 'expiration must be an array [day, month, year]' };
  }
  const [day, month, year] = expirationArray.map(Number);
  if (
    !Number.isInteger(day) ||
    !Number.isInteger(month) ||
    !Number.isInteger(year) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31 ||
    year < 1900 ||
    year > 9999
  ) {
    return { error: 'Invalid day/month/year values' };
  }

  // Construct date in local timezone
  const expDate = new Date(year, month - 1, day);
  if (Number.isNaN(expDate.getTime())) {
    return { error: 'Invalid calendar date' };
  }

  // Normalize to midnight for reliable difference in days
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const end = new Date(expDate.getFullYear(), expDate.getMonth(), expDate.getDate());

  const msPerDay = 24 * 60 * 60 * 1000;
  const diff = Math.round((end - start) / msPerDay);

  return {
    expired: diff < 0,
    daysLeft: Math.max(0, diff),
    expirationISO: expDate.toISOString(),
  };
}

// Lazy Mongo connection
let _db = null;
async function getDb() {
  if (_db) return _db;
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'ExamP3';
  if (!uri) throw new Error('MONGODB_URI not configured');
  const { MongoClient } = await import('mongodb');
  const client = new MongoClient(uri);
  await client.connect();
  _db = client.db(dbName);
  return _db;
}

const server = http.createServer(async (req, res) => {
  setCors(res);
  const fullUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = fullUrl.pathname;

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  if (req.method === 'GET' && pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ ok: true }));
  }

  // GET products routes
  if (req.method === 'GET') {
    const segments = pathname.split('/').filter(Boolean); // ['api','products',':id', 'days-to-expire'?]
    if (!(segments[0] === 'api' && segments[1] === 'products')) {
      // Not a products route, skip
    } else {
    const idMatch = pathname.match(/\/products\/(\d+)/);
    const id = idMatch ? Number(idMatch[1]) : NaN;
    if (!Number.isInteger(id) || id < 1) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Invalid product id', receivedPath: pathname, segments }));
    }
    const isDays = segments.length >= 4 && segments[3] === 'days-to-expire';
    try {
      const db = await getDb();
      const product = await db.collection('Product').findOne({ id });
      if (!product) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Product not found' }));
      }
      if (isDays) {
        const result = daysToExpire(product.expiration);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ ...result, id: product.id, name: product.name }));
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(product));
    } catch (err) {
      const status = /MONGODB_URI/.test(err.message) ? 503 : 500;
      res.writeHead(status, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: err.message }));
    }
  }
  }

  // POST /api/products -> insert product document { id, name, expiration:[d,m,y], price? }
  if (req.method === 'POST' && pathname === '/api/products') {
    try {
      const body = await parseJson(req);
      const product = body?.product || body;
      if (!product || typeof product !== 'object') {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Missing product object' }));
      }
      const id = Number(product.id);
      if (!Number.isInteger(id) || id < 1) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Product id must be a positive integer' }));
      }
      const exp = Array.isArray(product.expiration) ? product.expiration.map(Number) : [];
      const validation = daysToExpire(exp);
      if (validation.error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid expiration date' }));
      }
      const doc = {
        id,
        name: product.name || '',
        expiration: exp,
        price: Number(product.price) || undefined,
        createdAt: new Date()
      };
      const db = await getDb();
      await db.collection('Product').createIndex({ id: 1 }, { unique: true });
      const result = await db.collection('Product').insertOne(doc);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ insertedId: result.insertedId, product: doc }));
    } catch (err) {
      const status = /MONGODB_URI/.test(err.message) ? 503 : 500;
      res.writeHead(status, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: err.message }));
    }
  }

  // Note: days-to-expire path handled in block above

  if (req.method === 'POST' && pathname === '/api/days-to-expire') {
    try {
      const body = await parseJson(req);
      // Accept either { day, month, year } or { expiration: [d,m,y] } or a product object
      // Or { id: n } to compute from stored product
      let expiration = null;
      let idFromDb = null;

      if (Array.isArray(body?.expiration)) {
        expiration = body.expiration;
      } else if (
        body &&
        typeof body === 'object' &&
        body.product &&
        Array.isArray(body.product.expiration)
      ) {
        expiration = body.product.expiration;
      } else if (
        Number.isFinite(Number(body?.day)) &&
        Number.isFinite(Number(body?.month)) &&
        Number.isFinite(Number(body?.year))
      ) {
        expiration = [Number(body.day), Number(body.month), Number(body.year)];
      } else if (Number.isInteger(Number(body?.id))) {
        idFromDb = Number(body.id);
      }

      let result;
      if (idFromDb) {
        try {
          const db = await getDb();
          const product = await db.collection('Product').findOne({ id: idFromDb });
          if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Product not found' }));
          }
          result = daysToExpire(product.expiration);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ ...result, id: product.id, name: product.name }));
        } catch (err) {
          const status = /MONGODB_URI/.test(err.message) ? 503 : 500;
          res.writeHead(status, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: err.message }));
        }
      } else {
        result = daysToExpire(expiration);
      }
      if (result.error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: result.error }));
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(result));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: err.message || 'Bad Request' }));
    }
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

// Start server with simple retry if port is busy
const DEFAULT_PORT = Number(process.env.PORT) || 3000;
let currentPort = DEFAULT_PORT;

function startServer() {
  server.listen(currentPort, () => {
    console.log(`API listening on port ${currentPort}`);
  });
}

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    const nextPort = currentPort + 1;
    console.warn(`Port ${currentPort} in use. Retrying on ${nextPort}...`);
    currentPort = nextPort;
    setTimeout(startServer, 250);
  } else {
    console.error('Server error:', err);
  }
});

startServer();

// Export for potential tests
export { daysToExpire };
