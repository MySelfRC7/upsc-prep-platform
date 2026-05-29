const pool = require('../config/database');

// Get all subjects with topics
const getSubjectsWithTopics = async () => {
  try {
    const result = await pool.query(
      'SELECT s.id, s.name, s.description, json_agg(json_build_object(\'id\', t.id, \'name\', t.name, \'description\', t.description)) as topics FROM subjects s LEFT JOIN topics t ON s.id = t.subject_id GROUP BY s.id ORDER BY s.id'
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

// Get subject by ID with topics
const getSubjectWithTopics = async (subjectId) => {
  try {
    const result = await pool.query(
      'SELECT s.id, s.name, s.description, json_agg(json_build_object(\'id\', t.id, \'name\', t.name, \'description\', t.description)) as topics FROM subjects s LEFT JOIN topics t ON s.id = t.subject_id WHERE s.id = $1 GROUP BY s.id',
      [subjectId]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getSubjectsWithTopics,
  getSubjectWithTopics,
};
