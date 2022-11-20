import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    idProduct: {
      type: String,
      required: true,
    },
    idUser: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    star: {
      type: String,
      default: '5',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Comment', CommentSchema);
