import axiosClient from './axiosClient';

const CommentAPI = {
  getCommentProduct: productId => {
    const url = `/comment/${productId}`;
    return axiosClient.get(url);
  },

  postCommentProduct: (productId, data) => {
    const url = `/comment/send/${productId}`;
    return axiosClient.post(url, data);
  },
};

export default CommentAPI;
