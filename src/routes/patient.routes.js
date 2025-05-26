const express = require('express');
const router = express.Router();
const controller = require('../controllers/patient.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { patientSchema } = require('../validators/patient.schema');

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Endpoints protegidos para gestionar pacientes médicos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       required:
 *         - identityNumber
 *         - lastName
 *         - middleName
 *         - firstName
 *         - birthDate
 *         - biologicalGender
 *       properties:
 *         identityNumber:
 *           type: number
 *         identityComplement:
 *           type: string
 *         lastName:
 *           type: string
 *         middleName:
 *           type: string
 *         firstName:
 *           type: string
 *         birthDate:
 *           type: string
 *           format: date
 *         civilStatus:
 *           type: string
 *         biologicalGender:
 *           type: string
 *           enum: [masculino, femenino]
 *         address:
 *           type: string
 *         city:
 *           type: string
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 */

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Crear un nuevo paciente
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       201:
 *         description: Paciente creado
 *       400:
 *         description: Error de validación
 */
router.post('/', validate(patientSchema), controller.create);

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Obtener todos los pacientes
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pacientes
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Obtener un paciente por ID
 *     tags: [Patients]
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
 *         description: Datos del paciente
 *       404:
 *         description: Paciente no encontrado
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Actualizar un paciente
 *     tags: [Patients]
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
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       200:
 *         description: Paciente actualizado
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Paciente no encontrado
 */
router.put('/:id', validate(patientSchema), controller.update);

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Eliminar un paciente
 *     tags: [Patients]
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
 *         description: Paciente eliminado
 *       404:
 *         description: Paciente no encontrado
 */
router.delete('/:id', controller.remove);

module.exports = router;