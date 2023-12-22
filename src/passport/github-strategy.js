import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import userService from '../services/user.services.js';

const strategyOptions = {
    clientID: '27003366ed31c059dce6',
    clientSecret: '32fb09e0876d262aee48d4bc15d0781a58e84965',
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