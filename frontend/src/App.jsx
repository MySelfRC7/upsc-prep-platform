import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <h1>UPSC Preparation Platform</h1>
        <p>Welcome to your comprehensive UPSC exam preparation platform</p>
        
        <Routes>
          {/* TODO: Add routes */}
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/materials" element={<div>Study Materials</div>} />
          <Route path="/current-affairs" element={<div>Current Affairs</div>} />
          <Route path="/videos" element={<div>Videos</div>} />
          <Route path="/questions" element={<div>Questions</div>} />
          <Route path="/progress" element={<div>Progress</div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
