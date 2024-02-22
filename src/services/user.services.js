import Services from "./class.services.js";
import persistence from "../persistence/persistence.js";
import { sendMail } from "./mailing.user.services.js";

const { userDao } = persistence;

export default class UserService extends Services {
    constructor() {
        super(userDao);
        this.dao = userDao;
        console.log('UserDao in constructor:', userDao);
        console.log('this.dao in constructor:', this.dao);
    }

    async register (user) {
        try{
            console.log('UserDao inregister:', userDao);
            const response = await this.dao.register(user);
            return response;
        }catch(error) {
            throw new Error(error.message);
        };
    };

    async login (user) {
        try {
          const userExist = await this.dao.login(user);
          return userExist;
        } catch (error) {
          throw new Error(error.message);
        };
      };

    async resetPassword (user) {
      try{
        const token = await this.dao.resetPassword(user);
        if(token){
          return await sendMail(user, 'resetPassword', token);
        }else {
          return false;
        };
      }catch(error){
        throw new Error(error.message);
      };
    };
    
    async updatePassword (user, password) {
      try{
          const response = await this.dao.updatePassword(user, password);
          if(!response){
              return false
          }else {
              return (
                  response
              );
          };
      }catch(error){
          throw new Error(error.menssage);
      };
  };  
};