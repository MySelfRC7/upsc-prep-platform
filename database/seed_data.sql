-- Seed data for UPSC subjects and topics

INSERT INTO subjects (name, description) VALUES
('Polity & Governance', 'Indian Polity, Constitution, Government structure'),
('History', 'Ancient, Medieval, Modern & Contemporary History of India and World'),
('Geography', 'Physical Geography, Human Geography, Geomorphology'),
('Economy & Finance', 'Indian Economy, Inflation, Monetary & Fiscal Policy'),
('Science & Technology', 'Physics, Chemistry, Biology, Latest Technology'),
('Environment & Ecology', 'Climate Change, Biodiversity, Conservation'),
('International Relations', 'Geopolitics, International Organizations, Foreign Policy'),
('Ethics & Integrity', 'Values, Integrity, Ethical Decision Making'),
('Current Affairs', 'Latest news and developments');

-- Insert sample topics for Polity
INSERT INTO topics (subject_id, name, description, order_index) VALUES
(1, 'Constitutional Framework', 'Preamble, Fundamental Rights, Duties', 1),
(1, 'Union & State Structure', 'Executive, Legislative, Judicial', 2),
(1, 'Local Governance', 'Panchayati Raj, Municipal Corporations', 3);

-- Insert sample topics for History
INSERT INTO topics (subject_id, name, description, order_index) VALUES
(2, 'Ancient India', 'Vedic Period, Mauryan, Gupta Empire', 1),
(2, 'Medieval India', 'Delhi Sultanate, Mughal Empire', 2),
(2, 'Modern India', 'British Rule, Independence Movement', 3);

-- Insert sample topics for Geography
INSERT INTO topics (subject_id, name, description, order_index) VALUES
(3, 'Physical Geography', 'Mountains, Rivers, Climate, Soil', 1),
(3, 'Economic Geography', 'Agriculture, Industries, Trade', 2);

-- Insert sample topics for Economy
INSERT INTO topics (subject_id, name, description, order_index) VALUES
(4, 'Macro Economics', 'GDP, Inflation, Monetary Policy', 1),
(4, 'Banking & Finance', 'RBI, Commercial Banks, Markets', 2);

-- Insert sample topics for Science & Tech
INSERT INTO topics (subject_id, name, description, order_index) VALUES
(5, 'Information Technology', 'AI, Blockchain, Cybersecurity', 1),
(5, 'Space & Astronomy', 'ISRO, Space Missions', 2);

-- Insert sample topics for Environment
INSERT INTO topics (subject_id, name, description, order_index) VALUES
(6, 'Climate & Weather', 'Climate Change, Monsoon, El Niño', 1),
(6, 'Biodiversity', 'Flora, Fauna, Protected Areas', 2);

-- Insert sample topics for International Relations
INSERT INTO topics (subject_id, name, description, order_index) VALUES
(7, 'Bilateral Relations', 'India-China, India-Pakistan, USA relations', 1),
(7, 'International Organizations', 'UN, WHO, WTO, NATO', 2);

-- Insert sample questions
INSERT INTO questions (topic_id, question_text, option_a, option_b, option_c, option_d, correct_answer, difficulty_level, question_type) VALUES
(1, 'Who is known as the Father of the Indian Constitution?', 'Jawaharlal Nehru', 'Dr. Bhimrao Ambedkar', 'Rajendra Prasad', 'Sardar Patel', 'B', 'Easy', 'MCQ'),
(1, 'In which year was the Indian Constitution adopted?', '1947', '1949', '1950', '1951', 'B', 'Easy', 'MCQ'),
(2, 'The Mauryan Empire was founded by:', 'Ashoka', 'Chandragupta Maurya', 'Bindusara', 'Samrat Vikramaditya', 'B', 'Medium', 'MCQ');
