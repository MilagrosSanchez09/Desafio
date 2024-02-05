import bcrypt from 'bcrypt';
import handlebars from "handlebars";
import UserDAO from '../daos/mongodb/user.dao.js';
import config from "../config.js";
import 'dotenv/config';
import DAOFactory from '../daos/daoFactory.js';

class UserService {
  constructor(){
    this.userDAO = DAOFactory.getUserDAO();
  }
  async login(email, password) {
    const user = await this.userDAO.findByEmail(email);

    if (!user) {
      return null;
    }

    const cleanPassword = password.trim();
    const passwordMatch = await bcrypt.compare(cleanPassword, user.password);

    return passwordMatch ? user : null;
  }

  async getByEmail(email) {
    return await this.userDAO.findByEmail(email);
  }

  async getById(id) {
    return await this.userDAO.getById(id);
  }

  async register(userData) {
    return await this.userDAO.register(userData);
  }
}

export default UserService;