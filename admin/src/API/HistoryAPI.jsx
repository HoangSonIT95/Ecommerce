import axiosClient from './axiosClient';

const HistoryAPI = {
  getHistoryAPI: query => {
    const url = `/histories${query}`;
    return axiosClient.get(url);
  },

  getDetail: id => {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },

  getAll: () => {
    const url = '/orders/all';
    return axiosClient.get(url);
  },

  getEarningTotal: () => {
    const url = '/orders/earningTotal';
    return axiosClient.get(url);
  },

  getCountOrder: () => {
    const url = '/orders/countOrder';
    return axiosClient.get(url);
  },
};

export default HistoryAPI;
