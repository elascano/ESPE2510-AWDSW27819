# PLOS Papers Search

Proyecto simple con Vue.js para consultar y mostrar papers de la API de PLOS.

## Características

- Búsqueda de papers por título desde la API de PLOS
- Visualización en tabla ordenada con todos los datos
- Interfaz simple y limpia

## Estructura del Proyecto

```
WSapiPapers/
├── index.html    # Estructura HTML principal
├── app.js        # Lógica de Vue.js
├── styles.css    # Estilos CSS
└── README.md     # Documentación
```

## Cómo Usar

1. Abrir el archivo `index.html` en un navegador web
2. Ingresar un término de búsqueda en el campo de texto
3. Hacer clic en "Buscar" o presionar Enter
4. Los resultados se mostrarán en una tabla

## API

La aplicación consulta la API de PLOS:
- Endpoint: `https://api.plos.org/search`
- Parámetros: `q=title:{término}&wt=json&rows=20`

## Datos Mostrados

- ID del paper
- Título
- Journal
- EISSN
- Fecha de publicación
- Tipo de artículo
- Lista de autores
- Abstract (primeros 200 caracteres)
- Score de relevancia
