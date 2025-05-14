const express = require('express');
const router = express.Router();
const controller = require('../controllers/employee.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { employeeSchema } = require('../validators/employee.schema');

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Endpoints protegidos para gestionar empleados
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - middleName
 *         - employeeType
 *       properties:
 *         _id:
 *           type: string
 *         firstName:
 *           type: string
 *           description: Nombres del empleado
 *         lastName:
 *           type: string
 *           description: Apellido paterno
 *         middleName:
 *           type: string
 *           description: Apellido materno
 *         employeeType:
 *           type: string
 *           enum: [cashier, technician]
 *           description: Tipo de empleado, valores admitidos en la siguiete lista"
 */

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Crear un nuevo empleado
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Empleado creado
 *       400:
 *         description: Error de validación
 */
router.post('/', validate(employeeSchema), controller.create);

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Obtener todos los empleados
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empleados
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /employees/filter:
 *   get:
 *     summary: Obtener empleados filtrados por tipo
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [cashier, technician]
 *         description: Tipo de empleado
 *     responses:
 *       200:
 *         description: Lista de empleados filtrados
 *       400:
 *         description: Tipo de empleado inválido
 */
router.get('/filter', controller.getByType);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Obtener un empleado por ID
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del empleado
 *       404:
 *         description: Empleado no encontrado
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Actualizar un empleado
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Empleado actualizado
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Empleado no encontrado
 */
router.put('/:id', validate(employeeSchema), controller.update);

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Eliminar un empleado
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Empleado eliminado
 *       404:
 *         description: Empleado no encontrado
 */
router.delete('/:id', controller.remove);

module.exports = router;
