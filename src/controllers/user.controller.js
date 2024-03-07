import Controllers from "./class.controller.js";
import UserService from "../services/user.services.js";
import { HttpResponse, errorsDictionary } from "../utils/http.response.js";
import { logger } from "../utils/logger.js";

const httpResponse = new HttpResponse()
const userService = new UserService();

export default class UserController extends Controllers {
  constructor() {
    super(userService);
  };

  register = async (req, res, next) => {
    try {
      logger.info("Inicio del registro de usuario");
      const { body } = req;
      const newUser = await userService.register(body, body.role || "user");
      if (!newUser) {
        logger.error("El usuario no se registró correctamente");
        return httpResponse.Forbidden(res, errorsDictionary.ERROR_CREATE_USER);
      } else {
        logger.info("Usuario registrado correctamente:", newUser);
        return httpResponse.Ok(res, newUser);
      }
    } catch (error) {
      logger.error('Error durante el registro', error);
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const userExist = await userService.login(req.body);
      if (!userExist) {
        return httpResponse.Unauthorized(res, errorsDictionary.ERROR_LOGIN);
      } else {
        return httpResponse.Ok(res, userExist);
      }
    } catch (error) {
      logger.error("Error durante el inicio de sesión:", error);
      next(error);
    }
  };

  profile = async (req, res, next) => {
    try {
      const { first_name, last_name, email, role } = req.user;
      return httpResponse.Ok(res, { first_name, last_name, email, role });
    } catch (error) {
      logger.error("Error al obtener el perfil de usuario:", error);
      next(error);
    }
  };

  resetPassword = async (req, res, next) => {
    try {
      const user = req.user;
      const emailSent = await userService.resetPassword(user);
      if (emailSent) {
        logger.info("Email de restablecimiento de contraseña enviado");
        return httpResponse.Ok(res, { msg: 'Email sent' });
      } else {
        logger.error("No se pudo enviar el mail de restablecimiento de contraseña");
        return httpResponse.ServerError(res, { msg: 'Email not sent' });
      }
    } catch (error) {
      logger.error("Error al restablecer la contraseña:", error);
      next(error);
    }
  };

  updatePassword = async (req, res, next) => {
    try {
      const user = req.user;
      const { pass } = req.body;
      const { tokenpass } = req.cookies;
      if (!tokenpass) {
        logger.error("Token de restablecimiento de contraseña no proporcionado");
        return httpResponse.Forbidden(res, errorsDictionary.ERROR_TOKEN);
      }
      const updPass = await userService.updatePassword(user, pass);
      if (!updPass) {
        logger.error("Error al actualizar la contraseña");
        return httpResponse.NotFound(res, errorsDictionary.ERROR_PASSWORD);
      }
      res.clearCookie("tokenpass");
      logger.info("Contraseña actualizada correctamente")
      return httpResponse.Ok(res, updPass);
    } catch (error) {
      logger.error("Error al actualizar la contraseña:", error);
      next(error.message);
    }
  };
}