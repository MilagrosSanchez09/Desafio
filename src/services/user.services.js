import Services from "./class.services.js";
import persistence from "../persistence/persistence.js";
import { sendMail } from "./mailing.user.services.js";
import { logger } from "../utils/logger.js";
import { th } from "@faker-js/faker";

const { userDao } = persistence;

export default class UserService extends Services {
  constructor() {
    super(userDao);
    this.dao = userDao;
    logger.info('UserDao in constructor:', userDao);
    logger.info('this.dao in constructor:', this.dao);
  }

  async register(user, role) {
    try {
      logger.info('UserDao in register:', userDao);
      const response = await this.dao.register(user, role);
      return response;
    } catch (error) {
      logger.error('Error in register:', error.message);
      throw new Error(error.message);
    };
  };

  async login(user) {
    try {
      const userExist = await this.dao.login(user);
      return userExist;
    } catch (error) {
      logger.error('Error in login:', error.message);
      throw new Error(error.message);
    };
  };

  async resetPassword(user) {
    try {
      const token = await this.dao.resetPassword(user);
      if (token) {
        await sendMail(user, 'resetPassword', token);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      logger.error('Error in resetPassword:', error.message);
      throw new Error(error.message);
    };
  };

  async updatePassword(user, password) {
    try {
      const response = await this.dao.updatePassword(user, password);
      if (!response) {
        return false
      } else {
        return response;
      };
    } catch (error) {
      logger.error('Error in updatePassword:', error.message);
      throw new Error(error.message);
    };
  };
};