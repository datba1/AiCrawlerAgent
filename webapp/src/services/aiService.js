import axios from 'axios';

const API_BASE_URL = 'http://localhost:5168/api'; // Adjust based on your backend port

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const aiService = {
  /**
   * Execute research on a specific topic.
   * @param {string} topic 
   */
  async research(topic) {
    const response = await apiClient.get('/research', { params: { topic } });
    return response.data;
  },

  /**
   * Search for information.
   * @param {string} query 
   */
  async search(query) {
    const response = await apiClient.get('/search', { params: { query } });
    return response.data;
  },

  /**
   * Scrape a specific URL.
   * @param {string} url 
   */
  async scrape(url) {
    const response = await apiClient.get('/scrape', { params: { url } });
    return response.data;
  },
};
