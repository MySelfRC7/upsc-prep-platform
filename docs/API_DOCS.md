# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <token>
```

## Response Format

All responses are JSON.

**Success Response:**
```json
{
  "status": "success",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "status": "error",
  "error": "Error message"
}
```

## Endpoints

### Authentication

#### Register User

```
POST /auth/register
Content-Type: application/json

{
  "username": "yourname",
  "email": "email@example.com",
  "password": "password123",
  "full_name": "Your Full Name"
}

Response: 201 Created
{
  "status": "success",
  "data": {
    "user": { ... },
    "token": "jwt_token"
  }
}
```

#### Login User

```
POST /auth/login
Content-Type: application/json

{
  "email": "email@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "status": "success",
  "data": {
    "user": { ... },
    "token": "jwt_token"
  }
}
```

### Study Materials

#### Get All Materials

```
GET /materials?subject=polity&topic=1&limit=10&offset=0
Authorization: Bearer <token>

Response: 200 OK
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "title": "Indian Constitution",
      "subject": "Polity",
      "topic": "Constitutional Framework",
      "file_path": "/uploads/materials/constitution.pdf",
      "uploaded_at": "2024-01-01"
    }
  ]
}
```

#### Upload Material

```
POST /materials/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- file: <PDF file>
- title: "Material Title"
- topic_id: 1
- material_type: "book"

Response: 201 Created
```

#### Delete Material

```
DELETE /materials/:id
Authorization: Bearer <token>

Response: 200 OK
```

### Current Affairs

#### Get All Articles

```
GET /current-affairs?category=polity&limit=20&offset=0
Authorization: Bearer <token>

Response: 200 OK
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "title": "New Policy Announcement",
      "category": "Polity",
      "source": "The Hindu",
      "published_date": "2024-01-20",
      "content": "..."
    }
  ]
}
```

#### Scrape Latest News

```
POST /current-affairs/scrape
Authorization: Bearer <token>

Response: 200 OK
{
  "status": "success",
  "data": {
    "articles_added": 15
  }
}
```

#### Add Manual Article

```
POST /current-affairs/manual
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Article Title",
  "content": "Article content",
  "category": "Polity",
  "source": "The Hindu"
}

Response: 201 Created
```

### Questions

#### Get Question Bank

```
GET /questions?subject=polity&difficulty=medium&limit=10&offset=0
Authorization: Bearer <token>

Response: 200 OK
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "question": "Who is the Father of Indian Constitution?",
      "options": ["A": "...", "B": "...", "C": "...", "D": "..."],
      "difficulty": "Easy",
      "topic": "Constitutional Framework"
    }
  ]
}
```

#### Submit Answer

```
POST /questions/attempt
Authorization: Bearer <token>
Content-Type: application/json

{
  "question_id": 1,
  "user_answer": "B",
  "time_spent": 30
}

Response: 200 OK
{
  "status": "success",
  "data": {
    "is_correct": true,
    "correct_answer": "B",
    "explanation": "..."
  }
}
```

### Progress

#### Get User Progress

```
GET /progress?subject=polity
Authorization: Bearer <token>

Response: 200 OK
{
  "status": "success",
  "data": {
    "total_attempted": 50,
    "correct": 35,
    "accuracy": 70,
    "avg_time": 45,
    "by_topic": [
      {
        "topic": "Constitutional Framework",
        "attempted": 20,
        "correct": 15,
        "accuracy": 75
      }
    ]
  }
}
```

### Bookmarks

#### Get Bookmarks

```
GET /bookmarks?type=question
Authorization: Bearer <token>

Response: 200 OK
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "item_id": 5,
      "item_type": "question",
      "title": "Question Title"
    }
  ]
}
```

#### Add Bookmark

```
POST /bookmarks/:item_id
Authorization: Bearer <token>
Content-Type: application/json

{
  "item_type": "question"
}

Response: 201 Created
```

#### Remove Bookmark

```
DELETE /bookmarks/:item_id
Authorization: Bearer <token>

Response: 200 OK
```

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Access denied |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal error |
