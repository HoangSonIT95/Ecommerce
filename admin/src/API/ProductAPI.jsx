import axiosClient from './axiosClient';

const ProductAPI = {
  getAPI: () => {
    const url = '/products';
    return axiosClient.get(url);
  },

  getCategory: query => {
    const url = `/products/category${query}`;
    return axiosClient.get(url);
  },

  getDetail: productId => {
    const url = `/products/${productId}`;
    return axiosClient.get(url);
  },

  getPagination: query => {
    const url = `/products/pagination${query}`;
    return axiosClient.get(url);
  },

  deleteProduct: productId => {
    const url = `/products/${productId}`;
    return axiosClient.delete(url);
  },

  postProduct: data => {
    const url = `/products`;
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateProduct: (productId, data) => {
    const url = `/products/${productId}`;
    return axiosClient.put(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default ProductAPI;
