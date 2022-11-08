import bcrypt from 'bcryptjs';
import { createError } from '../middlewares/error.js';
import User from '../models/User.js';
import { validationResult } from 'express-validator';

import jwt from 'jsonwebtoken';
import Token from '../models/Token.js';

// Create Access Token
const generateAccessToken = user => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30m',
  });
};

// Create Refresh  Token
const generateRefreshToken = user => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

// Register User
export const register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array()[0].msg);
  }

  // hash password
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        ...req.body,
        cart: { items: [] },
        password: hashedPw,
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'User created!',
        userId: result._id,
      });
    })
    .catch(err => next(err));
};

// Login
export const login = async (req, res, next) => {
  try {
    // check email exists
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array()[0].msg);
    }

    // check password
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      req.user.password
    );

    if (!isPasswordCorrect) return next(createError(400, 'Wrong password!'));
    const { password, ...otherDetails } = req.user._doc;
    req.session.userId = req.user._id;
    return req.session.save(err => {
      res.status(200).json({ ...otherDetails });
    });
    // create token
    // const accessToken = generateAccessToken({ ...otherDetails });
    // const refreshToken = generateRefreshToken({ ...otherDetails });

    // const token = new Token({ refreshToken });
    // token.save();

    // response client
    // res.status(200).json({
    //   details: { ...otherDetails },
    // });
  } catch (err) {
    next(err);
  }
};

// Get new token when token expired
export const refreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  // verify refreshToken
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    const accessToken = generateAccessToken({ user });
    // send new accessToken to client
    res.status(200).json({
      accessToken,
    });
  });
};

// Logout
// export const logout = async (req, res, next) => {
//   const refreshToken = req.body.refreshToken;
//   // delete refreshToken in database
//   await Token.findOneAndDelete({ refreshToken });
//   res.status(200).json('Logout success!');
// };

export const postLogout = (req, res, next) => {
  req.session.destroy(err => {
    res.cookie('loggedIn', false).status(200).json('Logout success!');
  });
};
