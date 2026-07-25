import axiosInstance from '../api/axiosInstance';

export const crimeService = {
  async getAllCrimes() {
    const response = await axiosInstance.get('/crimes');
    return response.data;
  },

  async getCrimeById(id) {
    const response = await axiosInstance.get(`/crimes/${id}`);
    return response.data;
  },

  async createCrime(data) {
    const response = await axiosInstance.post('/crimes', data);
    return response.data;
  },

  async updateCrime(id, data) {
    const response = await axiosInstance.put(`/crimes/${id}`, data);
    return response.data;
  },

  async deleteCrime(id) {
    const response = await axiosInstance.delete(`/crimes/${id}`);
    return response.data;
  }
};
