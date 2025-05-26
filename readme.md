
# 🧠 Backend Auth API – Node.js + Express + MongoDB - Ortopedia Boliviano Aleman

Información general

---

## 📁 Estructura del Proyecto

```
scripts/         # Scripts necesarios para poblar la DB
tests/           # Pruebas unitarias
src/
├── config/          # Conexión a base de datos y otras configuraciones
├── controllers/     # Controladores HTTP
├── models/          # Modelos de Mongoose
├── routes/          # Definición de rutas
├── services/        # Lógica de negocio
├── utils/           # Funciones auxiliares como hash y JWT
├── middlewares/     # Middlewares personalizados (autenticación, validación)
├── validators/      # Validadores personalizados (Schemas)
└── index.js         # Punto de entrada de la aplicación
```

---

## 🛠 Requisitos

- Node.js >= 16.x
- MongoDB en local o en la nube (ej. Atlas)

---

## 🚀 Instalación y Uso

```bash
# Clonar el repositorio
git clone https://github.com/quiquex222333/ortopedia_boliviano_aleman_back.git
cd ortopedia_boliviano_aleman_back

# Instalar dependencias
npm install

# Copiar y configurar el archivo .env
cp .env.template .env
# Edita .env con tus credenciales de MongoDB y la clave JWT

# Generar datos de prueba
npm run seed

# Genera todos los datos de prueba
npm run seed
# Generar datos de prueba para cada endpoint
npm run seed:<endpoind>
# Ejemplo del comando de arriba
npm run seed:employees

# Iniciar en modo desarrollo
npm run dev

# Iniciar en modo producción
npm start

# Correr pruebas unitarias
npm run test
```

---

## ⚙️ Variables de Entorno (`.env`)

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/miapp
JWT_SECRET=clave_secreta_segura
FRONTEND_ORIGIN=dominio_de_front
```

> ⚠️ No olvides que el archivo `.env` está en `.gitignore`. Usa `.env.template` para compartir estructura sin exponer datos sensibles.

---

## 🔐 Endpoints disponibles

| Método | Endpoint              | Descripción                |
|--------|-----------------------|----------------------------|
| POST   | `/api/users/register` | Registro de nuevo usuario |
| POST   | `/api/users/login`    | Login y retorno de token  |
| POST   | `/api/branches/`      | Craa una nueva sucursal   |
| GET    | `/api/branches/`      | Obtener todas las sucursales |
| GET    | `/api/branches/{id}`  | Obtener sucursal por id      |
| PUT    | `/api/branches/{id}`  | Actualiza sucursal pod id    |
| DELETE | `/api/branches/{id}`  | Eliminar sucursal por id     |
| POST   | `/api/doctors/`      | Craa un nuevo doctor         |
| GET    | `/api/doctors/`      | Obtener todos los doctores   |
| GET    | `/api/doctors/{id}`  | Obtener doctor por id        |
| PUT    | `/api/doctors/{id}`  | Actualiza doctor pod id      |
| DELETE | `/api/doctors/{id}`  | Eliminar doctor por id       |
| POST   | `/api/employees/`      | Craa un nuevo empleado         |
| GET    | `/api/employees/`      | Obtener todos los empleados   |
| GET    | `/api/employees/filter?type`      | Obtener todos los empleados por tipo   |
| GET    | `/api/employees/{id}`  | Obtener empleado por id        |
| PUT    | `/api/employees/{id}`  | Actualiza empleado pod id      |
| DELETE | `/api/employees/{id}`  | Eliminar empleado por id       |
| POST   | `/api/products/`      | Craa un nuevo producto         |
| GET    | `/api/products/`      | Obtener todos los productos   |
| GET    | `/api/products/{id}`  | Obtener producto por id        |
| PUT    | `/api/products/{id}`  | Actualiza producto pod id      |
| DELETE | `/api/products/{id}`  | Eliminar producto por id       |
| POST   | `/api/patients/`      | Craa un nuevo paciente         |
| GET    | `/api/patients/`      | Obtener todos los pacientes    |
| GET    | `/api/patients/{id}`  | Obtener paciente por id        |
| PUT    | `/api/patients/{id}`  | Actualiza paciente pod id      |
| DELETE | `/api/patients/{id}`  | Eliminar paciente por id       |

---

## 🔒 Seguridad

- Contraseñas encriptadas con SHA-256 (no reversible).
- Tokens JWT con expiración de 1 hora.
- `.env` está ignorado por Git para evitar exponer credenciales.

---

## 📚 Documentación con Swagger

La documentación interactiva de la API está disponible en:

👉 [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
