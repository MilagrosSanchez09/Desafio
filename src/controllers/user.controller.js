import passport from 'passport';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import userService from '../services/user.services.js';

export default class UserController {
  async register(req, res, next) {
    passport.authenticate('register', (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.redirect('/views/register-error');
      } else {
        req.logIn(user, (err) =>{
          if (err) {
            return next(err);
          }
          res.redirect('/');
        });
      }
    })(req, res, next);
  }
  
  async login(req, res, next) {
    passport.authenticate('login', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ msg: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/views/realtimeproducts');
      });
    })(req, res, next);
  }

  async visit(req, res) {
    req.session.user.count = req.session.user.count ? req.session.user.count +1 : 1;
    res.json({
      msg: `${req.session.user.username} ha visitado el sitio ${req.session.user.count} veces`,
    });
  };

  async logout(req, res) {
    req.logout();
    res.redirect('/');
  };

  async infoSession(req, res) {
    res.send({
      session: req.session,
      sessionId: req.sessionID,
      cookies: req.cookies,
    });
  }

  async showRegisterForm(req, res) {
    res.render('register');
  }

  async showProfile(req, res) {
    const user = req.session.user;
    res.render('profile', { user });
  }

  async showLoginForm(req, res) {
    res.render('login');
  }

  async githubLogin(req, res, next) {
    passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
  }
  
  async githubCallback(req, res, next) {
    passport.authenticate('github', {
      failureRedirect: '/login',
      successRedirect: '/views/realtimeproducts',
    })(req, res, next);
  }
}