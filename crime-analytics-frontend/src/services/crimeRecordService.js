import axiosInstance from '../api/axiosInstance';

export const crimeRecordService = {
  async getAllCrimeRecords() {
    const response = await axiosInstance.get('/crime-records');
    return response.data;
  },

  async createCrimeRecord(data) {
    // data: { crimeId, crimeType, city, state, location, crimeDate, status, severity, description }
    const response = await axiosInstance.post('/crime-records', data);
    return response.data;
  },

  async getByCity(city) {
    const response = await axiosInstance.get(`/crime-records/city/${encodeURIComponent(city)}`);
    return response.data;
  },

  async getByType(type) {
    const response = await axiosInstance.get(`/crime-records/type/${encodeURIComponent(type)}`);
    return response.data;
  },

  async getBySeverity(severity) {
    const response = await axiosInstance.get(`/crime-records/severity/${encodeURIComponent(severity)}`);
    return response.data;
  },

  async getByStatus(status) {
    const response = await axiosInstance.get(`/crime-records/status/${encodeURIComponent(status)}`);
    return response.data;
  }
};
