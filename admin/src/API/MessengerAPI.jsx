import axiosClient from './axiosClient';

const MessengerAPI = {
  getRoomOpen: () => {
    const url = `/chat/roomOpen`;
    return axiosClient.get(url);
  },

  getMessage: room => {
    const url = `/chat/room/${room}`;
    return axiosClient.get(url);
  },

  postMessage: data => {
    const url = `/chat/addMessage`;
    return axiosClient.put(url, data);
  },
};

export default MessengerAPI;
