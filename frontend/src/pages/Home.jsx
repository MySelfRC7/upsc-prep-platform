import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import '../styles/home.css';

function Home() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="home-container">
      <nav className="home-nav">
        <h1 className="logo">📚 UPSC Prep Platform</h1>
        <div className="nav-buttons">
          {user ? (
            <button onClick={() => navigate('/dashboard')} className="nav-btn primary">
              Dashboard
            </button>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="nav-btn">
                Login
              </button>
              <button onClick={() => navigate('/register')} className="nav-btn primary">
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      <main className="home-main">
        <section className="hero">
          <h2>Your Comprehensive UPSC Exam Preparation Platform</h2>
          <p>All your study materials, questions, and progress tracking in one place</p>
          {!user && (
            <button onClick={() => navigate('/register')} className="cta-btn">
              Get Started Free
            </button>
          )}
        </section>

        <section className="features">
          <h3>Features</h3>
          <div className="features-list">
            <div className="feature">
              <span className="feature-icon">📖</span>
              <h4>Study Materials</h4>
              <p>Upload and organize PDFs by subject</p>
            </div>
            <div className="feature">
              <span className="feature-icon">📰</span>
              <h4>Current Affairs</h4>
              <p>Latest news from major sources</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🎥</span>
              <h4>Videos</h4>
              <p>Host your educational videos</p>
            </div>
            <div className="feature">
              <span className="feature-icon">❓</span>
              <h4>Question Bank</h4>
              <p>Practice with past papers</p>
            </div>
            <div className="feature">
              <span className="feature-icon">📊</span>
              <h4>Progress Tracking</h4>
              <p>Monitor your performance</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🔖</span>
              <h4>Bookmarks</h4>
              <p>Save your favorites</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
