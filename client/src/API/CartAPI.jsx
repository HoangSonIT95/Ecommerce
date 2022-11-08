import axiosClient from './axiosClient';

const CartAPI = {
  getCarts: query => {
    const url = `/carts`;
    return axiosClient.get(url);
  },

  postAddToCart: query => {
    const url = `/carts/add${query}`;
    return axiosClient.post(url);
  },

  deleteToCart: productId => {
    const url = `/carts/deleteCart/${productId}`;
    return axiosClient.delete(url);
  },

  putToCart: query => {
    const url = `/carts/update${query}`;
    return axiosClient.put(url);
  },
};

export default CartAPI;
