import { createError } from '../middlewares/error.js';
import User from '../models/User.js';

// Get All User
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Get Detail User
export const getDetailUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return next(createError(404, 'Not found this user!'));
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Update User
export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndUpdate(userId, { ...req.body });
    res.status(200).json('Update user success!');
  } catch (err) {
    next(err);
  }
};

// Delete User
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json(`Delete user ${req.params.userId} success!`);
  } catch (err) {
    next(err);
  }
};

// Get count user
export const getCountUser = async (req, res, next) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json(count);
  } catch (err) {
    next(err);
  }
};
