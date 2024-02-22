import Services from "./class.services.js";
import persistence from "../persistence/persistence.js";
const { productDao } = persistence;
import { generateProduct } from "../utils/utils.js";
import ProductRepository from "../persistence/repository/product/product.repository.js";

const productRepository = new ProductRepository()


export default class ProductService extends Services {
    constructor() {
        super(productDao);
    };

    async generateMockedProducts() {
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
    }
    
    async createProduct(product) {
        try {
            const newProduct = await productRepository.createProduct(product);
            if (!newProduct) {
                return (
                    false
                )
            } else {
                return (
                    newProduct
                )
            };
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async getProductById(id) {
        try {
            const product = await productRepository.getProductById(id);
            if (!product) {
                return (
                    false
                )
            } else {
                return (
                    product
                )
            };
        } catch (error) {
            throw new Error(error.message);
        };
    };
};