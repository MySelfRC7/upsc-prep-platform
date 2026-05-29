-- UPSC Preparation Platform Database Schema

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    profile_pic VARCHAR(255),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subjects Table
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Topics Table
CREATE TABLE topics (
    id SERIAL PRIMARY KEY,
    subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    order_index INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Study Materials Table
CREATE TABLE study_materials (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    topic_id INTEGER REFERENCES topics(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_path VARCHAR(255) NOT NULL,
    file_size BIGINT,
    material_type VARCHAR(50),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    views INTEGER DEFAULT 0
);

-- Current Affairs Table
CREATE TABLE current_affairs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    source VARCHAR(100),
    source_url VARCHAR(500),
    category VARCHAR(100),
    article_date DATE,
    uploaded_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    is_manual BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    views INTEGER DEFAULT 0
);

-- Videos Table
CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    topic_id INTEGER REFERENCES topics(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_path VARCHAR(255) NOT NULL,
    file_size BIGINT,
    duration INTEGER,
    thumbnail VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    views INTEGER DEFAULT 0
);

-- Questions Table
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    option_a VARCHAR(500),
    option_b VARCHAR(500),
    option_c VARCHAR(500),
    option_d VARCHAR(500),
    correct_answer VARCHAR(1),
    explanation TEXT,
    difficulty_level VARCHAR(20),
    question_type VARCHAR(50),
    exam_year INTEGER,
    source VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Progress Table
CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    user_answer VARCHAR(1),
    is_correct BOOLEAN,
    time_spent INTEGER,
    attempt_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, question_id)
);

-- Bookmarks Table
CREATE TABLE bookmarks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_id INTEGER NOT NULL,
    item_type VARCHAR(50),
    bookmarked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, item_id, item_type)
);

-- Create indexes for better query performance
CREATE INDEX idx_materials_user_id ON study_materials(user_id);
CREATE INDEX idx_materials_topic_id ON study_materials(topic_id);
CREATE INDEX idx_videos_user_id ON videos(user_id);
CREATE INDEX idx_videos_topic_id ON videos(topic_id);
CREATE INDEX idx_questions_topic_id ON questions(topic_id);
CREATE INDEX idx_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_progress_question_id ON user_progress(question_id);
CREATE INDEX idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX idx_current_affairs_category ON current_affairs(category);
CREATE INDEX idx_subjects_name ON subjects(name);
