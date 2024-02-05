import express from "express";
import morgan from "morgan";
import { errorHandler } from "../src/middlewares/errorHandler.js";
import path from "path";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import viewRouter from './routes/views.router.js';
import userRouter from "./routes/user.router.js";
import ticketRouter from './routes/ticket.router.js';
import './config/connection.js';
import { MONGOATLAS } from "./config/connection.js";
import { Server } from "socket.io";
import config from "./config.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import crypto from "crypto";
import passport from "passport";
import './passport/local-stategy.js';
import 'dotenv/config';

const app = express();

// Config. conexión a MongoDB con express-session
const mongoStoreOptions = {
    store: MongoStore.create ({
      mongoUrl: config.mongoURI,
      ttl: 120,
      crypto: {
        secret: '1234'
      }
    }),
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 120000
    },
};

const products = [];

app.use(morgan('dev'));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(session(mongoStoreOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

// Rutas del cart, products, user, tickets
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/user', userRouter);
app.use('/api/tickets', ticketRouter)

//Configuración de handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/users', userRouter);
app.use('/views', viewRouter);

app.use(errorHandler);

// Servidor HTTP y socket.io
const PORT = config.server.port || 8080;
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