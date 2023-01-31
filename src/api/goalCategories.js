import axios from 'axios';
import {BACK_URL} from '@env';

console.log(BACK_URL, 1);

const goalCategories = {
  getGoalCategories: async token => {
    return await axios.get(BACK_URL + '/api/goal_categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getGoalCategory: async (token, id) => {
    return await axios.get(BACK_URL + `/api/goal_categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createGoalCategory: async (data, token) => {
    return await axios.post(BACK_URL + '/api/goal_categories', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default goalCategories;
