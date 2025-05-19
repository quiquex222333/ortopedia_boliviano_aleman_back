require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/user.routes');
const branchRoutes = require('./routes/branch.routes');
const doctorRoutes = require('./routes/doctor.routes');
const employeeRoutes = require('./routes/employee.routes');
const productRoutes = require('./routes/product.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true
}));

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/products', productRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Servidor escuchando en puerto ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('Error al conectar BD:', err));
