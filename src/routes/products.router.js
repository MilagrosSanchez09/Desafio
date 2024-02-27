import { Router } from "express";
import ProductController from "../controllers/product.controller.js";

const router = Router();
const controller = new ProductController();

/**
 * @swagger
 * /products:
 *      get: 
 *          summary: Retorna todos los productos.
 *          description: Retorna una lista con todos los productos disponibles.
 *          responses:
 *              200: 
 *                  description: Lista de productos obtenida con éxito.
 *              404:
 *                  description: No se encontraron productos.
 *              500: 
 *                  description: Error interno del servidor.
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retorna un producto por su ID.
 *     description: Retorna el producto correspondiente al ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a buscar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado con éxito.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 *  * /products:
 *   post:
 *     summary: Crea un nuevo producto.
 *     description: Crea un nuevo producto con los datos proporcionados.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado con éxito.
 *       400:
 *         description: Error en los datos proporcionados.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/', controller.create);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualiza un producto por su ID.
 *     description: Actualiza los datos de un producto existente identificado por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado con éxito.
 *       400:
 *         description: Error en los datos proporcionados.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/:id', controller.update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Elimina un producto por su ID.
 *     description: Elimina un producto existente identificado por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado con éxito.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete('/:id', controller.delete);

/**
 * @swagger
 * /products/dto:
 *   post:
 *     summary: Crea un nuevo producto utilizando un DTO.
 *     description: Crea un nuevo producto utilizando un objeto de transferencia de datos (DTO).
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductDTO'
 *     responses:
 *       201:
 *         description: Producto creado con éxito.
 *       400:
 *         description: Error en los datos proporcionados.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/dto', controller.createProduct);

/**
 * @swagger
 * /products/dto/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID utilizando un DTO.
 *     description: Retorna el producto correspondiente al ID proporcionado utilizando un objeto de transferencia de datos (DTO).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a buscar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado con éxito.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/dto/:id', controller.getProductById);

export default router;