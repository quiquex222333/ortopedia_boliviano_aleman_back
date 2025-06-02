const express = require('express');
const router = express.Router();
const controller = require('../controllers/changeHistory.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { changeHistorySchema } = require('../validators/changeHistory.schema');

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: ChangeHistory
 *   description: Historial de cambios asociados a ventas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ChangeHistory:
 *       type: object
 *       required:
 *         - saleId
 *         - deliveryType
 *         - employee
 *         - branch
 *       properties:
 *         saleId:
 *           type: string
 *         deliveryType:
 *           type: string
 *           enum: [casa, sucursal]
 *         deliveryDate:
 *           type: string
 *           format: date
 *         note:
 *           type: string
 *         amountReceived:
 *           type: number
 *         discount:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               enum: [porcentaje, moneda]
 *             value:
 *               type: number
 *         employee:
 *           type: string
 *           description: ID del empleado responsable
 *         branch:
 *           type: string
 *           description: ID de la sucursal asociada
 */

/**
 * @swagger
 * /change-history:
 *   post:
 *     summary: Crear un nuevo historial de cambio para una venta
 *     tags: [ChangeHistory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangeHistory'
 *     responses:
 *       201:
 *         description: Cambio registrado
 *       400:
 *         description: Error de validación o creación
 *       404:
 *         description: La venta no existe
 */
router.post('/', validate(changeHistorySchema), controller.create);

/**
 * @swagger
 * /change-history/{saleId}:
 *   get:
 *     summary: Obtener historial de cambios por ID de venta
 *     tags: [ChangeHistory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: saleId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Historial de cambios de la venta
 *       400:
 *         description: Error al obtener el historial
 */
router.get('/:saleId', controller.getBySaleId);

module.exports = router;