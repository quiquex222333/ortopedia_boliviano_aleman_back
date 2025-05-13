
# 🧠 Backend Auth API – Node.js + Express + MongoDB - Ortopedia Boliviano Aleman

Información general

---

## 📁 Estructura del Proyecto

```
src/
├── config/          # Conexión a base de datos y otras configuraciones
├── controllers/     # Controladores HTTP
├── models/          # Modelos de Mongoose
├── routes/          # Definición de rutas
├── services/        # Lógica de negocio
├── utils/           # Funciones auxiliares como hash y JWT
├── middlewares/     # Middlewares personalizados (autenticación, validación)
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

# Iniciar en modo desarrollo
npm run dev

# Iniciar en modo producción
npm start
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

---

## 🔒 Seguridad

- Contraseñas encriptadas con SHA-256 (no reversible).
- Tokens JWT con expiración de 1 hora.
- `.env` está ignorado por Git para evitar exponer credenciales.
