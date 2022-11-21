import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    message: [
      {
        message: String,
        isAdmin: Boolean,
      },
    ],
    isEnd: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('chatRoom', RoomSchema);
