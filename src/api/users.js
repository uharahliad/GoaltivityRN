import axios from 'axios';
import {BACK_URL} from '@env';

console.log(BACK_URL, 1);

const users = {
  getUsersById: async (token, id) => {
    return await axios.get(BACK_URL + `/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteUser: async (token, email) => {
    return await axios.delete(BACK_URL + `/api/users/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateUser: async (data, token, email) => {
    return await axios.put(BACK_URL + `/api/users/${email}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default users;
