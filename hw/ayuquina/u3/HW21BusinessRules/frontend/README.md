# Nice Kids Center - Frontend

Frontend React para el sistema de gestión académica.

## Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## Producción

```bash
# Build para producción
npm run build

# Preview del build
npm run preview
```

## Despliegue en Render

1. El proyecto se construye automáticamente con `npm run build`
2. Los archivos estáticos se generan en la carpeta `dist/`
3. Render sirve estos archivos como un sitio estático

## Variables de Entorno

El frontend detecta automáticamente si está en desarrollo o producción:

- **Desarrollo**: Usa el proxy de Vite hacia `http://localhost:3001`
- **Producción**: Usa la URL del backend en Render `https://hmbusinessrules.onrender.com`

## Estructura

```
frontend/
├── src/
│   ├── components/        # Componentes React
│   │   ├── StudentAge.jsx
│   │   ├── StudentStudyTime.jsx
│   │   ├── BirthdayCountdown.jsx
│   │   ├── StudentGuardians.jsx
│   │   └── GuardianStudents.jsx
│   ├── services/          # Servicios de API
│   │   └── api.js
│   ├── App.jsx            # Componente principal
│   └── main.jsx           # Punto de entrada
├── index.html
├── package.json
└── vite.config.js
```
