import axios from 'axios';
import {BACK_URL} from '@env';
import EncryptedStorage from 'react-native-encrypted-storage';

const axiosOptions = {
  baseURL: `${BACK_URL}/api/`,
};

const axiosInstance = axios.create(axiosOptions);

axiosInstance.interceptors.request.use(
  async reqConfig => {
    const jwt = await EncryptedStorage.getItem('token');

    if (jwt && reqConfig.headers !== null) {
      reqConfig.headers.Authorization = `Bearer ${jwt}`;
    }

    return reqConfig;
  },
  async err => Promise.reject(err),
);
export default axiosInstance;
