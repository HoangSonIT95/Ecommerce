import { createError } from '../middlewares/error.js';
import Order from '../models/Order.js';
import nodemailer from 'nodemailer';
import Product from '../models/Product.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hoangsonhvsit@gmail.com', // generated ethereal user
    pass: 'vknrjatncnczxylp', // generated ethereal password
  },
});

export const createOrder = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { phone, email, total, fullName, address } = req.body;
    const cart = req.user.cart;
    const items = cart.items;

    items.map(async item => {
      const product = await Product.findById(item.productId);
      const stockOld = product.stock;
      if (item.quantity > stockOld) {
        throw new Error(' da het hang ');
      }

      await Product.findByIdAndUpdate(item.productId, {
        $set: {
          stock: stockOld - item.quantity,
        },
      });
    });

    const htmlHead =
      '<table style="width:80%">' +
      '<tr style="border: 1px solid black;"><th style="border: 1px solid black;">Tên Sản Phẩm</th><th style="border: 1px solid black;">Hình Ảnh</th><th style="border: 1px solid black;">Giá</th><th style="border: 1px solid black;">Số Lượng</th><th style="border: 1px solid black;">Thành Tiền</th>';

    let htmlContent = '';

    for (let i = 0; i < items.length; i++) {
      htmlContent +=
        '<tr>' +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
        items[i].nameProduct +
        '</td>' +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;"><img src="' +
        items[i].img +
        '" width="80" height="80"></td>' +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
        items[i].priceProduct.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
        ' ' +
        'VNĐ</td>' +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
        items[i].quantity +
        '</td>' +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
        (parseInt(items[i].priceProduct) * parseInt(items[i].quantity))
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
        ' ' +
        'VNĐ</td><tr>';
    }

    const htmlResult =
      '<h1>Xin Chào ' +
      fullName +
      '</h1>' +
      '<h3>Phone: ' +
      phone +
      '</h3>' +
      '<h3>Address:' +
      address +
      '</h3>' +
      htmlHead +
      htmlContent +
      '<h1>Tổng Thanh Toán: ' +
      total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
      ' ' +
      'VNĐ</br>' +
      '<p>Cảm ơn bạn!</p>';

    const order = new Order({
      userId: userId,
      phone: phone,
      email: email,
      total: total,
      fullName: fullName,
      address: address,
      orders: cart,
    });

    order
      .save()
      .then(result => {
        req.user.clearCart();
        res.status(200).json(result);
        transporter.sendMail({
          from: 'hoangsonhvsit@gmail.com',
          to: email,
          subject: 'Hóa Đơn Đặt Hàng',
          html: htmlResult,
        });
      })
      .catch(err => next(err));
  } catch (err) {
    return next(err);
  }
};

export const getOrdersUser = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    if (!orders) return createError(400, `You don't have order!`);
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return createError(400, 'Not found this order');
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    await Order.findByIdAndUpdate(req.params.orderId, {
      $set: {
        delivery: req.body.delivery,
        status: req.body.status,
      },
    });
    res.status(200).json('Update order success');
  } catch (err) {
    next(err);
  }
};

export const getOrdersAll = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

export const getEarningTotal = async (req, res, next) => {
  try {
    const orders = await Order.find();
    const total = orders.map(order => {
      return Number(order.total);
    });

    const earningTotal = total.reduce((total, orderTotal) => {
      return total + orderTotal;
    });
    res.status(200).json(earningTotal);
  } catch (err) {
    next(err);
  }
};

export const getEarningAvg = async (req, res, next) => {
  try {
    function getMonthDifference(startDate, endDate) {
      return (
        endDate.getMonth() -
        startDate.getMonth() +
        12 * (endDate.getFullYear() - startDate.getFullYear())
      );
    }

    const orders = await Order.find();
    const totalP = orders.reduce((total, item) => {
      return total + Number(item.total);
    }, 0);
    const startDate = orders[0].createdAt;
    const endDate = orders[orders.length - 1].createdAt;
    const months = getMonthDifference(startDate, endDate) || 1;

    const average = (totalP / months).toFixed();
    res.status(200).json(average);
  } catch (err) {
    return next(err);
  }
};

export const getCountOrder = async (req, res, next) => {
  try {
    const countOrder = await Order.countDocuments();
    res.status(200).json(countOrder);
  } catch (err) {
    next(err);
  }
};
