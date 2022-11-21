import axiosClient from './axiosClient';

const HistoryAPI = {
  getDetail: id => {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },

  updateOrder: (id, data) => {
    const url = `/orders/${id}`;
    return axiosClient.put(url, data);
  },

  getAll: () => {
    const url = '/orders/all';
    return axiosClient.get(url);
  },

  getEarningTotal: () => {
    const url = '/orders/earningTotal';
    return axiosClient.get(url);
  },

  getEarningAvg: () => {
    const url = '/orders/earningEvg';
    return axiosClient.get(url);
  },

  getCountOrder: () => {
    const url = '/orders/countOrder';
    return axiosClient.get(url);
  },
};

export default HistoryAPI;
