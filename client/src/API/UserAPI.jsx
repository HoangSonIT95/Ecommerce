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

  postSignIn: user => {
    const url = '/auth/login';
    return axiosClient.post(url, user);
  },

  postSignUp: user => {
    const url = '/auth/register';
    return axiosClient.post(url, user);
  },

  postLogout: user => {
    const url = '/auth/register';
    return axiosClient.post(url, user);
  },
};

export default UserAPI;
