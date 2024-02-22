import Controllers from "./class.controller.js";
import UserService from "../services/user.services.js";
import { HttpResponse, errorsDictionary } from "../utils/http.response.js";

const httpResponse = new HttpResponse()
const userService = new UserService();

export default class UserController extends Controllers {
    constructor() {
        super(userService);
    };

    register = async (req, res, next) => {
        try {
          console.log('Inicio del registro de usuario');
            const newUser = await userService.register(req.body, true);
            console.log('Nuevo usuario registrado:', newUser);
            if(!newUser){
              console.log('El usuario no se registró correctamente');
              return httpResponse.Forbidden(res, errorsDictionary.ERROR_CREATE_USER);
            }else {
              console.log('El usuario se registró correctamente');
              return httpResponse.Ok(res, newUser);
            };
        }catch(error){
          console.log('Error durante el registro', error);
            next(error);
        };
    };

    login = async (req, res, next) => {
      try {
        const userExist = await userService.login(req.body);
        if (!userExist) {
          return(
            httpResponse.Unauthorized(res, errorsDictionary.ERROR_LOGIN)
          )
        } else {
          return (
            httpResponse.Ok(res, userExist)
          )
        }
      } catch (error) {
        next(error);
      }
    };
    
    profile = async (req, res, next) =>{
      try{
        const { first_name, last_name, email, role } = req.user;
        return (
          httpResponse.Ok(res, {
            first_name,
            last_name,
            email,
            role,
            })
        )
      }catch(error){
        next(error)
      }
    };

  resetPassword = async (req, res, next) =>{
    try{
      const user = req.user;
      const tokenReset = await userService.resetPassword(user);
      if(tokenReset) {
        res.cookie('tokenResetpass', tokenReset);
        return (
          httpResponse.Ok(res, {msg: 'Email sent'})
        );
      }else {
        return (
          httpResponse.ServerError(res, {msg: 'Email not sent'})
        );
      };
    }catch(error){
      next(error);
    };
  };

  async updatePassword (req, res, next) {
    try {
      const user = req.user;
      const { pass } = req.body;
      const { tokenpass } = req.cookies;
      if (!tokenpass)
        return httpResponse.Forbidden(res, errorsDictionary.ERROR_TOKEN);
      const updPass = await userService.updatePassword(user, pass);
      if (!updPass) return httpResponse.NotFound(res, errorsDictionary.ERROR_PASSWORDL);
      res.clearCookie("tokenpass");
      return httpResponse.Ok(res, updPass);
    } catch (error) {
      next(error.message);
    };
  };
};