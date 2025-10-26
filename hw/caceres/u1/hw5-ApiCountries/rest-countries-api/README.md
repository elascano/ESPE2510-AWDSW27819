# REST Countries – Ready-to-Run API Wrapper

Express (ESM) que reexpone funcionalidades de **REST Countries**: https://restcountries.com/

## Ejecutar
```bash
npm install
npm run dev
# http://localhost:8080/health
```

## Endpoints (v1)
- `GET /health`
- `GET /v1/country/code/:code` — ISO (CCA2 o CCA3)
- `GET /v1/country/name/:name` — por nombre (`?fullText=true|false`)
- `GET /v1/country/capital/:capital`
- `GET /v1/country/region/:region`
- `GET /v1/country/subregion/:subregion`
- `GET /v1/country/lang/:lang` — ISO 639-1
- `GET /v1/country/currency/:currency` — ISO 4217
- `GET /v1/country/dial/:code` — calling code numérico
- `GET /v1/country/minimal/:code` — resumen listo para UI

Todos aceptan `?fields=` para limitar atributos, p. ej.:  
`?fields=name,cca2,cca3,capital,region,population,flags`

## Ejemplos
```bash
curl http://localhost:8080/health
curl http://localhost:8080/v1/country/code/EC?fields=name,cca2,capital,region,flags
curl "http://localhost:8080/v1/country/name/ecuador?fullText=true&fields=name,cca3,capital,translations,flags"
curl http://localhost:8080/v1/country/region/Americas?fields=name,cca2,capital,region,subregion
curl http://localhost:8080/v1/country/minimal/EC
```

Licencia: MIT
