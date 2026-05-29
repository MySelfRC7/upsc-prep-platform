const materialModel = require('../models/materialModel');
const subjectModel = require('../models/subjectModel');
const path = require('path');
const fs = require('fs');

// Upload material
const uploadMaterial = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'No file uploaded' });
    }

    const { title, description, topicId, materialType } = req.body;

    if (!title || !topicId) {
      // Delete uploaded file if validation fails
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ status: 'error', message: 'Title and topic ID are required' });
    }

    // Create relative file path
    const filePath = `/uploads/${req.file.filename}`;

    const material = await materialModel.createMaterial(
      req.userId,
      topicId,
      title,
      description || '',
      filePath,
      req.file.size,
      materialType || 'notes'
    );

    res.status(201).json({
      status: 'success',
      message: 'Material uploaded successfully',
      data: { material },
    });
  } catch (error) {
    // Delete file on error
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Upload error:', error);
    res.status(500).json({ status: 'error', message: 'Upload failed' });
  }
};

// Get all materials
const getMaterials = async (req, res) => {
  try {
    const { topicId, limit = 10, offset = 0, search } = req.query;

    let materials;
    if (search) {
      materials = await materialModel.searchMaterials(req.userId, search, limit, offset);
    } else {
      materials = await materialModel.getMaterials(req.userId, topicId || null, limit, offset);
    }

    res.status(200).json({
      status: 'success',
      data: { materials },
    });
  } catch (error) {
    console.error('Get materials error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch materials' });
  }
};

// Get material by ID
const getMaterialById = async (req, res) => {
  try {
    const { id } = req.params;

    const material = await materialModel.getMaterialById(id, req.userId);
    if (!material) {
      return res.status(404).json({ status: 'error', message: 'Material not found' });
    }

    // Increment view count
    await materialModel.incrementViews(id);

    res.status(200).json({
      status: 'success',
      data: { material },
    });
  } catch (error) {
    console.error('Get material error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch material' });
  }
};

// Delete material
const deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    const material = await materialModel.deleteMaterial(id, req.userId);
    if (!material) {
      return res.status(404).json({ status: 'error', message: 'Material not found' });
    }

    // Delete file from server
    const filePath = path.join(__dirname, '../../', material.file_path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.status(200).json({
      status: 'success',
      message: 'Material deleted successfully',
    });
  } catch (error) {
    console.error('Delete material error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to delete material' });
  }
};

// Get subjects
const getSubjects = async (req, res) => {
  try {
    const subjects = await subjectModel.getSubjectsWithTopics();
    res.status(200).json({
      status: 'success',
      data: { subjects },
    });
  } catch (error) {
    console.error('Get subjects error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch subjects' });
  }
};

module.exports = {
  uploadMaterial,
  getMaterials,
  getMaterialById,
  deleteMaterial,
  getSubjects,
};
