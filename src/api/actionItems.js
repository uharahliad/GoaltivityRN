import axios from './axios';

const actionItems = {
  createActionItem: async (data, token) => {
    return await axios.post('action_items', data);
  },
  register: async data => {
    return await axios.post('action_items', data);
  },
  getActionItems: async goalId => {
    return await axios.get(`action_items/${goalId}`);
  },
  updateActionItem: async (data, id) => {
    return await axios.put(`action_items/${id}`, data);
  },
  deleteActionItem: async id => {
    return await axios.delete(`action_items/${id}`);
  },
};

export default actionItems;
