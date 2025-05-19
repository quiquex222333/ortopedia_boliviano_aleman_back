const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { productSchema } = require('../validators/product.schema');

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints protegidos para gestionar productos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - oldCode
 *         - name
 *         - salePrice
 *         - productionArea
 *         - prescription
 *         - brand
 *         - provider
 *         - unitValue
 *         - barcode
 *         - categories
 *         - indications
 *         - materials
 *         - technicalData
 *         - multimedia
 *         - weight
 *         - others
 *       properties:
 *         oldCode:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         salePrice:
 *           type: number
 *         productionArea:
 *           type: string
 *           enum: [ninguna, costura, yesos, plantillas, otros]
 *         prescription:
 *           type: boolean
 *         brand:
 *           type: string
 *         provider:
 *           type: string
 *         unitValue:
 *           type: number
 *         barcode:
 *           type: string
 *         colors:
 *           type: array
 *           items:
 *             type: string
 *         categories:
 *           type: array
 *           items:
 *             type: string
 *         indications:
 *           type: string
 *         materials:
 *           type: array
 *           items:
 *             type: string
 *         technicalData:
 *           type: string
 *         multimedia:
 *           type: object
 *           required: [type, path]
 *           properties:
 *             type:
 *               type: string
 *               enum: [imagen, video]
 *             path:
 *               type: string
 *         weight:
 *           type: string
 *         others:
 *           type: string
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado
 *       400:
 *         description: Error de validación
 */
router.post('/', validate(productSchema), controller.create);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Products]
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
 *         description: Datos del producto
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Products]
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
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Producto no encontrado
 */
router.put('/:id', validate(productSchema), controller.update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Products]
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
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/:id', controller.remove);

module.exports = router;