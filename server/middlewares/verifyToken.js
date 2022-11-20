import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { createError } from './error.js';

// verify token
export const verifyToken = (req, res, next) => {
  const authHeader = req.get('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    User.findById(user._id).then(res => {
      req.user = res;
      next();
    });
  });
};

// verify user
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user._id === req.params.id || req.user.role === 'admin') {
      next();
    } else {
      return next(createError(403, 'You are not authorized!'));
    }
  });
};

export const verifyConselors = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'counselors' || req.user.role === 'admin') {
      next();
    } else return res.status(403).json('You are not authorized!');
  });
};

// verify admin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      return next(createError(403, 'You are not authorized!'));
    }
  });
};
