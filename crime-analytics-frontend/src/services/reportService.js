import axiosInstance from '../api/axiosInstance';

export const reportService = {
  async getAllReports() {
    const response = await axiosInstance.get('/reports');
    return response.data;
  },

  async getReportById(id) {
    const response = await axiosInstance.get(`/reports/${id}`);
    return response.data;
  },

  async createReport(data) {
    // data: { reportName, reportType, generatedBy, generatedAt, filePath, description }
    const response = await axiosInstance.post('/reports', data);
    return response.data;
  },

  async getByType(reportType) {
    const response = await axiosInstance.get(`/reports/type/${encodeURIComponent(reportType)}`);
    return response.data;
  },

  async getByGeneratedBy(generatedBy) {
    const response = await axiosInstance.get(`/reports/generated-by/${encodeURIComponent(generatedBy)}`);
    return response.data;
  },

  async updateReport(id, data) {
    const response = await axiosInstance.put(`/reports/${id}`, data);
    return response.data;
  },

  async deleteReport(id) {
    const response = await axiosInstance.delete(`/reports/${id}`);
    return response.data;
  }
};
