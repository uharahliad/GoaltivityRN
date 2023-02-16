import axios from './axios';
import {BACK_URL} from '@env';

const goalCategories = {
  getGoalCategories: async () => {
    return await axios.get('goal_categories');
  },
  getGoalCategory: async id => {
    return await axios.get(`goal_categories/${id}`);
  },
  createGoalCategory: async data => {
    return await axios.post('goal_categories', data);
  },
};

export default goalCategories;
