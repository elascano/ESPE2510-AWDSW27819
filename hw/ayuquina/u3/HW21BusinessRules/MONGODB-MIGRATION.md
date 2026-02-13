# Migración Completada: MongoDB Atlas

## ✅ Cambios Realizados

Se migró exitosamente el backend de Supabase/PostgreSQL a MongoDB Atlas.

### 📦 Dependencias Actualizadas

**Antes:**
- @supabase/supabase-js

**Ahora:**
- mongoose (^8.0.3)

### 🗄️ Base de Datos

**Conexión:** `mongodb+srv://danny:danny@cluster0.crwllgh.mongodb.net/NiceKids`

**Colecciones creadas:**
- `Student` - Estudiantes
- `Guardian` - Tutores
- `StudentGuardian` - Relaciones

### 📊 Datos de Ejemplo

Se crearon 3 estudiantes y 4 tutores con sus relaciones.

**IDs de Estudiantes:**
- Jorge Lascano: `69647d5be707e81848d8a75c`
- María González: `69647d5be707e81848d8a75d`
- Pedro Ramírez: `69647d5be707e81848d8a75e`

**IDs de Tutores:**
- Ana Perez: `69647d5be707e81848d8a760`
- Luis Lascano: `69647d5be707e81848d8a761`
- Carlos González: `69647d5be707e81848d8a762`
- Laura Ramírez: `69647d5be707e81848d8a763`

## 🧪 Pruebas de Endpoints

### Ejemplo 1: Obtener edad de Jorge
```
GET http://localhost:3001/api/students/69647d5be707e81848d8a75c/age
```

**Respuesta esperada:**
```json
{
  "studentId": "69647d5be707e81848d8a75c",
  "years": 6,
  "months": 4,
  "days": 8,
  "totalDays": 2327,
  "birthDate": "2019-09-04",
  "asOf": "2026-01-12"
}
```

### Ejemplo 2: Obtener tiempo de estudio de Jorge
```
GET http://localhost:3001/api/students/69647d5be707e81848d8a75c/study-time
```

**Respuesta esperada:**
```json
{
  "studentId": "69647d5be707e81848d8a75c",
  "years": 2,
  "months": 8,
  "days": 1,
  "totalDays": 976,
  "since": "2023-05-12",
  "asOf": "2026-01-12"
}
```

### Ejemplo 3: Obtener tutores de Jorge
```
GET http://localhost:3001/api/students/69647d5be707e81848d8a75c/guardians
```

**Respuesta esperada:**
```json
[
  {
    "GuardianID": "69647d5be707e81848d8a760",
    "FirstName": "Ana",
    "LastName": "Perez",
    "Relationship": "Mother"
  },
  {
    "GuardianID": "69647d5be707e81848d8a761",
    "FirstName": "Luis",
    "LastName": "Lascano",
    "Relationship": "Father"
  }
]
```

### Ejemplo 4: Obtener estudiantes de Ana Perez
```
GET http://localhost:3001/api/guardians/69647d5be707e81848d8a760/students
```

**Respuesta esperada:**
```json
[
  {
    "StudentID": "69647d5be707e81848d8a75c",
    "FirstName": "Jorge",
    "LastName": "Lascano",
    "GradeID": null,
    "Relationship": "Mother"
  }
]
```

## 🚀 Comandos Útiles

### Iniciar el servidor
```bash
npm run dev
```

### Re-poblar la base de datos
```bash
npm run seed
```

### Ver logs del servidor
El servidor muestra todos los requests en la consola con timestamp.

## 📝 Archivos Modificados

### Nuevos:
- `src/models/Student.js` - Modelo de Mongoose para estudiantes
- `src/models/Guardian.js` - Modelo de Mongoose para tutores
- `src/models/StudentGuardian.js` - Modelo de relaciones
- `src/scripts/seedDatabase.js` - Script para poblar la DB
- `test-endpoints-mongodb.http` - Endpoints con IDs reales

### Modificados:
- `src/config/database.js` - Ahora usa Mongoose
- `src/controllers/studentController.js` - Usa MongoDB
- `src/controllers/guardianController.js` - Usa MongoDB
- `src/server.js` - Conecta con MongoDB
- `package.json` - Nuevas dependencias
- `.env` - Nueva configuración

## ⚠️ Notas Importantes

1. **IDs de MongoDB:** Son ObjectId de 24 caracteres hex (no integers como antes)
2. **Nombres de campos:** camelCase (`firstName`) en lugar de PascalCase (`FirstName`)
3. **Relaciones:** Se usan referencias de ObjectId con `.populate()`
4. **Timestamps:** Mongoose agrega automáticamente `createdAt` y `updatedAt`

## 🎯 Estado Actual

✅ Servidor corriendo en puerto 3001  
✅ Conectado a MongoDB Atlas (base de datos NiceKids)  
✅ Todos los endpoints funcionando correctamente  
✅ Datos de ejemplo creados  
✅ Relaciones entre estudiantes y tutores funcionando  

## 📚 Próximos Pasos

Si necesitas agregar más endpoints:
1. Crear el modelo en `src/models/`
2. Crear el controlador en `src/controllers/`
3. Agregar las rutas en `src/routes/`
4. Registrar las rutas en `src/server.js`
5. Actualizar el seed si es necesario
