import { Router } from "express";
import fetch from "node-fetch";

const BASE = "https://restcountries.com/v3.1";
const router = Router();

const withFields = (url, fields) => {
  if (fields) {
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}fields=${encodeURIComponent(fields)}`;
  }
  return url;
};

const proxy = async (url, res) => {
  const r = await fetch(url);
  if (!r.ok) return res.status(r.status).json({ error: `REST Countries error ${r.status}` });
  const data = await r.json();
  return res.json(data);
};

router.get("/code/:code", async (req, res) => {
  const { code } = req.params;
  const url = withFields(`${BASE}/alpha/${encodeURIComponent(code)}`, req.query.fields);
  return proxy(url, res);
});

router.get("/name/:name", async (req, res) => {
  const { name } = req.params;
  const { fullText = "false", fields } = req.query;
  const url = withFields(`${BASE}/name/${encodeURIComponent(name)}?fullText=${fullText}`, fields);
  return proxy(url, res);
});

router.get("/capital/:capital", async (req, res) => {
  const { capital } = req.params;
  const url = withFields(`${BASE}/capital/${encodeURIComponent(capital)}`, req.query.fields);
  return proxy(url, res);
});

router.get("/region/:region", async (req, res) => {
  const { region } = req.params;
  const url = withFields(`${BASE}/region/${encodeURIComponent(region)}`, req.query.fields);
  return proxy(url, res);
});

router.get("/subregion/:subregion", async (req, res) => {
  const { subregion } = req.params;
  const url = withFields(`${BASE}/subregion/${encodeURIComponent(subregion)}`, req.query.fields);
  return proxy(url, res);
});

router.get("/lang/:lang", async (req, res) => {
  const { lang } = req.params;
  const url = withFields(`${BASE}/lang/${encodeURIComponent(lang)}`, req.query.fields);
  return proxy(url, res);
});

router.get("/currency/:currency", async (req, res) => {
  const { currency } = req.params;
  const url = withFields(`${BASE}/currency/${encodeURIComponent(currency)}`, req.query.fields);
  return proxy(url, res);
});

router.get("/dial/:code", async (req, res) => {
  const { code } = req.params;
  const url = withFields(`${BASE}/callingcode/${encodeURIComponent(code)}`, req.query.fields);
  return proxy(url, res);
});

router.get("/minimal/:code", async (req, res) => {
  const code = encodeURIComponent(req.params.code);
  const url = `${BASE}/alpha/${code}?fields=name,cca2,cca3,capital,region,population,flags`;
  const r = await fetch(url);
  if (!r.ok) return res.status(r.status).json({ error: `REST Countries error ${r.status}` });
  const data = await r.json();
  const c = Array.isArray(data) ? data[0] : data;
  return res.json({
    name: c?.name?.common,
    cca2: c?.cca2,
    cca3: c?.cca3,
    capital: Array.isArray(c?.capital) ? c.capital[0] : c?.capital,
    region: c?.region,
    population: c?.population,
    flag: c?.flags?.svg || c?.flags?.png
  });
});

export default router;
