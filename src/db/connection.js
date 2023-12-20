import { connect } from 'mongoose';

export const MONGOATLAS ='mongodb+srv://mili-sanchez22:EcjpslM3YPkoVe0u@cluster0.dorzy6m.mongodb.net/bookstore'
try {
    await connect(MONGOATLAS);
    console.log('Conectado a la base de datos de MongoDB')
}catch (error) {
    console.log(error);
};

