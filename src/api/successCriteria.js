import axios from './axios';

const successCriteria = {
  getSuccessCriteria: async token => {
    return await axios.get('success_criteria');
  },
  getSuccessCriteriaItem: async id => {
    return await axios.get(`success_criteria/${id}`);
  },
  getCriteriaItemsByGoalId: async id => {
    return await axios.get(`goals/${id}/success_criteria`);
  },
  createCriteriaItems: async data => {
    console.log('DD', data);
    return await axios.post('success_criteria', data);
  },
  createSuccessCriteriaItem: async (data, token) => {
    return await axios.post('success_criteria/one', data);
  },
  deleteSuccessCriteria: async (token, id) => {
    return await axios.delete(`success_criteria/${id}`);
  },
};

export default successCriteria;
