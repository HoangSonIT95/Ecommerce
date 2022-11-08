import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Token', TokenSchema);
