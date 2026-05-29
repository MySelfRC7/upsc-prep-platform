// Helper functions for the application

const generateToken = (userId) => {
  const jwt = require('jsonwebtoken');
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || '7d',
  });
};

const hashPassword = async (password) => {
  const bcrypt = require('bcryptjs');
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePasswords = async (password, hash) => {
  const bcrypt = require('bcryptjs');
  return bcrypt.compare(password, hash);
};

module.exports = {
  generateToken,
  hashPassword,
  comparePasswords,
};
