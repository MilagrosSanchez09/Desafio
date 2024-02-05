import passport from 'passport';
import UserService from '../services/user.services.js';

const userService = new UserService();

export default class UserController {
  async register(req, res, next) {
    passport.authenticate('register', (err, user) => {
      
      if (err) {
        console.log('Error during registration:', err);
        return res.redirect('/views/register-error');
      }
      if (!user) {
        console.log('Error or user already registered');
        return res.redirect('/views/register-error');
      }

      req.logIn(user, (err) =>{
        if (err) {
          console.log('Error during login after registration:', err);
          return next(err);
        }

        console.log('User logged in succesfully after registration:', user);
        return res.redirect('/products');
        })
    })(req, res, next);
  };
  async login(req, res, next) {
    passport.authenticate('login', async (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({ msg: info.message });
      }

      req.session.user = {
        loggedIn: true,
        username: user.email,
        role: user.email === config.admin.email ? 'admin' : 'usuario',
      };

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/views/products');
      });
    })(req, res, next);
  };
  async visit(req, res) {
    req.session.user.count = req.session.user.count ? req.session.user.count +1 : 1;
    res.json({
      msg: `${req.session.user.username} ha visitado el sitio ${req.session.user.count} veces`,
    });
  };
  async logout(req, res) {
    req.logout();
    res.redirect('/login');
  };
  async infoSession(req, res) {
    res.send({
      session: req.session,
      sessionId: req.sessionID,
      cookies: req.cookies,
    });
  };
  async showRegisterForm(req, res) {
    res.render('register');
  };
  async showProfile(req, res) {
    const user = req.session.user;
    res.render('profile', { user });
  };
  async showLoginForm(req, res) {
    res.render('login');
  };
  async githubLogin(req, res, next) {
    passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
  };
  async githubCallback(req, res, next) {
    passport.authenticate('github', {
      failureRedirect: '/login',
      successRedirect: '/views/realtimeproducts',
    })(req, res, next);
  }
}