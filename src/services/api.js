const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const DEV_MODE = import.meta.env.VITE_DEV_MODE === 'true' || import.meta.env.DEV;

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
    this.devMode = DEV_MODE;
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  // Get authentication headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    // In development mode, simulate API responses if backend is not available
    if (this.devMode && endpoint.includes('/auth/')) {
      return this.simulateAuthRequest(endpoint, options);
    }

    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      
      // In development mode, fall back to local storage simulation
      if (this.devMode && error.message.includes('fetch')) {
        console.warn('Backend not available, using local simulation');
        return this.simulateRequest(endpoint, options);
      }
      
      throw error;
    }
  }

  // Simulate API requests for development
  simulateAuthRequest(endpoint, options) {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    return delay(500).then(() => {
      if (endpoint === '/auth/login') {
        const { email, password } = JSON.parse(options.body || '{}');
        if (email && password) {
          const mockUser = {
            id: '1',
            name: email.split('@')[0],
            email: email
          };
          const mockToken = 'mock-jwt-token-' + Date.now();
          this.setToken(mockToken);
          return {
            message: 'Login successful',
            token: mockToken,
            user: mockUser
          };
        }
        throw new Error('Invalid credentials');
      }
      
      if (endpoint === '/auth/register') {
        const { name, email, password } = JSON.parse(options.body || '{}');
        if (name && email && password) {
          const mockUser = {
            id: '1',
            name: name,
            email: email
          };
          const mockToken = 'mock-jwt-token-' + Date.now();
          this.setToken(mockToken);
          return {
            message: 'User registered successfully',
            token: mockToken,
            user: mockUser
          };
        }
        throw new Error('Registration failed');
      }
      
      if (endpoint === '/auth/profile') {
        if (this.token) {
          return {
            user: {
              id: '1',
              name: 'Demo User',
              email: 'demo@mindspace.com'
            }
          };
        }
        throw new Error('Not authenticated');
      }
      
      return { message: 'Success' };
    });
  }

  simulateRequest(endpoint, options) {
    // For other endpoints, return empty data or use localStorage
    return Promise.resolve({
      message: 'Development mode - using local storage',
      data: []
    });
  }

  // Authentication methods
  async register(userData) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.setToken(null);
    }
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async updateProfile(profileData) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Mood tracking methods
  async createMoodEntry(moodData) {
    return this.request('/mood', {
      method: 'POST',
      body: JSON.stringify(moodData),
    });
  }

  async getMoodEntries(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/mood${queryString ? `?${queryString}` : ''}`);
  }

  async getMoodAnalytics(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/mood/analytics${queryString ? `?${queryString}` : ''}`);
  }

  async updateMoodEntry(id, moodData) {
    return this.request(`/mood/${id}`, {
      method: 'PUT',
      body: JSON.stringify(moodData),
    });
  }

  async deleteMoodEntry(id) {
    return this.request(`/mood/${id}`, { method: 'DELETE' });
  }

  // Journal methods
  async createJournalEntry(journalData) {
    return this.request('/journal', {
      method: 'POST',
      body: JSON.stringify(journalData),
    });
  }

  async getJournalEntries(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/journal${queryString ? `?${queryString}` : ''}`);
  }

  async getJournalEntry(id) {
    return this.request(`/journal/${id}`);
  }

  async getJournalStats() {
    return this.request('/journal/stats/overview');
  }

  async updateJournalEntry(id, journalData) {
    return this.request(`/journal/${id}`, {
      method: 'PUT',
      body: JSON.stringify(journalData),
    });
  }

  async deleteJournalEntry(id) {
    return this.request(`/journal/${id}`, { method: 'DELETE' });
  }

  // Habit tracking methods
  async createHabit(habitData) {
    return this.request('/habits', {
      method: 'POST',
      body: JSON.stringify(habitData),
    });
  }

  async getHabits(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/habits${queryString ? `?${queryString}` : ''}`);
  }

  async getHabit(id) {
    return this.request(`/habits/${id}`);
  }

  async completeHabit(id, completionData = {}) {
    return this.request(`/habits/${id}/complete`, {
      method: 'POST',
      body: JSON.stringify(completionData),
    });
  }

  async getHabitAnalytics(id, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/habits/${id}/analytics${queryString ? `?${queryString}` : ''}`);
  }

  async updateHabit(id, habitData) {
    return this.request(`/habits/${id}`, {
      method: 'PUT',
      body: JSON.stringify(habitData),
    });
  }

  async deleteHabit(id) {
    return this.request(`/habits/${id}`, { method: 'DELETE' });
  }

  // Meditation methods
  async startMeditationSession(sessionData) {
    return this.request('/meditation/sessions', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  }

  async getMeditationSession(id) {
    return this.request(`/meditation/sessions/${id}`);
  }

  async updateMeditationProgress(id, progressData) {
    return this.request(`/meditation/sessions/${id}/progress`, {
      method: 'PUT',
      body: JSON.stringify(progressData),
    });
  }

  async completeMeditationSession(id, completionData) {
    return this.request(`/meditation/sessions/${id}/complete`, {
      method: 'POST',
      body: JSON.stringify(completionData),
    });
  }

  async getMeditationHistory(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/meditation/history${queryString ? `?${queryString}` : ''}`);
  }

  async getMeditationStats(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/meditation/stats${queryString ? `?${queryString}` : ''}`);
  }

  async getMeditationRecommendations() {
    return this.request('/meditation/recommendations');
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export default new ApiService();