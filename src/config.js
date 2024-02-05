import dotenv from 'dotenv';
dotenv.config();

const config = {
  mongoURI: process.env.MONGO_URI || 'mongodb+srv://mili-sanchez22:EcjpslM3YPkoVe0u@cluster0.dorzy6m.mongodb.net/bookstore',
  github: {
    clientID: process.env.GITHUB_CLIENT_ID || '27003366ed31c059dce6',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '32fb09e0876d262aee48d4bc15d0781a58e84965',
  },
  admin: {
    email: process.env.ADMIN_EMAIL || 'adminCoder@coder.com',
    password: process.env.ADMIN_PASSWORD || 'adminCoder123',
  },
  server: {
    port: process.env.PORT || 8080,
  },
  session: {
    secret: process.env.SESSION_SECRET || '1234',
  },
};

export default config;
