const pool = require('../config/database');
const { hashPassword, comparePasswords } = require('../utils/helpers');

// Create new user
const createUser = async (username, email, password, fullName) => {
  try {
    const hashedPassword = await hashPassword(password);
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash, full_name) VALUES ($1, $2, $3, $4) RETURNING id, username, email, full_name, created_at',
      [username, email, hashedPassword, fullName]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Find user by email
const findUserByEmail = async (email) => {
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Find user by username
const findUserByUsername = async (username) => {
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Find user by ID
const findUserById = async (id) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email, full_name, profile_pic, bio, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Verify password
const verifyPassword = async (email, password) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) return null;
    
    const isValid = await comparePasswords(password, user.password_hash);
    if (isValid) {
      return user;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByUsername,
  findUserById,
  verifyPassword,
};
