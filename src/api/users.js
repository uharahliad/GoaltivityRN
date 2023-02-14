import axios from './axios';

const users = {
  getUsersById: async (token, id) => {
    return await axios.get(`users/${id}`);
  },
  deleteUser: async id => {
    return await axios.delete(`users/${id}`);
  },
  updateUser: async (data, userId) => {
    console.log(111111, data);
    return await axios.put(`users/${userId}`, data);
  },
  uploadImage: async data => {
    return await axios.post('file/upload/users/avatar', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default users;
