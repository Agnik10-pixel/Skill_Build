// API Client that automatically works with the backend endpoints

export const api = {
  fetchJSON: async (url: string, options?: RequestInit) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'API Error');
    return data;
  },

  // Auth
  login: (username: string) => api.fetchJSON('/api/auth/login', { method: 'POST', body: JSON.stringify({ username }) }),
  register: (username: string, role?: string) => api.fetchJSON('/api/auth/register', { method: 'POST', body: JSON.stringify({ username, role }) }),
  logout: () => api.fetchJSON('/api/auth/logout', { method: 'POST' }),
  getMe: () => api.fetchJSON('/api/me'),

  // App Data
  getSkills: () => api.fetchJSON('/api/skills'),
  getProgress: () => api.fetchJSON('/api/progress'),
  markModuleComplete: (skillId: string, moduleId: string) => api.fetchJSON('/api/progress', { method: 'POST', body: JSON.stringify({ skillId, moduleId }) }),
  submitTask: (skillId: string, taskDescription: string, content: string) => api.fetchJSON('/api/submissions', { method: 'POST', body: JSON.stringify({ skillId, taskDescription, content }) }),

  getLeaderboard: () => api.fetchJSON('/api/leaderboard'),
  getWeeklyTests: () => api.fetchJSON('/api/weekly-tests'),
  getCertificates: () => api.fetchJSON('/api/certificates'),
  getBadges: () => api.fetchJSON('/api/badges'),
  getFavorites: () => api.fetchJSON('/api/favorites'),
  toggleFavorite: (skillId: string) => api.fetchJSON('/api/favorites/toggle', { method: 'POST', body: JSON.stringify({ skillId }) }),

  // Admin
  getAdminStats: () => api.fetchJSON('/api/admin/stats'),
};
