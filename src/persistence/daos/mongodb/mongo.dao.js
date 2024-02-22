import { ProductModel } from "./products/product.model.js";

export default class MongoDao {
    constructor(model) {
        this.model = model;
    };

    async getAll() {
        try {
            const response = await this.model.find({});
            return response;
        }catch (error) {
            console.log(error);
        };
    };

    async getById(id) {
        try{
            const response = await this.model.findById(id);
            return response;
        }catch(error){
            console.log(error);
        };
    };

    async create(obj) {
        try{
            const response = await this.model.create(obj);
            return response;
        }catch(error){
            console.log(error);
        };
    };

    async update(id, obj) {
        try{
            const response = await this.model.updateOne({_id: id}, obj);
            return response;
        }catch(error){
            console.log(error);
        };
    };

    async delete(id) {
        try{
            const response = await this.model.findByIdAndDelete(id);
            return response;
        }catch(error){
            console.log(error);
        };
    };

    async generateMockedProducts() {
        const mockedProducts = [];
    
        for (let i = 1; i <= 100; i++){
          const newProductData = {
            product_name: `Mocked Product ${i}`,
            product_description: `Descripción para el Producto ${i}`,
            product_price: Math.random() * 100,
            product_stock: Math.floor(Math.random() * 100),
          };
    
          mockedProducts.push(newProductData);
        }
    
        return await ProductModel.insertMany(mockedProducts);
    }
};