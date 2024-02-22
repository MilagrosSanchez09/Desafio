import { connect } from "mongoose";
import config from "./config.js";

const connectionString = config.MONGO_URL;

export const initMongoDB = async () => {
    try {
      await connect(connectionString);
      console.log("Conectado a la base de datos de MongoDB");
    } catch (error) {
      console.log(error);
    };
  };