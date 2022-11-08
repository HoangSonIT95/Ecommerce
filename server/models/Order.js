import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User',
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Waiting for pay',
    required: true,
  },
  delivery: {
    type: String,
    default: 'Waiting for progressing',
    required: true,
  },
  orders: {
    items: [
      {
        nameProduct: {
          type: String,
        },
        priceProduct: {
          type: String,
        },
        img: {
          type: String,
        },
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

export default mongoose.model('Order', OrderSchema);
