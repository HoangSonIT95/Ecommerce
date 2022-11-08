import jwt from 'jsonwebtoken';
import { createError } from './error.js';

// verify token
export const verifyToken = (req, res, next) => {
  const authHeader = req.get('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.user = user;
    next();
  });
};

// verify user
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user._id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, 'You are not authorized!'));
    }
  });
};

// verify admin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, 'You are not authorized!'));
    }
  });
};
