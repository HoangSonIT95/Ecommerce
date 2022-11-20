import chatRoom from '../models/ChatRoom.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { createError } from '../middlewares/error.js';

export const newRoom = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (authHeader) {
      const token = authHeader && authHeader.split(' ')[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return next(createError(403, 'Token is not valid!'));
        return (req.user = user);
      });
    }

    const newRoom = new chatRoom({
      userId: req.user ? req.user._id : '63689392b2104129d20c5720',
    });
    const room = await newRoom.save();
    res.status(200).json(room._id);
  } catch (err) {
    next(err);
  }
};

export const getMessageByRoomId = async (req, res, next) => {
  try {
    const room = await chatRoom.findById(req.params.roomId).populate('userId');
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const addMessage = async (req, res, next) => {
  try {
    if (req.body.message === '/end') {
      await chatRoom.findByIdAndUpdate(req.body.roomId, {
        $set: {
          isEnd: true,
        },
      });
      return res.status(200).json('End chat success!');
    }
    await chatRoom.findByIdAndUpdate(req.body.roomId, {
      $push: {
        message: {
          message: req.body.message,
          isAdmin: req.body.isAdmin,
        },
      },
    });
    res.status(200).json('Save message success!');
  } catch (err) {
    next(err);
  }
};

export const getAllRoomIsOpen = async (req, res, next) => {
  try {
    const roomOpen = await chatRoom.find({ isEnd: false }).populate('userId');
    res.status(200).json(roomOpen);
  } catch (err) {
    next(err);
  }
};
