# Guía para Desplegar en Render

## 📋 Pasos para subir el Backend a Render

### 1️⃣ Preparar el proyecto para Git

Primero, necesitas subir tu código a GitHub:

```bash
cd "D:\Universidad\5to Semestre\Desarrollo Web Avanzado\EdisonRepository\ESPE2510-AWDSW27819\ws\ayuquina\u3\WSFEenPython"

# Inicializar git (si no lo has hecho)
git init

# Crear .gitignore
echo .venv/ >> .gitignore
echo __pycache__/ >> .gitignore
echo *.pyc >> .gitignore
echo .env >> .gitignore

# Añadir archivos
git add .
git commit -m "Initial commit - Customer microservice"

# Conectar con GitHub y subir
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

### 2️⃣ Crear cuenta en Render

1. Ve a [render.com](https://render.com/)
2. Regístrate (puedes usar tu cuenta de GitHub)
3. Verifica tu email

### 3️⃣ Crear un nuevo Web Service

1. En el dashboard de Render, haz clic en **"New +"**
2. Selecciona **"Web Service"**
3. Conecta tu repositorio de GitHub
4. Busca y selecciona tu repositorio del proyecto

### 4️⃣ Configurar el servicio

Llena los campos así:

- **Name:** `customer-microservice` (o el nombre que prefieras)
- **Region:** Selecciona la región más cercana (por ejemplo: Oregon)
- **Branch:** `main` (o la rama que uses)
- **Root Directory:** `WSFEenPython` ← **IMPORTANTE: Tu proyecto está aquí**
- **Runtime:** `Python 3`
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`

### 5️⃣ Configurar el plan

- Selecciona **"Free"** (plan gratuito)
- Acepta que el servicio se "dormirá" después de 15 minutos de inactividad

### 6️⃣ Variables de entorno (opcional)

Si quieres proteger tu connection string de MongoDB:

1. En la sección **"Environment Variables"**, añade:
   - Key: `MONGO_URI`
   - Value: `mongodb+srv://oop:oop@cluster0.9knxc.mongodb.net/?appName=Cluster0`

2. Luego modifica tu `main.py` para usar:
   ```python
   import os
   MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://oop:oop@cluster0.9knxc.mongodb.net/?appName=Cluster0")
   ```

### 7️⃣ Desplegar

1. Haz clic en **"Create Web Service"**
2. Espera 2-5 minutos mientras Render:
   - Instala las dependencias
   - Inicia el servidor
   - Asigna una URL pública

### 8️⃣ Obtener tu URL

Una vez desplegado, verás una URL como:
```
https://customer-microservice.onrender.com
```

Tus endpoints estarán en:
- `https://customer-microservice.onrender.com/oopdatabase/customers`
- `https://customer-microservice.onrender.com/docs`

### 9️⃣ Actualizar el Frontend

Cambia la URL del API en tu React app:

```javascript
// En App.jsx
const API_URL = 'https://customer-microservice.onrender.com/oopdatabase/customers'
```

---

## 🚀 Desplegar el Frontend en Render

### Opción A: Desplegar como Static Site en Render

1. En Render, crea un nuevo **"Static Site"**
2. Conecta el mismo repositorio
3. Configuración según tu estructura:

   **Opción 1 - Con Root Directory (RECOMENDADO):**
   - **Root Directory:** `WSFEenPython/customer-frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

   **Opción 2 - Sin Root Directory:**
   - **Root Directory:** (vacío)
   - **Build Command:** `cd WSFEenPython/customer-frontend && npm install && npm run build`
   - **Publish Directory:** `WSFEenPython/customer-frontend/dist`

### Opción B: Desplegar en Netlify o Vercel (más fácil)

**Netlify:**
```bash
cd customer-frontend
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

**Vercel:**
```bash
cd customer-frontend
npm install -g vercel
npm run build
vercel --prod
```

---

## ⚠️ Notas Importantes

1. **El plan gratuito de Render:**
   - Se "duerme" después de 15 min sin uso
   - La primera petición puede tardar 30-60 segundos
   - Es suficiente para proyectos universitarios

2. **CORS:** Ya está configurado en tu `main.py` para aceptar cualquier origen (`allow_origins=["*"]`)

3. **Actualizaciones:** Cada vez que hagas `git push`, Render re-desplegará automáticamente

4. **Logs:** Puedes ver los logs en tiempo real en el dashboard de Render

---

## 🔗 Recursos Útiles

- [Documentación Render - Python](https://render.com/docs/deploy-fastapi)
- [Documentación FastAPI - Deployment](https://fastapi.tiangolo.com/deployment/)
- [Render Dashboard](https://dashboard.render.com/)

---

## ✅ Checklist

- [ ] Código en GitHub
- [ ] Cuenta de Render creada
- [ ] Web Service creado
- [ ] Configuración correcta
- [ ] Deployment exitoso
- [ ] URL funcionando
- [ ] Frontend actualizado con nueva URL
