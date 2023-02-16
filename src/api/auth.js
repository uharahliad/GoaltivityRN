import axios from './axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const auth = {
  login: async data => {
    return await axios.post('auth/signin/local', data);
  },
  register: async data => {
    return await axios.post('auth/signup', data);
  },
  getMe: async () => {
    return await axios.get('auth/me');
  },
  async logout() {
    await EncryptedStorage.removeItem('token');
  },
  resetPassword: async body => {
    return await axios.put('auth/generate-password', body);
  },
  changePassword: async body => {
    return await axios.put('auth/password-update', body);
  },
  verifyEmail: async body => {
    return await axios.put('auth/verify-email', body);
  },
  getTwilioToken: async username => {
    return await axios.get(`/token/${username}`);
  },
  test: async () => {
    return await axios.get('auth/test');
  },
};

export default auth;
