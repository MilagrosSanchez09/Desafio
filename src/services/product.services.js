import { ProductDAO } from '../daos/mongodb/product.dao.js';

class ProductService {
  static async getAllProducts() {
    return await ProductDAO.getAllProducts();
  }

  static async getProductById(productId) {
    return await ProductDAO.getProductById(productId);
  }

  static async createProduct(productData) {
    return await ProductDAO.createProduct(productData);
  }

  static async updateProduct(productId, newData) {
    return await ProductDAO.updateProduct(productId, newData);
  }

  static async deleteProduct(productId) {
    return await ProductDAO.deleteProduct(productId);
  }

  static async generateMockedProducts() {
    const mockedProducts = [];
    for (let i = 1; i <= 100; i++) {
      const newProductData = {
        name: `Mocked Product ${i}`,
        description: `Descripción para el Producto ${i}`,
        price: Math.random() * 100,
        stock: Math.floor(Math.random() * 100),
        category: `Categoría ${i}`,
      };

      mockedProducts.push(newProductData);
    }
    return mockedProducts;
  }
};

export default ProductService;