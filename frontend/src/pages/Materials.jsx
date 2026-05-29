import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useMaterialStore from '../store/materialStore';
import '../styles/materials.css';

function Materials() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const materials = useMaterialStore((state) => state.materials);
  const subjects = useMaterialStore((state) => state.subjects);
  const isLoading = useMaterialStore((state) => state.isLoading);
  const error = useMaterialStore((state) => state.error);
  const fetchSubjects = useMaterialStore((state) => state.fetchSubjects);
  const fetchMaterials = useMaterialStore((state) => state.fetchMaterials);
  const uploadMaterial = useMaterialStore((state) => state.uploadMaterial);
  const deleteMaterial = useMaterialStore((state) => state.deleteMaterial);
  const searchMaterials = useMaterialStore((state) => state.searchMaterials);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    topicId: '',
    materialType: 'notes',
    file: null,
  });
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchSubjects();
      fetchMaterials();
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!formData.file || !formData.title || !formData.topicId) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      await uploadMaterial(
        formData.file,
        formData.title,
        formData.description,
        formData.topicId,
        formData.materialType
      );
      setShowUploadModal(false);
      setFormData({
        title: '',
        description: '',
        topicId: '',
        materialType: 'notes',
        file: null,
      });
      alert('Material uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchMaterials(searchTerm);
    } else {
      fetchMaterials();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="materials-container">
      <nav className="materials-nav">
        <h1>📚 Study Materials</h1>
        <div className="nav-right">
          <span className="user-info">{user.fullName}</span>
          <button onClick={() => navigate('/dashboard')} className="nav-btn">Dashboard</button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <main className="materials-main">
        {error && <div className="error-message">{error}</div>}

        <div className="materials-header">
          <div>
            <h2>Your Study Materials</h2>
            <p>Organize and manage your PDF materials by subject</p>
          </div>
          <button onClick={() => setShowUploadModal(true)} className="upload-btn">
            ⬆️ Upload Material
          </button>
        </div>

        <div className="materials-controls">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                fetchMaterials();
              }}
              className="clear-btn"
            >
              Clear Search
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="loading">Loading materials...</div>
        ) : materials.length === 0 ? (
          <div className="empty-state">
            <p>No materials uploaded yet</p>
            <p>Click "Upload Material" to get started</p>
          </div>
        ) : (
          <div className="materials-grid">
            {materials.map((material) => (
              <div key={material.id} className="material-card">
                <div className="material-header">
                  <h3>{material.title}</h3>
                  <button
                    onClick={() => deleteMaterial(material.id)}
                    className="delete-btn"
                    title="Delete material"
                  >
                    🗑️
                  </button>
                </div>
                {material.subject_name && (
                  <p className="material-subject">{material.subject_name}</p>
                )}
                {material.topic_name && (
                  <p className="material-topic">{material.topic_name}</p>
                )}
                {material.description && (
                  <p className="material-description">{material.description}</p>
                )}
                <div className="material-meta">
                  <span className="material-type">{material.material_type}</span>
                  <span className="material-size">
                    {(material.file_size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                  <span className="material-views">👁️ {material.views}</span>
                </div>
                <a href={material.file_path} download className="download-btn">
                  📥 Download
                </a>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Upload Study Material</h2>
              <button onClick={() => setShowUploadModal(false)} className="close-btn">×</button>
            </div>

            <form onSubmit={handleUpload} className="upload-form">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Constitution Notes"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Add any notes about this material"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Subject & Topic *</label>
                <select
                  name="topicId"
                  value={formData.topicId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a topic...</option>
                  {subjects.map((subject) =>
                    (subject.topics || []).map((topic) => (
                      <option key={topic.id} value={topic.id}>
                        {subject.name} → {topic.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="form-group">
                <label>Material Type</label>
                <select
                  name="materialType"
                  value={formData.materialType}
                  onChange={handleInputChange}
                >
                  <option value="notes">Notes</option>
                  <option value="book">Book</option>
                  <option value="summary">Summary</option>
                  <option value="guide">Guide</option>
                </select>
              </div>

              <div className="form-group">
                <label>PDF File *</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                />
                {formData.file && (
                  <p className="file-info">Selected: {formData.file.name}</p>
                )}
              </div>

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? 'Uploading...' : 'Upload Material'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Materials;
