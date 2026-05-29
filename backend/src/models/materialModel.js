const pool = require('../config/database');

// Create new material
const createMaterial = async (userId, topicId, title, description, filePath, fileSize, materialType) => {
  try {
    const result = await pool.query(
      'INSERT INTO study_materials (user_id, topic_id, title, description, file_path, file_size, material_type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [userId, topicId, title, description, filePath, fileSize, materialType]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Get all materials with filters
const getMaterials = async (userId, topicId = null, limit = 10, offset = 0) => {
  try {
    let query = 'SELECT sm.*, t.name as topic_name, s.name as subject_name FROM study_materials sm LEFT JOIN topics t ON sm.topic_id = t.id LEFT JOIN subjects s ON t.subject_id = s.id WHERE sm.user_id = $1';
    const params = [userId];

    if (topicId) {
      query += ' AND sm.topic_id = $2';
      params.push(topicId);
    }

    query += ' ORDER BY sm.uploaded_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limit, offset);

    const result = await pool.query(query, params);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

// Get material by ID
const getMaterialById = async (id, userId) => {
  try {
    const result = await pool.query(
      'SELECT sm.*, t.name as topic_name, s.name as subject_name FROM study_materials sm LEFT JOIN topics t ON sm.topic_id = t.id LEFT JOIN subjects s ON t.subject_id = s.id WHERE sm.id = $1 AND sm.user_id = $2',
      [id, userId]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Delete material
const deleteMaterial = async (id, userId) => {
  try {
    const result = await pool.query(
      'DELETE FROM study_materials WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Increment view count
const incrementViews = async (id) => {
  try {
    const result = await pool.query(
      'UPDATE study_materials SET views = views + 1 WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Search materials
const searchMaterials = async (userId, searchTerm, limit = 10, offset = 0) => {
  try {
    const result = await pool.query(
      'SELECT sm.*, t.name as topic_name, s.name as subject_name FROM study_materials sm LEFT JOIN topics t ON sm.topic_id = t.id LEFT JOIN subjects s ON t.subject_id = s.id WHERE sm.user_id = $1 AND (sm.title ILIKE $2 OR sm.description ILIKE $2) ORDER BY sm.uploaded_at DESC LIMIT $3 OFFSET $4',
      [userId, `%${searchTerm}%`, limit, offset]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createMaterial,
  getMaterials,
  getMaterialById,
  deleteMaterial,
  incrementViews,
  searchMaterials,
};
