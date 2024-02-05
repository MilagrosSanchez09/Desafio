import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserService from '../services/user.services.js';
import 'dotenv/config';
import config from '../config.js';
import bcrypt from 'bcrypt';
import { User }  from '../daos/mongodb/models/user.model.js';

const userService = new UserService();

const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
};

const login = async (req, email, password, done) => {
    try {
        const user = await userService.getByEmail(email);

        if (!user) {
            return done(null, false, { message: 'User not found' });
        }

        const cleanPassword = password.trim();
        const passwordMatch = await bcrypt.compare(cleanPassword, user.password);

        if (passwordMatch) {
            req.session.user = {
                loggedIn: true,
                username: user.email,
                role: user.email === config.admin.email ? 'admin' : 'usuario',
            };
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect credentials' })
        }
    } catch (error) {
        console.log('Authentication error: ', error);
        return done(error);
    }
};

const register = async (req, email, password, done) => {
    try {
        const user = await userService.getByEmail(email);

        if (user) {
            console.log('Email is already registered:', email);
            return done(null, false , { message: 'Email is already registered' });
        }

        const newUser = await userService.register(req.body);

        if (!newUser) {
            console.log('Error during registration:', email);
            return done(null, false, { message: 'Error during registration.' });
        }

        console.log('User registered succesfully', newUser);
        return done(null, newUser);
    } catch (error) {
        console.log('Error during registration:', error);
        return done(error);
    }
};

const registerStrategy = new LocalStrategy(strategyOptions, register);
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use('login', loginStrategy);
passport.use('register', registerStrategy);

passport.serializeUser((user, done) => {
    console.log('Serializing user:', user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try{
        const user = await userService.getById(id);
        return done(null, user);
    } catch (error){
        return done (error);
    }
});