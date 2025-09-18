

import axios from 'axios';

// backend URL
const API_URL = 'https://careerai-5ztl.onrender.com/api/userCareer';

const api = axios.create({
  baseURL: API_URL,
  // headers: { 'Authorization': `Bearer ${getToken()}` }
});

export const CareerRecommendation = {
  /**
   * Creates a new career recommendation in the database.
   * @param {object} recommendationData - The data for the new recommendation.
   */
  create: async (recommendationData) => {
    try {
      const response = await api.post('/', recommendationData);
      return response.data;
    } catch (error) {
      console.error("API Error - create recommendation:", error.response?.data || error.message);
      throw error;
    }
  },


  getAll: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("API Error - get recommendations:", error.response?.data || error.message);
      throw error;
    }
  },

  update: async (id, updateData) => {
    try {
      const response = await api.put(`/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error("API Error - update recommendation:", error.response?.data || error.message);
      throw error;
    }
  }
};
