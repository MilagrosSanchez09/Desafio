import persistence from "../../persistence.js";
const { productDao } = persistence;
import { logger } from "../../../utils/logger.js";
import ProductReqDTO from "../../dto/product/product.req.dto.js";
import ProductResDTO from "../../dto/product/product.res.dto.js";

export default class ProductRepository {
    constructor() {
        this.dao = productDao;
    };

    async createProduct(product) {
        try {
            const productDTO = new ProductReqDTO(product);
            const createdProduct = await this.dao.create(productDTO);
            logger.info(`Producto creado: ${JSON.stringify(createdProduct)}`);
            return createdProduct;
        }catch(error) {
            logger.error(`Error al crear el producto: ${error}`);
            throw new Error(error.message);
        };
    };

    async getProductById (id) {
        try {
            const response = await this.dao.getById(id);
            if(!response) {
                logger.warn(`No se encontró ningún producto con el ID: ${id}`);
                return false;
            }else {
                const resDTO = new ProductResDTO(response);
                logger.info(`Producto encontrado: ${JSON.stringify(resDTO)}`);
                return (resDTO);
            };
        }catch(error) {
            logger.error(`Error al obtener el producto por ID: ${id}, error: ${error}`);
            throw new Error(error.message);
        };
    };
}