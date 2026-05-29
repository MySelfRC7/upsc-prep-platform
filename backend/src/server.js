const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'UPSC Prep Platform API' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Auth routes
app.use('/api/auth', authRoutes);

// TODO: Add other routes
// const materialsRoutes = require('./routes/materials');
// const currentAffairsRoutes = require('./routes/currentAffairs');
// const videosRoutes = require('./routes/videos');
// const questionsRoutes = require('./routes/questions');
// const progressRoutes = require('./routes/progress');
// const bookmarksRoutes = require('./routes/bookmarks');

// app.use('/api/materials', materialsRoutes);
// app.use('/api/current-affairs', currentAffairsRoutes);
// app.use('/api/videos', videosRoutes);
// app.use('/api/questions', questionsRoutes);
// app.use('/api/progress', progressRoutes);
// app.use('/api/bookmarks', bookmarksRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
