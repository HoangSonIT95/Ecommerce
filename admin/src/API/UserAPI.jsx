import axiosClient from './axiosClient';

const UserAPI = {
  getAllData: () => {
    const url = '/users';
    return axiosClient.get(url);
  },

  getDetailData: id => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  postSignUp: query => {
    const url = `/users/signup/${query}`;
    return axiosClient.post(url);
  },
  getCountUser: () => {
    const url = '/users/count';
    return axiosClient.get(url);
  },
};

export default UserAPI;
