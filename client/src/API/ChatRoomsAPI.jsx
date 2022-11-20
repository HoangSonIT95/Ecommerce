import axiosClient from './axiosClient';

const ChatRoomsAPI = {
  getMessageByRoomId: roomId => {
    const url = `/chat/room/${roomId}`;
    return axiosClient.get(url);
  },

  createNewRoom: idUser => {
    const url = `/chat/newRoom`;
    return axiosClient.post(url, idUser);
  },

  addMessage: body => {
    const url = `/chat/addMessage`;
    return axiosClient.put(url, body);
  },
};

export default ChatRoomsAPI;
