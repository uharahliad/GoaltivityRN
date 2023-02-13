import axios from './axios';

const goals = {
  getGoals: async userId => {
    return await axios.get(`goals/${userId}`);
  },
  getGoal: async (token, id) => {
    return await axios.get(`goals/${id}`);
  },
  createGoal: async data => {
    return await axios.post('goals', data);
  },
  updateGoal: async (data, token, id) => {
    return await axios.put(`goals/${id}`, data);
  },
  deleteGoal: async (token, id) => {
    return await axios.delete(`goals/${id}`);
  },
};

export default goals;
