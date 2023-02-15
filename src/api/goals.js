import axios from './axios';

const goals = {
  getGoals: async userId => {
    return await axios.get(`goals/user/${userId}`);
  },
  getGoal: async (token, id) => {
    return await axios.get(`goals/${id}`);
  },
  createGoal: async data => {
    return await axios.post('goals', data);
  },
  updateGoal: async (goalId, data) => {
    return await axios.put(`goals/${goalId}`, data);
  },
  deleteGoal: async (token, id) => {
    return await axios.delete(`goals/${id}`);
  },
};

export default goals;
