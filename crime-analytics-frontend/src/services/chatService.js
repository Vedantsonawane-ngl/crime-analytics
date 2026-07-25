import axiosInstance from '../api/axiosInstance';

export const chatService = {
  async getAllChatHistory() {
    const response = await axiosInstance.get('/chat-history');
    return response.data;
  },

  async getChatHistoryById(id) {
    const response = await axiosInstance.get(`/chat-history/${id}`);
    return response.data;
  },

  async getChatHistoryByUserId(userId) {
    const response = await axiosInstance.get(`/chat-history/user/${userId}`);
    return response.data;
  },

  async createChatHistory(data) {
    // data: { userMessage, aiResponse, timestamp, userId }
    const response = await axiosInstance.post('/chat-history', data);
    return response.data;
  },

  async updateChatHistory(id, data) {
    const response = await axiosInstance.put(`/chat-history/${id}`, data);
    return response.data;
  },

  async deleteChatHistory(id) {
    const response = await axiosInstance.delete(`/chat-history/${id}`);
    return response.data;
  }
};
