import { User } from './models/user.model.js';

class UserDAO {
  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async getById(id) {
    return await User.findById(id);
  }

  async register(userData) {
    return await User.create(userData);
  }
}

export default UserDAO;