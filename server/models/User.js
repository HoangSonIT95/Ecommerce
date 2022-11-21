import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    cart: {
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
    role: {
      type: String,
      default: 'customer',
    },
  },
  { timestamps: true }
);

UserSchema.methods.addToCart = function (product, count) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });
  const updateCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    updateCartItems[cartProductIndex].quantity =
      this.cart.items[cartProductIndex].quantity + count;
  } else {
    updateCartItems.push({
      nameProduct: product.name,
      priceProduct: product.price,
      img: product.imageURL[0],
      productId: product._id,
      quantity: count,
    });
  }

  const updateCart = {
    items: updateCartItems,
  };
  this.cart = updateCart;
  return this.save();
};

UserSchema.methods.removeFromCart = function (productId) {
  const updateCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  });

  this.cart.items = updateCartItems;
  return this.save();
};

UserSchema.methods.updateFromCart = function (productId, quantity) {
  this.cart.items.map(item => {
    if (item.productId.toString() === productId.toString()) {
      item.quantity = quantity;
    }
  });
  return this.save();
};

UserSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

export default mongoose.model('User', UserSchema);
// module.exports = mongoose.model('User', UserSchema);
