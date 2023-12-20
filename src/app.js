import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
// Rutas
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import viewRouter from './routes/views.router.js';
import userRouter from "./routes/user.router.js";
// DB conexión
import './db/connection.js';
import { MONGOATLAS } from "./db/connection.js";

import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import crypto from "crypto";
import passport from "passport";

const app = express();

const mongoStoreOptions = {
    store: MongoStore.create ({
      mongoUrl: MONGOATLAS,
      ttl: 120,
      crypto: {
        secret: '1234'
      }
    }),
    secret: '1234',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 120000
    },
};

const products = [];

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(session(mongoStoreOptions));

app.use(express.static(__dirname + '/public'));

// Rutas del cart, products y user
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/user', userRouter);

//Configuración de handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/users', userRouter);
app.use('/views', viewRouter);

const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));
const socketServer = new Server(httpServer);
const secretKey = crypto.randomBytes(32).toString('hex');

// Conexión socket

socketServer.on('connection', (socket)=>{
    console.log(`Usuario conectado ${socket.id}`);
    socket.on('disconnect', ()=> console.log('usuario desconectado'))

    socket.emit('saludoDesdeBack', 'Bienvenido a websocket')

    socket.on('respuestaDesdeFront', (msg)=> console.log(msg))

    socket.on('newProduct', (product)=>{
        console.log("Producto recibido en el servidor:", product);
        products.push(product)
        socketServer.emit('arrayProducts', products)
    })
})