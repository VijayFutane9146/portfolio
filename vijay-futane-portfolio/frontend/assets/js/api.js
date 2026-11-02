// API Client for Vijay Futane's Portfolio Web Application

const API_BASE = '/api';

const api = {
  // Helper for requests
  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = localStorage.getItem('portfolio_admin_token');
    if (token && !options.noAuth) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: Request failed`);
      }
      return data;
    } catch (err) {
      console.error(`[API Error] ${endpoint}:`, err);
      throw err;
    }
  },

  // Projects
  async getProjects(category = null) {
    const q = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    return this.request(`/projects${q}`);
  },

  async getProject(id) {
    return this.request(`/projects/${id}`);
  },

  async createProject(projectData) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  },

  async updateProject(id, projectData) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  },

  async deleteProject(id) {
    return this.request(`/projects/${id}`, {
      method: 'DELETE',
    });
  },

  // Skills
  async getSkills(grouped = false) {
    return this.request(`/skills?grouped=${grouped}`);
  },

  async createSkill(skillData) {
    return this.request('/skills', {
      method: 'POST',
      body: JSON.stringify(skillData),
    });
  },

  async updateSkill(id, skillData) {
    return this.request(`/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(skillData),
    });
  },

  async deleteSkill(id) {
    return this.request(`/skills/${id}`, {
      method: 'DELETE',
    });
  },

  // Education & Experience
  async getEducation(type = null) {
    const q = type ? `?type=${encodeURIComponent(type)}` : '';
    return this.request(`/education${q}`);
  },

  async createEducation(eduData) {
    return this.request('/education', {
      method: 'POST',
      body: JSON.stringify(eduData),
    });
  },

  async updateEducation(id, eduData) {
    return this.request(`/education/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eduData),
    });
  },

  async deleteEducation(id) {
    return this.request(`/education/${id}`, {
      method: 'DELETE',
    });
  },

  // Contacts
  async submitContact(formData) {
    return this.request('/contacts', {
      method: 'POST',
      body: JSON.stringify(formData),
      noAuth: true,
    });
  },

  async getContacts(status = null) {
    const q = status && status !== 'All' ? `?status=${encodeURIComponent(status)}` : '';
    return this.request(`/contacts${q}`);
  },

  async updateContactStatus(id, status) {
    return this.request(`/contacts/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  async deleteContact(id) {
    return this.request(`/contacts/${id}`, {
      method: 'DELETE',
    });
  },

  // Stats
  async getStats() {
    return this.request('/stats');
  },

  // Authentication
  async login(username, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      noAuth: true,
    });
  },

  async getMe() {
    return this.request('/auth/me');
  },

  async changePassword(current_password, new_password) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ current_password, new_password }),
    });
  },
};

window.portfolioApi = api;
