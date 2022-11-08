import { createError } from '../middlewares/error.js';
import Product from '../models/Product.js';

const numOfPage = 9;
// Get All Product
export const getProducts = async (req, res, next) => {
  await Product.find()
    .then(products => res.status(200).json(products))
    .catch(err => next(err));
};

// Get Detail Product
export const getDetailProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) return next(createError(404, 'Product not exists!'));

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// Edit Product
export const EditProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(422).json('Not found this product!');

    const imageURL = req.body.imageURL.split(',');

    const images = req.files;
    if (images) {
      images.map(image => {
        return imageURL.push(image.path);
      });
    }
    const productUpdate = { ...req.body, imageURL };

    await Product.findByIdAndUpdate(req.params.productId, productUpdate);

    res.status(200).json('Update product success!');
  } catch (err) {
    next(err);
  }
};

// Get Category product
export const getCategory = async (req, res, next) => {
  try {
    const category = req.query.category;
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// Add New Product
export const addProduct = async (req, res, next) => {
  try {
    const images = req.files;
    if (!images) {
      return res.status(422).json('Attacted file is not an image.');
    }

    const imageURL = images.map(image => {
      return image.path;
    });

    const newProduct = new Product({ ...req.body, imageURL: imageURL });
    await newProduct.save();
    res.status(200).json('Add product success!');
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// Delete Product
export const deleteProduct = async (req, res, next) => {
  try {
    // check product exists
    const product = await Product.findById(req.params.productId);
    if (!product) return next(createError(404, 'Product not exists!'));
    // delete product
    await Product.findByIdAndDelete(req.params.productId);
    res.status(200).json(`Delete product ${req.params.productId} success!`);
  } catch (err) {
    next(err);
  }
};

// Search Product
export const pagination = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const keyword = req.query.search;
    const category = req.query.category;

    const start = (page - 1) * numOfPage;
    const end = page * numOfPage;

    let products;
    let totalPage;
    let numOfResult;

    if (category === 'all') {
      products = await Product.find();
    } else {
      products = await Product.find({ category: category });
    }

    if (keyword) {
      products = products.filter(product => {
        return (
          product.name.toUpperCase().indexOf(keyword.toUpperCase()) !== -1 ||
          product.category.toUpperCase().indexOf(keyword.toUpperCase()) !== -1
        );
      });
    }

    totalPage = Math.ceil(products.length / numOfPage);
    numOfResult = products.length;
    products = products.slice(start, end);
    return res.status(200).json({ products, totalPage, numOfResult });
  } catch (err) {
    next(err);
  }
};
