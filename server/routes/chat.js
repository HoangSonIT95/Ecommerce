import express from 'express';
import {
  addMessage,
  getMessageByRoomId,
  newRoom,
  getAllRoomIsOpen,
} from '../controller/chat.js';

const router = express.Router();

router.post('/newRoom', newRoom);
router.put('/addMessage', addMessage);
router.get('/roomOpen', getAllRoomIsOpen);
router.get('/room/:roomId', getMessageByRoomId);

export default router;
