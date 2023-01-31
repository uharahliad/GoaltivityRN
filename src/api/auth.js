import axios from 'axios';
import {BACK_URL} from '@env';

console.log(BACK_URL, 1);

const auth = {
  login: async data => {
    return await axios.post(BACK_URL + '/api/auth/signin/local', data);
  },
  register: async data => {
    return await axios.post(BACK_URL + '/api/auth/signup', data);
  },
  ValidateToken: async token => {
    return await axios.get(BACK_URL + '/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  resetPassword: async body => {
    return await axios.post(BACK_URL + '/api/auth/generate-password', body);
  },
  verifyEmail: async body => {
    return await axios.put(BACK_URL + '/api/auth/verify-email', body);
  },
  getTwilioToken: async username => {
    return await axios.get(BACK_URL + `/token/${username}`);
  },
  test: async () => {
    return await axios.get(BACK_URL + '/api/auth/test');
  },
};

export default auth;
