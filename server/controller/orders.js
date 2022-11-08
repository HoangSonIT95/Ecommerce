import { createError } from '../middlewares/error.js';
import Order from '../models/Order.js';
import nodemailer from 'nodemailer';

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
    const orders = req.user.cart;
    const orderUser = orders.items;
    const htmlHead =
      '<table style="width:80%">' +
      '<tr style="border: 1px solid black;"><th style="border: 1px solid black;">Tên Sản Phẩm</th><th style="border: 1px solid black;">Hình Ảnh</th><th style="border: 1px solid black;">Giá</th><th style="border: 1px solid black;">Số Lượng</th><th style="border: 1px solid black;">Thành Tiền</th>';

    let htmlContent = '';

    for (let i = 0; i < orderUser.length; i++) {
      htmlContent +=
        '<tr>' +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
        orderUser[i].nameProduct +
        '</td>' +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;"><img src="' +
        orderUser[i].img +
        '" width="80" height="80"></td>' +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
        orderUser[i].priceProduct
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
        ' ' +
        'VNĐ</td>' +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
        orderUser[i].quantity +
        '</td>' +
        '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' +
        (parseInt(orderUser[i].priceProduct) * parseInt(orderUser[i].quantity))
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
      orders: orders,
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

export const getCountOrder = async (req, res, next) => {
  try {
    const countOrder = await Order.countDocuments();
    res.status(200).json(countOrder);
  } catch (err) {
    next(err);
  }
};
