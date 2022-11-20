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

  postSignUp: user => {
    const url = `/auth/register`;
    return axiosClient.post(url, user);
  },

  getCountUser: () => {
    const url = '/users/count';
    return axiosClient.get(url);
  },

  putUpdateUser: (userId, user) => {
    const url = `/users/${userId}`;
    return axiosClient.put(url, user);
  },

  deleteUser: userId => {
    const url = `/users/${userId}`;
    return axiosClient.delete(url);
  },

  logout: () => {
    const url = `/auth/logout`;
    return axiosClient.post(url);
  },

  login: data => {
    const url = `/auth/login`;
    return axiosClient.post(url, data);
  },
};

export default UserAPI;
