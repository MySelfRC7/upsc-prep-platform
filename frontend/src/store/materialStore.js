import { create } from 'zustand';
import materialAPI from '../services/materialAPI';

const useMaterialStore = create((set, get) => ({
  materials: [],
  subjects: [],
  isLoading: false,
  error: null,
  currentPage: 0,
  limit: 10,

  // Fetch subjects
  fetchSubjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await materialAPI.getSubjects();
      set({ subjects: response.data.data.subjects, isLoading: false });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch subjects';
      set({ error: message, isLoading: false });
    }
  },

  // Upload material
  uploadMaterial: async (file, title, description, topicId, materialType) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('topicId', topicId);
      formData.append('materialType', materialType);

      const response = await materialAPI.uploadMaterial(formData);
      
      // Refresh materials list
      await get().fetchMaterials();
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Upload failed';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  // Fetch materials
  fetchMaterials: async (topicId = null, page = 0) => {
    set({ isLoading: true, error: null, currentPage: page });
    try {
      const limit = get().limit;
      const offset = page * limit;
      const response = await materialAPI.getMaterials(topicId, limit, offset);
      set({ materials: response.data.data.materials, isLoading: false });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch materials';
      set({ error: message, isLoading: false });
    }
  },

  // Search materials
  searchMaterials: async (searchTerm) => {
    set({ isLoading: true, error: null });
    try {
      const response = await materialAPI.searchMaterials(searchTerm);
      set({ materials: response.data.data.materials, isLoading: false });
    } catch (error) {
      const message = error.response?.data?.message || 'Search failed';
      set({ error: message, isLoading: false });
    }
  },

  // Delete material
  deleteMaterial: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await materialAPI.deleteMaterial(id);
      await get().fetchMaterials();
      set({ isLoading: false });
    } catch (error) {
      const message = error.response?.data?.message || 'Delete failed';
      set({ error: message, isLoading: false });
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useMaterialStore;
