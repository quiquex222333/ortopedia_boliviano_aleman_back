require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/user.routes');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Servidor escuchando en puerto ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('Error al conectar BD:', err));
