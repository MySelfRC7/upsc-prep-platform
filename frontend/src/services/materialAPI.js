import api from './api';

export const materialAPI = {
  // Upload material
  uploadMaterial: (formData) => {
    return api.post('/materials/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Get all materials
  getMaterials: (topicId = null, limit = 10, offset = 0) => {
    const params = new URLSearchParams();
    if (topicId) params.append('topicId', topicId);
    params.append('limit', limit);
    params.append('offset', offset);
    return api.get(`/materials?${params.toString()}`);
  },

  // Search materials
  searchMaterials: (searchTerm) => {
    return api.get(`/materials?search=${encodeURIComponent(searchTerm)}`);
  },

  // Get material by ID
  getMaterialById: (id) => api.get(`/materials/${id}`),

  // Delete material
  deleteMaterial: (id) => api.delete(`/materials/${id}`),

  // Get subjects
  getSubjects: () => api.get('/materials/subjects/all'),
};

export default materialAPI;
