import Controllers from "./class.controller.js";
import ProductService from "../services/product.services.js";
import { HttpResponse, errorsDictionary } from "../utils/http.response.js";
const httpResponse = new HttpResponse();

const productService = new ProductService();
export default class ProductController extends Controllers {
    constructor() {
        super(productService);
    };

    async generateMockedProducts(req, res, next) {
        try {
            const mockedProducts = await productService.generateMockedProducts();
            return httpResponse.Ok(res, mockedProducts);
        } catch (error) {
            next(error);
        }
    };

    async createProduct(req, res, next) {
        try {
            const newProduct = await productService.createProduct(req.body);
            if (!newProduct) {
                return (
                    httpResponse.NotFound(res, errorsDictionary.ERROR_CREATE_ITEM)
                );
            } else {
                return (
                    httpResponse.Ok(res, newProduct)
                );
            };
        } catch (error) {
            next(error);
        };
    };

    async getProductById(req, res, next) {
        try {
            const { id } = req.params;
            const product = await productService.getProductById(id);
            if (!product) {
                return (
                    httpResponse.NotFound(res, errorsDictionary.ERROR_FIND_ITEM)
                );
            } else {
                return (
                    httpResponse.Ok(res, product)
                );
            };
        } catch (error) {
            next(error);
        }
    }
};