import MongoDao from "../mongo.dao.js";
import { UserModel } from "./user.model.js";
import { createHash, isValidPassword } from "../../../../utils/utils.js";
import jwt from "jsonwebtoken";
import config from "../../../../config/config.js";
import { logger } from "../../../../utils/logger.js";

const SECRET_KEY_JWT = config.SECRET_KEY_JWT;

export default class UserMongoDao extends MongoDao {
    constructor() {
        super(UserModel);
    };

    generateToken(user, timeExp) {
        const payload = {
            userId: user._id,
        };
        const token = jwt.sign(payload, SECRET_KEY_JWT, {
            expiresIn: timeExp,
        });
        return token;
    };

    async register(user, role) {
        try {
            const { email, password } = user;
            const existUser = await this.model.findOne({ email });
            if (!existUser) {
                const newUser = await this.model.create({
                    ...user,
                    role: role || 'user',
                    password: createHash(password)
                });
                logger.info(`Usuario registrado exitosamente: ${email}`);
                return newUser;
            } else {
                logger.error(`El usuario ya existe: ${email}`);
                return null;
            }
        } catch (error) {
            logger.error(`Error al registrar el usuario: ${error.menssage}`);
            throw new Error(error.message);
        };
    };

    async login(user) {
        try {
            const { email, password } = user;
            const userExist = await this.getByEmail(email);
            if (userExist) {
                const passValid = isValidPassword(userExist, password);
                if (!passValid) return false;
                else {
                    const token = this.generateToken(userExist, "15m");
                    logger.info(`Usuario autenticado exitosamente: ${email}`);
                    return token;
                }
            }
            return false;
        } catch (error) {
            logger.error(`Error al iniciar sesión: ${error.message}`);
            throw new Error(error.message);
        };
    };

    async getByEmail(email) {
        try {
            const user = await this.model.findOne({ email });
            if (!user) {
                logger.warn(`Usuario no encontrado para el email: ${email}`);
                return null;
            };
            logger.info(`Usuario encontrado pra el email: ${email}`);
            return user;
        } catch (error) {
            logger.error(`Error al buscar usuario por email: ${error.menssage}`);
            throw error;
        };
    };

    async resetPassword(user) {
        try {
            const { email } = user;
            const userExist = await this.getByEmail(email);
            if (userExist) {
                const token = this.generateToken(userExist, "1h");
                await this.model.updateOne(
                    { email: email },
                    { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 }
                )
                logger.info(`Solicitud de restablecimiento de contraseña generada para el usuario: ${email}`);
                return token;
            } else {
                logger.warn(`No se pudo encontrar el usuario para la solicitud: ${email}`);
                return false;
            };
        } catch (error) {
            logger.error(`Error al restrablecer la contraseña: ${error.menssage}`);
            throw new Error(error.menssage);
        };
    };

    async updatePassword(user, password) {
        try {
            const isEqual = isValidPassword(user, password);
            if (isEqual) {
                return false
            } else {
                const newPass = createHash(password);
                return (
                    await this.update(user_id, { password: newPass })
                );
            };
        } catch (error) {
            logger.error(`Error al actualizar la contraseña: ${error.message}`);
            throw new Error(error.menssage);
        };
    };
};