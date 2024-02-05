import { ProductModel } from './models/product.model.js';
import { TicketModel } from './models/ticket.model.js';

export class ProductDAO {
  static async getAllProducts() {
    return await ProductModel.find();
  }

  static async getProductById(productId) {
    return await ProductModel.findById(productId);
  }

  static async createProduct(productData) {
    return await ProductModel.create(productData);
  }

  static async updateProduct(productId, newData) {
    return await ProductModel.findByIdAndUpdate(productId, newData, { new: true });
  }

  static async deleteProduct(productId) {
    return await ProductModel.findByIdAndDelete(productId);
  }

  static async getProductStock(productId) {
    const product = await ProductModel.findById(productId);
    return product ? product.stock : 0;
  }

  static async updateProductStock(productId, newStock) {
    return await ProductModel.findByIdAndUpdate(productId, { stock: newStock }, { new: true });
  }

  static async generateMockedProducts(){
    const mockedProducts = [];

    for (let i = 1; i <= 100; i++){
      const newProductData = {
        name: `Mocked Product ${i}`,
        description: `Descripción para el Producto ${i}`,
        price: Math.random() * 100,
        stock: Math.floor(Math.random() * 100),
        category: `Categoría ${i}`,
      };

      mockedProducts.push(newProductData);
    }

    return await ProductModel.insertMany(mockedProducts);
  }
}