import { error } from "console";
import ProductManager from "../managers/product.manager.js";
import { CartModel } from "../models/cart.model.js";
import { ProductModel } from "../models/product.model.js";

export class CartManager {
   
    async getAll(page=1, limit=10) {
        try {
            const response = await CartModel.find();
            return response;
        } catch (error) {
            console.log('Error al obtener carritos', error);
        };
    };

    async createCart(obj) {
        try {
            const newCart = await CartModel.create(obj);
            return newCart;
        } catch (error) {
            console.log("Error al crear el carrito:", error);
            return null;
        };
    };

    async getCartById(id) {
        try {
           await CartModel.findById(id);
        } catch (error) {
            console.log(error);
            return null;
        };
    };

    async deleteCart(id){
        try{
            await CartModel.findByIdAndDelete(id);
        } catch (error){
            return error;
        };
    };

    async getCartIdInJson(id){
        try{
            id = parseInt(id);
            const carts = await this.getCarts();
            const cartId = carts.findIndex((c) => c.id === id);
            return cartId || null;
        } catch (error){
            return error;
        }
    };


    async saveProductToCart(idCart, arrProducts) {
        try {
            let cart = await CartModel.findById(idCart);
            if (arrProducts.products) {
                arrProducts.products.forEach(idProduct => {
                    cart.products.push(idProduct);
                });
            }
            cart.save();
            cart = await CartModel.findById(idCart).populate("products");
            return cart;

        } catch (error) {
            console.log(error);
        }
    };

    async deleteProductFromCart(cartId, productId) {
        try {
            let cart = await CartModel.findById(cartId);
            for (let i = 0; i < cart.products.length; i++){
                const element = cart.products[i];
                if (element._id.valueOf() == productId){
                    cart.products.splice(i, 1);
                    cart.save();
                    return true;
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    async updCartProductsAmount (cartId, productId, body) {
        try{
            let cart = await CartModel.findById(cartId);
            for (let i = 0; i < body.quantity; i++){
                await cart.products.push(productId);
                await cart.save();
            }
            return cart;
        }catch(error){
            console.log(error);
        }
    }

}