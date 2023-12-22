import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import userService from '../services/user.services.js';

const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
};

const register = async (req, email, password, done) => {
    try {
        const user = await userService.findByEmail(email);

        if (user) {
            return done(null, false , { message: 'Email is already registered' });
        }

        const newUser = await userService.register(req.body);

        if (!newUser) {
            return done(null, false, { message: 'Error during registration.' });
        }
        return done(null, newUser);
    } catch (error) {
        console.log('Error during registration:', error);
        return done(error);
    }
};

const login = async (req, email, password, done) => {
    try {
        const user = await userService.findByEmail(email);

        if (!user) return done(null, false, { message: 'User not found' });

        const cleanPassword = password.trim();
        const passwordMatch = cleanPassword === user.password;

        if (passwordMatch) {
            req.session.user = {
                loggedIn: true,
                username: user.email,
                role: user.email === 'adminCoder@coder.com' ? 'admin' : 'usuario',
            };
            res.redirect('/views/realtimeproducts');
        } else {
            res.status(401).json({ msg: 'Incorrect credentials' });
        }
    } catch (error) {
        console.log('Authentication error: ', error);
        res.status(500).json ({ msg: 'Authentication error' });
    }
};

const registerStrategy = new LocalStrategy(strategyOptions, register);
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use('login', loginStrategy);

passport.use('register', registerStrategy);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await userService.getById(id);
    return done(null, user);
});