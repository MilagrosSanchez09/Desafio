import path from 'path';
import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import ProductService from "../services/product.services.js";

const router = Router();
const userController = new UserController();

router.get("/", async (req, res) =>{
    try{
        const products = await ProductService.getAllProducts(req.query.page, req.query.limit, req.query.sort, req.query.query);
        res.render('home', { products, user: req.user });
    }catch (error){
        console.error("Error en la ruta principal ("/"):", error);
        res.status(500).json({error: "No se pudo obtener la lista de productos"});
    }
});
router.get("/realtimeproducts", async (req,res) => {
    try {
        const products = await ProductService.getAllProducts(req.query.page, req.query.limit, req.query.sort, req.query.query);
        res.render("realTimeProducts", { products, user: req.user });
    }catch (error) {
        res.status(500).json({ error: "No se pudo obtener la lista de productos" });
    }
});
router.get("/login", (req, res) => {
    res.render("login")
});
router.get('/register', (req, res) => {
    res.render("register")
});
router.get('/products', (req, res) => {
    res.render('products')
});
router.get("/profile", (req, res) => {
    res.render("profile")
});
router.get("/register-error", (req, res) => {
    res.render("register-error")
});

export default router;