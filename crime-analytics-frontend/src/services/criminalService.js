import axiosInstance from '../api/axiosInstance';

export const criminalService = {
  async getAllCriminals() {
    const response = await axiosInstance.get('/criminals');
    return response.data;
  },

  async getCriminalById(id) {
    const response = await axiosInstance.get(`/criminals/${id}`);
    return response.data;
  },

  async createCriminal(data) {
    // data: { name, alias, gender, age, address, phoneNumber, criminalStatus, description }
    const response = await axiosInstance.post('/criminals', data);
    return response.data;
  },

  async updateCriminal(id, data) {
    const response = await axiosInstance.put(`/criminals/${id}`, data);
    return response.data;
  },

  async deleteCriminal(id) {
    const response = await axiosInstance.delete(`/criminals/${id}`);
    return response.data;
  }
};
