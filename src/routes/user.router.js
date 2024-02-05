import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { validateLogIn } from "../middlewares/loginValidator.js";
import { isAdmin, isUser } from "../middlewares/authorizeValidator.js";
import passport from "passport";
import '../passport/local-stategy.js';
import '../passport/github-strategy.js';

const controller = new UserController();
const router = Router();

router.get("/register", controller.showRegisterForm);
router.post("/register", passport.authenticate('register', {
    successRedirect: '/views/products',
    failureRedirect: '/register',
    failureFlash: true,
}))
router.get("/login", controller.showLoginForm);
router.post("/login", passport.authenticate('login', {
    successRedirect: '/views/products',
    failureRedirect: '/user/login',
    failureFlash: true,
}), (req, res) => {
    console.log('Authenticated user:', req.user);
    console.log('Flash messages:', req.flash('error'));
});
router.get('/github', controller.githubLogin);
router.get('/github/callback', controller.githubCallback);
router.post('/logout', validateLogIn, controller.logout);
router.get("/info", validateLogIn, controller.infoSession);
router.get("/secret-endpoint", validateLogIn, controller.visit);

export default router;