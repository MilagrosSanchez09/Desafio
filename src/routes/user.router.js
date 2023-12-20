// user.router.js
import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { validateLogIn } from "../middlewares/loginValidator.js";
import passport from "passport";
import '../passport/local-stategy.js';
import '../passport/github-strategy.js';

const controller = new UserController();
const router = Router();

// Ruta para formulario de registro
router.get("/register", controller.showRegisterForm);

// Ruta para procesar el formulario de registro con Passport Local
router.post("/register", controller.register);

// Ruta para el formulario de login
router.post("/login", controller.showLoginForm);

// Ruta para procesar el formulario de login con Passport Local
router.post(
    '/login', 
    validateLogIn, 
    passport.authenticate('login', {
    successRedirect: '/views/realtimmeproducts',
    failureRedirect: '/login',
    failureFlash: true,
})
);

// Ruta para autenticación de GitHub
router.get('/auth/github', controller.githubLogin);

// Ruta de callback después de la autenticación de Github
router.get('/auth/github/callback', controller.githubCallback);

// Ruta para cerrar sesión con passport y la validación de sesión
router.post('/logout', validateLogIn, controller.logout);

// Rutas protegidas que requieren autenticación
router.get("/info", validateLogIn, controller.infoSession);
router.get("/secret-endpoint", validateLogIn, controller.visit);

export default router;