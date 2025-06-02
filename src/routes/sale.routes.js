const express = require("express");
const router = express.Router();
const controller = require("../controllers/sale.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { saleSchema } = require("../validators/sale.schema");

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Gestión de ventas
 */

/**
 * @swagger
 * /sales:
 * components:
 *   schemas:
 *     Sale:
 *       type: object
 *       required:
 *         - invoiceCode
 *         - status
 *         - patients
 *         - productsSold
 *         - products
 *         - employee
 *         - branch
 *       properties:
 *         invoiceCode:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, completed]
 *         patients:
 *           type: array
 *           items:
 *             type: string
 *         productsSold:
 *           type: array
 *           items:
 *             type: string
 *         products:
 *           type: array
 *           items:
 *             type: string
 *         changesHistory:
 *           type: array
 *           items:
 *             type: string
 *         payments:
 *           type: array
 *           items:
 *             type: string
 *         employee:
 *           type: string
 *         branch:
 *           type: string
 */


/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Crear una nueva venta
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sale'
 *     responses:
 *       201:
 *         description: Venta creada exitosamente
 *       400:
 *         description: Error al crear la venta
 */
router.post("/", validate(saleSchema), controller.create);

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Obtener todas las ventas
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de ventas
 *       400:
 *         description: Error al obtener ventas
 */
router.get("/", controller.getAll);

/**
 * @swagger
 * /sales/{id}:
 *   get:
 *     summary: Obtener venta por ID
 *     tags: [Sales]
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
 *         description: Detalle de la venta
 *       404:
 *         description: Venta no encontrada
 *       400:
 *         description: Error al obtener la venta
 */
router.get("/:id", controller.getById);

/**
 * @swagger
 * /sales/{id}:
 *   put:
 *     summary: Actualizar una venta por ID
 *     tags: [Sales]
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
 *             $ref: '#/components/schemas/Sale'
 *     responses:
 *       200:
 *         description: Venta actualizada
 *       404:
 *         description: Venta no encontrada
 *       400:
 *         description: Error al actualizar
 */
router.put("/:id", validate(saleSchema), controller.update);

/**
 * @swagger
 * /sales/{id}:
 *   delete:
 *     summary: Eliminar una venta por ID
 *     tags: [Sales]
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
 *         description: Venta eliminada
 *       404:
 *         description: Venta no encontrada
 *       400:
 *         description: Error al eliminar
 */
router.delete("/:id", controller.remove);

module.exports = router;
