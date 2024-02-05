import { connect } from 'mongoose';
import 'dotenv/config';
import config from '../config.js';

const mongoUri = config.mongoURI;

export const MONGOATLAS = mongoUri;

try {
    await connect(mongoUri);
    console.log('Conectado a la base de datos de MongoDB')
}catch (error) {
    console.error('Error al conectar a la base de datos de MongoDB:', error);
};

