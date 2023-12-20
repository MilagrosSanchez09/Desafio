// import { model } from "mongoose";
import { ProductModel } from "../models/product.model.js";

export default class ProductManager {
    //constructor( collection, schema) {
    //    this.collection = model(collection, schema);
    //};

    async getProducts(page=1, limit=10, sortOrder='desc', query=null) {
        try{
            let queryObject = query ? JSON.parse(query) : {};
            
            let filter = {};
            for (const [key, value] of Object.entries(queryObject)) {
                if (key === 'category'){
                    filter.category = value;
                } else if (key === 'disponibility'){
                    filter.stock = value ? {$gt: 0} : {$lt: 1};
                }
            }
            
            let myAggregate = ProductModel.aggregate([{ $match: filter}]);
            const options = {
                page: page,
                limit: limit,
                sort: {price: sortOrder},
            };

            console.log("Realizando consulta de obtener todos los productos...");

            return (
                await ProductModel.aggregatePaginate(myAggregate, options)
            );
        } catch (error) {
            console.log("Error al obtener todos los productos:", error);
            throw error;
        };
    };

    async getById(id) {
        try {
            return (
                await ProductModel.findById(id)
            );
        }catch(error) {
            console.log(error);
        };
    };

    async create(obj) {
        try {
           return await ProductModel.create(obj);
        }catch (error) {
            console.log(error);
        };
    };

    async update(id, obj) {
        try{
            return (
                await ProductModel.findByIdAndUpdate(
                    {_id: id},
                    obj,
                    {new: true}
                    )
            );
        }catch (error) {
            console.log(error);
        };
    };

    async delete(id) {
        try {
            return (
                await ProductModel.findByIdAndDelete(id)
            )
        }catch (error) {
            console.log(error);
        };
    };

};