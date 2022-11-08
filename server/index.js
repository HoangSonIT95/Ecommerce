import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import { Server } from 'socket.io';
import socket from './socket.js';

import User from './models/User.js';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import productsRoute from './routes/products.js';
import cartsRoute from './routes/carts.js';
import ordersRoute from './routes/orders.js';
import chatRoute from './routes/chat.js';
import connectMongoDBSession from 'connect-mongodb-session';

const app = express();

app.use(
  cors({
    withCredentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config();

const MongoDBStore = connectMongoDBSession(session);
const MONGODB_URI = process.env.MONGODB_URI;
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'session',
});

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.userId) {
    return next();
  }
  User.findById(req.session.userId)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })

    .catch(err => {
      next(new Error(err));
    });
});

app.use('/auth', authRoute);
app.use('/users', usersRoute);
app.use('/products', productsRoute);
app.use('/carts', cartsRoute);
app.use('/orders', ordersRoute);
app.use('/chat', chatRoute);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong!';
  res.status(status).json(message);
});

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    const server = app.listen(process.env.PORT || 5000);
    const io = new Server(server);
    socket(io);
  })
  .catch(err => console.log(err));
