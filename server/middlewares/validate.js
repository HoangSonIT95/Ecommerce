import { check, body } from 'express-validator';
import User from '../models/User.js';

export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
      return User.findOne({
        email: value,
      }).then(user => {
        if (!user) {
          return Promise.reject(
            'Email not exists, please pick a different one.'
          );
        }
        req.user = user;
      });
    }),
  body(
    'password',
    'Please enter a password with only numbers and text and at least 8 characters.'
  )
    .isLength({ min: 8 })
    .isAlphanumeric(),
];

export const validateSignup = [
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
      return User.findOne({
        email: value,
      }).then(user => {
        if (user) {
          return Promise.reject(
            'Email exists already, please pick a different one.'
          );
        }
      });
    }),
  body(
    'password',
    'Please enter a password with only numbers and text and at least 5 characters.'
  )
    .isLength({ min: 8 })
    .isAlphanumeric(),
];
