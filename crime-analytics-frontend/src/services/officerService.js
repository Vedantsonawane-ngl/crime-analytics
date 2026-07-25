import axiosInstance from '../api/axiosInstance';

export const officerService = {
  async getAllOfficers() {
    const response = await axiosInstance.get('/officers');
    return response.data;
  },

  async getOfficerById(id) {
    const response = await axiosInstance.get(`/officers/${id}`);
    return response.data;
  },

  async createOfficer(data) {
    // data: { badgeNumber, name, department, rank, phoneNumber, email }
    const response = await axiosInstance.post('/officers', data);
    return response.data;
  },

  async updateOfficer(id, data) {
    const response = await axiosInstance.put(`/officers/${id}`, data);
    return response.data;
  },

  async deleteOfficer(id) {
    const response = await axiosInstance.delete(`/officers/${id}`);
    return response.data;
  }
};
