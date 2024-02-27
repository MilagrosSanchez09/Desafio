import { Router } from "express";
import CartController from "../controllers/cart.controller.js";
const router = Router();
const controller = new CartController();

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Obtiene todos los carritos.
 *     description: Retorna una lista con todos los carritos.
 *     responses:
 *       200:
 *         description: Lista de carritos obtenida con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/", controller.getAll);

/**
 * @swagger
 * /carts/{id}:
 *   get:
 *     summary: Obtiene un carrito por su ID.
 *     description: Retorna el carrito correspondiente al ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del carrito a buscar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrito encontrado con éxito.
 *       404:
 *         description: Carrito no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/:id", controller.getById);

/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Crea un nuevo carrito.
 *     description: Crea un nuevo carrito vacío.
 *     responses:
 *       201:
 *         description: Carrito creado con éxito.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/", controller.create);

/**
 * @swagger
 * /carts/{id}:
 *   put:
 *     summary: Actualiza un carrito por su ID.
 *     description: Actualiza los datos de un carrito existente identificado por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del carrito a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       200:
 *         description: Carrito actualizado con éxito.
 *       400:
 *         description: Error en los datos proporcionados.
 *       404:
 *         description: Carrito no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put("/:id", controller.update);

/**
 * @swagger
 * /carts/{id}:
 *   delete:
 *     summary: Elimina un carrito por su ID.
 *     description: Elimina un carrito existente identificado por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del carrito a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrito eliminado con éxito.
 *       404:
 *         description: Carrito no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/:id", controller.remove);

/**
 * @swagger
 * /carts/{idCart}/products/{idProd}:
 *   post:
 *     summary: Agrega un producto a un carrito.
 *     description: Agrega un producto existente a un carrito existente identificados por sus IDs respectivos.
 *     parameters:
 *       - in: path
 *         name: idCart
 *         required: true
 *         description: ID del carrito.
 *         schema:
 *           type: string
 *       - in: path
 *         name: idProd
 *         required: true
 *         description: ID del producto a agregar al carrito.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto agregado al carrito con éxito.
 *       404:
 *         description: Carrito o producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/:idCart/products/:idProd", controller.addProdToCart);

/**
 * @swagger
 * /carts/{idCart}/products/{idProd}:
 *   delete:
 *     summary: Elimina un producto de un carrito.
 *     description: Elimina un producto del carrito identificado por su ID de carrito y el ID del producto.
 *     parameters:
 *       - in: path
 *         name: idCart
 *         required: true
 *         description: ID del carrito del cual se eliminará el producto.
 *         schema:
 *           type: string
 *       - in: path
 *         name: idProd
 *         required: true
 *         description: ID del producto a eliminar del carrito.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito con éxito.
 *       404:
 *         description: Carrito o producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/:idCart/products/:idProd", controller.removeProdToCart);

/**
 * @swagger
 * /carts/clear/{idCart}:
 *   delete:
 *     summary: Vacía un carrito.
 *     description: Elimina todos los productos de un carrito identificado por su ID.
 *     parameters:
 *       - in: path
 *         name: idCart
 *         required: true
 *         description: ID del carrito a vaciar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrito vaciado con éxito.
 *       404:
 *         description: Carrito no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/clear/:idCart", controller.clearCart);

export default router;