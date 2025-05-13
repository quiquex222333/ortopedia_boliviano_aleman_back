const express = require('express');
const router = express.Router();
const controller = require('../controllers/branch.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { branchSchema } = require('../validators/branch.schema');

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Branches
 *   description: Endpoints para gestionar sucursales
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - city
 *         - phones
 *         - openingHours
 *         - mapUrl
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único generado por MongoDB
 *         name:
 *           type: string
 *           description: Nombre de la sucursal
 *         address:
 *           type: string
 *           description: Dirección física
 *         city:
 *           type: string
 *           description: Ciudad
 *         phones:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de teléfonos
 *         openingHours:
 *           type: array
 *           description: Horarios de atención por día
 *           items:
 *             type: object
 *             properties:
 *               day:
 *                 type: string
 *                 example: Monday
 *               from:
 *                 type: string
 *                 example: "08:00"
 *               to:
 *                 type: string
 *                 example: "17:00"
 *         mapUrl:
 *           type: string
 *           format: uri
 *           description: URL de ubicación en Google Maps
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /branches:
 *   post:
 *     summary: Crear una sucursal
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - city
 *               - phones
 *               - openingHours
 *               - mapUrl
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               phones:
 *                 type: array
 *                 items:
 *                   type: string
 *               openingHours:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     day:
 *                       type: string
 *                     from:
 *                       type: string
 *                     to:
 *                       type: string
 *               mapUrl:
 *                 type: string
 *                 format: uri
 *     responses:
 *       201:
 *         description: Sucursal creada
 *       400:
 *         description: Error de validación
 */
router.post('/', validate(branchSchema), controller.create);

/**
 * @swagger
 * /branches:
 *   get:
 *     summary: Obtener todas las sucursales
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de sucursales
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /branches/{id}:
 *   get:
 *     summary: Obtener una sucursal por ID
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la sucursal
 *     responses:
 *       200:
 *         description: Datos de la sucursal
 *       404:
 *         description: Sucursal no encontrada
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /branches/{id}:
 *   put:
 *     summary: Actualizar una sucursal
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la sucursal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       200:
 *         description: Sucursal actualizada
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Sucursal no encontrada
 */
router.put('/:id', validate(branchSchema), controller.update);

/**
 * @swagger
 * /branches/{id}:
 *   delete:
 *     summary: Eliminar una sucursal
 *     tags: [Branches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la sucursal
 *     responses:
 *       200:
 *         description: Sucursal eliminada
 *       404:
 *         description: Sucursal no encontrada
 */
router.delete('/:id', controller.remove);

module.exports = router;
