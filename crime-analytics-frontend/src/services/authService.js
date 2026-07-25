import axiosInstance from '../api/axiosInstance';

export const authService = {
  async register(userData) {
    // POST /api/auth/register { name, email, password }
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  },

  async login(credentials) {
    // POST /api/auth/login { email, password } -> returns String JWT token
    const response = await axiosInstance.post('/auth/login', credentials);
    const token = response.data;
    if (token) {
      localStorage.setItem('crime_jwt_token', token);
      // Store basic user email info
      const userInfo = { email: credentials.email, name: credentials.email.split('@')[0] };
      localStorage.setItem('crime_user', JSON.stringify(userInfo));
    }
    return token;
  },

  logout() {
    localStorage.removeItem('crime_jwt_token');
    localStorage.removeItem('crime_user');
  },

  getCurrentUser() {
    const user = localStorage.getItem('crime_user');
    return user ? JSON.parse(user) : null;
  },

  getToken() {
    return localStorage.getItem('crime_jwt_token');
  },

  isAuthenticated() {
    return !!localStorage.getItem('crime_jwt_token');
  }
};
