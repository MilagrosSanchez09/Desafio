import Services from "./class.services.js";
import persistence from "../persistence/persistence.js";
import { logger } from "../utils/logger.js";
import ProductRepository from "../persistence/repository/product/product.repository.js";

const { productDao } = persistence;
const productRepository = new ProductRepository()

export default class ProductService extends Services {
    constructor() {
        super(productDao);
    };

    async generateMockedProducts() {
        try {
            const mockedProducts = [];
            for (let i = 1; i <= 100; i++) {
                const newProductData = {
                    product_name: `Mocked Product ${i}`,
                    product_description: `Descripción para el Producto ${i}`,
                    product_price: Math.random() * 100,
                    product_stock: Math.floor(Math.random() * 100),
                };
                mockedProducts.push(newProductData);
            }
            return await productDao.generateMockedProducts();
        } catch (error) {
            logger.error(`Error al generar productos falsos: ${error.message}`);
            throw new Error(error.message);
        }

    }

    async createProduct(product) {
        try {
            product.product_owner = ownerId;
            const newProduct = await productRepository.createProduct(product);
            if (!newProduct) {
                return false;
            } else {
                logger.info(`Producto creado: ${newProduct}`);
                return newProduct;
            };
        } catch (error) {
            logger.error(`Error al crear el producto: ${error.message}`);
            throw new Error(error.message);
        };
    };

    async getProductById(id) {
        try {
            const product = await productRepository.getProductById(id);
            if (!product) {
                return false;
            } else {
                logger.info(`Producto obtenido por ID: ${product}`);
                return product;
            };
        } catch (error) {
            logger.error(`Error al obtener el producto por ID: ${error.message}`);
            throw new Error(error.message);
        };
    };
};