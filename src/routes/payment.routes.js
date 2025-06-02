const express = require('express');
const router = express.Router();
const controller = require('../controllers/payment.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { paymentSchema } = require('../validators/payment.schema');

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Gestión de pagos asociados a cambios de historial
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - changeHistoryId
 *         - client
 *         - paymentMethods
 *         - totalAmount
 *         - employee
 *         - branch
 *       properties:
 *         changeHistoryId:
 *           type: string
 *         client:
 *           type: object
 *           properties:
 *             identityNumber:
 *               type: string
 *             complement:
 *               type: string
 *             documentType:
 *               type: string
 *             businessName:
 *               type: string
 *             email:
 *               type: string
 *         paymentMethods:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               method:
 *                 type: string
 *                 enum: [qr, efectivo, tarjeta, transaccion]
 *               amount:
 *                 type: number
 *         totalAmount:
 *           type: number
 *         paymentDate:
 *           type: string
 *           format: date
 *         employee:
 *           type: string
 *         branch:
 *           type: string
 */

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Crear un nuevo pago para un historial de cambio
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: Pago registrado exitosamente
 *       400:
 *         description: Error de validación o creación
 *       404:
 *         description: El historial de cambio no existe
 */
router.post('/', validate(paymentSchema), controller.create);

/**
 * @swagger
 * /payments/{changeHistoryId}:
 *   get:
 *     summary: Obtener pagos asociados a un historial de cambio
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: changeHistoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de pagos
 *       400:
 *         description: Error al obtener los pagos
 */
router.get('/:changeHistoryId', controller.getByChangeHistoryId);

module.exports = router;