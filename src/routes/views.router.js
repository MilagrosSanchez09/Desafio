import { Router } from "express";
import ProductManager from "../managers/product.manager.js";
import UserController from "../controllers/user.controller.js";

const router = Router();
const productManager = new ProductManager();
const userController = new UserController();


router.get("/", async (req, res) =>{
    try{
        const products = await productManager.getProducts();
        res.render('home', {products});
    }catch (error){
        console.error("Error en la ruta principal ("/"):", error);
        res.status(500).json({error: "No se pudo obtener la lista de productos"});
    }
});

router.get("/realtimeproducts", async (req,res) => {
    try {
        res.render("realTimeProducts");
    }catch (error) {
        res.status(500).json({ error: "No se pudo obtener la lista de productos" });
    }
});

router.get("/login", (req, res) => {
    res.render("login")
})

router.get('/register', (req, res) => {
    res.render("register")
})

router.get("/profile", (req, res) => {
    res.render("profile")
})

router.get("/register-error", (req, res) => {
    res.render("register-error")
})

export default router;