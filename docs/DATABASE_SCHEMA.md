# Database Schema Documentation

## Tables Overview

### 1. users
Stores user account information.

```sql
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
```

### 2. subjects
UPSC exam subjects.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| name | VARCHAR(100) | Subject name |
| description | TEXT | Details about subject |
| icon | VARCHAR(255) | Icon path |
| created_at | TIMESTAMP | Creation timestamp |

**Subjects:**
- Polity & Governance
- History
- Geography
- Economy & Finance
- Science & Technology
- Environment & Ecology
- International Relations
- Ethics & Integrity
- Current Affairs

### 3. topics
Sub-topics under each subject.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| subject_id | INTEGER | Foreign key to subjects |
| name | VARCHAR(100) | Topic name |
| description | TEXT | Topic description |
| order_index | INTEGER | Display order |
| created_at | TIMESTAMP | Creation timestamp |

### 4. study_materials
PDFs and study documents.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| user_id | INTEGER | User who uploaded |
| topic_id | INTEGER | Related topic |
| title | VARCHAR(255) | Material title |
| description | TEXT | Material details |
| file_path | VARCHAR(255) | File location |
| file_size | BIGINT | Size in bytes |
| material_type | VARCHAR(50) | book, notes, summary, guide |
| uploaded_at | TIMESTAMP | Upload time |
| views | INTEGER | View count |

### 5. current_affairs
News articles from various sources.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| title | VARCHAR(255) | Article title |
| content | TEXT | Article content |
| source | VARCHAR(100) | The Hindu, Indian Express, etc. |
| source_url | VARCHAR(500) | Original URL |
| category | VARCHAR(100) | Polity, Economy, International |
| article_date | DATE | Publication date |
| uploaded_by | INTEGER | User who added |
| is_manual | BOOLEAN | Manually added or scraped |
| created_at | TIMESTAMP | Addition timestamp |
| views | INTEGER | View count |

### 6. videos
Video resources.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| user_id | INTEGER | User who uploaded |
| topic_id | INTEGER | Related topic |
| title | VARCHAR(255) | Video title |
| description | TEXT | Video details |
| file_path | VARCHAR(255) | Video file location |
| file_size | BIGINT | Size in bytes |
| duration | INTEGER | Duration in seconds |
| thumbnail | VARCHAR(255) | Thumbnail image |
| uploaded_at | TIMESTAMP | Upload time |
| views | INTEGER | View count |

### 7. questions
Question bank (MCQs from past papers and mock tests).

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| topic_id | INTEGER | Related topic |
| question_text | TEXT | Question statement |
| option_a | VARCHAR(500) | Option A |
| option_b | VARCHAR(500) | Option B |
| option_c | VARCHAR(500) | Option C |
| option_d | VARCHAR(500) | Option D |
| correct_answer | VARCHAR(1) | A, B, C, or D |
| explanation | TEXT | Answer explanation |
| difficulty_level | VARCHAR(20) | Easy, Medium, Hard |
| question_type | VARCHAR(50) | MCQ, Assertion-Reason, etc. |
| exam_year | INTEGER | Year of exam |
| source | VARCHAR(100) | UPSC, State, etc. |
| created_at | TIMESTAMP | Creation timestamp |

### 8. user_progress
Tracks user's question attempts and performance.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| user_id | INTEGER | User ID |
| question_id | INTEGER | Question ID |
| user_answer | VARCHAR(1) | User's answer (A, B, C, D) |
| is_correct | BOOLEAN | Whether answer is correct |
| time_spent | INTEGER | Time in seconds |
| attempt_date | TIMESTAMP | When attempted |

**Note:** UNIQUE constraint ensures one attempt per user per question.

### 9. bookmarks
User's bookmarked items.

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| user_id | INTEGER | User ID |
| item_id | INTEGER | ID of bookmarked item |
| item_type | VARCHAR(50) | material, current_affairs, video, question |
| bookmarked_at | TIMESTAMP | When bookmarked |

## Indexes

For performance optimization:

```sql
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
```

## Relationships

```
users
  ├── study_materials (1:M)
  ├── videos (1:M)
  ├── user_progress (1:M)
  ├── bookmarks (1:M)
  └── current_affairs (1:M)

subjects
  └── topics (1:M)
      ├── study_materials (1:M)
      ├── videos (1:M)
      └── questions (1:M)

questions
  └── user_progress (1:M)
```
