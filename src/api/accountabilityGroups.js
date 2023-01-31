import axios from 'axios';
import {BACK_URL} from '@env';

console.log(BACK_URL, 1);

const accountabilityGroups = {
  getAccountabilityGroup: async token => {
    return await axios.get(BACK_URL + '/api/accountability_groups', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAccountabilityGroups: async token => {
    return await axios.get(BACK_URL + '/api/accountability_groups/all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  addUserAccountabilityGroup: async token => {
    return await axios.get(BACK_URL + '/api/accountability_groups/add', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createAccountabilityGroup: async (data, token) => {
    return await axios.post(BACK_URL + '/api/accountability_groups', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default accountabilityGroups;
