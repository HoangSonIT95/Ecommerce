import Product from '../models/Product.js';

export const getCart = (req, res, next) => {
  res.status(200).json(req.user.cart.items);
};

export const postCart = (req, res, next) => {
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  Product.findById(productId)
    .then(product => {
      return req.user.addToCart(product, quantity);
    })
    .then(result => {
      res.status(200).send(result.cart);
    })
    .catch(err => {
      return next(err);
    });
};

export const deleteCart = (req, res, next) => {
  req.user
    .removeFromCart(req.params.productId)
    .then(result => {
      res.status(200).send(result.cart);
    })
    .catch(err => next(err));
};

export const updateCart = (req, res, next) => {
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  req.user
    .updateFromCart(productId, quantity)
    .then(result => {
      res.status(200).send(result.cart);
    })
    .catch(err => next(err));
};
