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
  check('email') // kiem tra email o bat ki dau (cookie, header, body...)
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
      // if (value === 'test@test.com') {
      //   throw new Error('This email address if forbidden.');
      // }
      // return true;
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
  ) // kiem tra password chi trong body
    .isLength({ min: 8 })
    .isAlphanumeric(),
  // body('confirmPassword').custom((value, { req }) => {
  //   if (value !== req.body.password) {
  //     throw new Error('Passwords have to match!');
  //   }
  //   return true;
  // }),
];
