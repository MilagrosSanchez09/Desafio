import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import userService from '../services/user.services.js';
import 'dotenv/config';
import config from '../config.js'

const strategyOptions = {
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL: 'http://localhost:8080/users/github',
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    const email = profile._json.email;
    const user = await userService.getByEmail(email);

    if (user) return done(null, user);

    const newUser = await userService.register({
        first_name: profile._json.name,
        email,
        isGithub: true,
    });

    return done(null, newUser);
};

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));