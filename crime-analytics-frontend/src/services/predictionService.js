import axiosInstance from '../api/axiosInstance';

export const predictionService = {
  async getAllPredictions() {
    const response = await axiosInstance.get('/predictions');
    return response.data;
  },

  async getPredictionById(id) {
    const response = await axiosInstance.get(`/predictions/${id}`);
    return response.data;
  },

  async createPrediction(data) {
    // data: { crimeId, crimeType, city, state, predictedRisk, confidenceScore, predictionDate, description }
    const response = await axiosInstance.post('/predictions', data);
    return response.data;
  },

  async getByCity(city) {
    const response = await axiosInstance.get(`/predictions/city/${encodeURIComponent(city)}`);
    return response.data;
  },

  async getByState(state) {
    const response = await axiosInstance.get(`/predictions/state/${encodeURIComponent(state)}`);
    return response.data;
  },

  async getByType(crimeType) {
    const response = await axiosInstance.get(`/predictions/type/${encodeURIComponent(crimeType)}`);
    return response.data;
  },

  async getByRisk(predictedRisk) {
    const response = await axiosInstance.get(`/predictions/risk/${encodeURIComponent(predictedRisk)}`);
    return response.data;
  },

  async updatePrediction(id, data) {
    const response = await axiosInstance.put(`/predictions/${id}`, data);
    return response.data;
  },

  async deletePrediction(id) {
    const response = await axiosInstance.delete(`/predictions/${id}`);
    return response.data;
  }
};
