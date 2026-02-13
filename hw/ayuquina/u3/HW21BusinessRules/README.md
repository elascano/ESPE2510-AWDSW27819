# Nice Kids Center - Business Rules API

Backend API que implementa las reglas de negocio y endpoints especificados en API-ENDPOINTS-NEW.md.

## Características

- Cálculos de estudiantes (tiempo de estudio, edad, cuenta regresiva a cumpleaños)
- Relaciones Tutor/Estudiante (consultas bidireccionales)
- Reportes de asistencia
- Gestión de pagos
- Conexión con base de datos MongoDB Atlas

## Requisitos

- Node.js 18 o superior
- Cuenta de MongoDB Atlas (o MongoDB local)

## Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tu connection string de MongoDB
```

## Configuración de Base de Datos

El proyecto usa MongoDB con las siguientes colecciones:
- `Student` - Información de estudiantes
- `Guardian` - Información de tutores
- `StudentGuardian` - Relación entre estudiantes y tutores

### Seed inicial de la base de datos

Para crear datos de ejemplo:

```bash
npm run seed
```

Esto creará:
- 3 estudiantes de ejemplo (Jorge, María, Pedro)
- 4 tutores de ejemplo
- Relaciones entre estudiantes y tutores

## Ejecución

```bash
# Modo desarrollo (con auto-reload)
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en `http://localhost:3001`

## Endpoints Implementados

### Students - Cálculos

- `GET /api/students/:id/study-time` - Tiempo de estudio desde EnrollmentDate
- `GET /api/students/:id/age` - Edad del estudiante
- `GET /api/students/:id/birthday-countdown` - Días hasta próximo cumpleaños

### Relaciones

- `GET /api/students/:id/guardians` - Tutores de un estudiante
- `GET /api/guardians/:id/students` - Estudiantes de un tutor

### Asistencia (próximamente)

- `GET /api/students/:id/attendance` - Asistencia de un estudiante
- `GET /api/attendance/class/:classId` - Asistencia por clase
- `GET /api/attendance/range` - Registros por rango de fechas

### Pagos (próximamente)

- `GET /api/payments` - Listado de pagos
- `GET /api/payments/summary` - Resumen de pagos

## Estructura del Proyecto

```
├── src/
│   ├── config/
│   │   └── database.js       # Configuración de Supabase
│   ├── routes/
│   │   ├── students.js       # Rutas de estudiantes
│   │   └── guardians.js      # Rutas de tutores
│   ├── controllers/
│   │   ├── studentController.js
│   │   └── guardianController.js
│   ├── services/
│   │   └── dateCalculations.js
│   └── server.js             # Punto de entrada
├── .env                       # Variables de entorno
├── package.json
└── README.md
```

## Base de Datos

La base de datos usa MongoDB con Mongoose ODM.

**Base de datos:** NiceKids  
**Cluster:** Cluster0 en MongoDB Atlas

Colecciones principales:
- `Student` - Información de estudiantes
- `Guardian` - Información de tutores  
- `StudentGuardian` - Relación entre estudiantes y tutores

Los IDs son ObjectId de MongoDB (24 caracteres hexadecimales).

## Tecnologías

- Node.js + Express
- MongoDB Atlas + Mongoose
- ES Modules
