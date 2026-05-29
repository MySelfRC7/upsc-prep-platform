import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import '../styles/dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h1>📚 UPSC Prep Platform</h1>
        <div className="nav-right">
          <span className="user-info">Welcome, {user.fullName}!</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <p>Hello, {user.fullName}! Ready to prepare for UPSC?</p>
        </div>

        <div className="features-grid">
          <div className="feature-card" onClick={() => navigate('/materials')}>
            <div className="feature-icon">📖</div>
            <h3>Study Materials</h3>
            <p>Upload and organize your study materials</p>
            <button className="feature-btn">Open →</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📰</div>
            <h3>Current Affairs</h3>
            <p>Stay updated with latest news</p>
            <button className="feature-btn">Coming Soon</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎥</div>
            <h3>Videos</h3>
            <p>Watch educational videos</p>
            <button className="feature-btn">Coming Soon</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">❓</div>
            <h3>Questions</h3>
            <p>Practice with question bank</p>
            <button className="feature-btn">Coming Soon</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Progress</h3>
            <p>Track your preparation progress</p>
            <button className="feature-btn">Coming Soon</button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔖</div>
            <h3>Bookmarks</h3>
            <p>Save your favorite resources</p>
            <button className="feature-btn">Coming Soon</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
