const express = require('express');
const router = express.Router();
const controller = require('../controllers/doctor.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { doctorSchema } = require('../validators/doctor.schema');

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Endpoints protegidos para gestionar doctores
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Doctor:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - middleName
 *       properties:
 *         firstName:
 *           type: string
 *           description: Nombres del doctor
 *         lastName:
 *           type: string
 *           description: Apellido paterno
 *         middleName:
 *           type: string
 *           description: Apellido materno
 */

/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Crear un nuevo doctor
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       201:
 *         description: Doctor creado
 *       400:
 *         description: Error de validación
 */
router.post('/', validate(doctorSchema), controller.create);

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Obtener todos los doctores
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de doctores
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     summary: Obtener un doctor por ID
 *     tags: [Doctors]
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
 *         description: Datos del doctor
 *       404:
 *         description: Doctor no encontrado
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /doctors/{id}:
 *   put:
 *     summary: Actualizar un doctor existente
 *     tags: [Doctors]
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
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       200:
 *         description: Doctor actualizado
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Doctor no encontrado
 */
router.put('/:id', validate(doctorSchema), controller.update);

/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     summary: Eliminar un doctor
 *     tags: [Doctors]
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
 *         description: Doctor eliminado
 *       404:
 *         description: Doctor no encontrado
 */
router.delete('/:id', controller.remove);

module.exports = router;
