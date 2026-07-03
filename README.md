# 🤖 AI Resume Analyzer

An AI-powered Resume Analyzer built with the **MERN Stack** and **Google Gemini AI**. The application allows users to upload resumes, analyzes them using AI, calculates an ATS score, identifies strengths and weaknesses, suggests improvements, and stores previous analyses for future reference.

---

## 📌 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure API Access

### 📄 Resume Management
- Upload PDF Resume
- Upload DOCX Resume
- Extract Resume Text
- Store Resume in MongoDB
- Delete Uploaded Resume
- View Uploaded Resume History

### 🤖 AI Resume Analysis
- AI-powered Resume Analysis using Google Gemini
- ATS Score Calculation
- Professional Summary
- Strengths Detection
- Weakness Identification
- Missing Skills Detection
- Personalized Suggestions
- Stores Analysis History

### 📊 Dashboard
- Welcome Dashboard
- Resume Statistics
- Resume List
- Analysis History
- Responsive Design

---

# 🛠 Tech Stack

## Frontend
- React.js
- React Router DOM
- Tailwind CSS
- React Hook Form
- Axios
- Framer Motion
- Lucide React Icons
- Sonner Toast

## Backend
- Node.js
- Express.js
- JWT Authentication
- Multer
- Google Gemini AI SDK

## Database
- MongoDB
- Mongoose

---

# 📂 Project Structure

```
AI-Resume-Analyzer
│
├── client
│   ├── src
│   │
│   ├── components
│   │
│   ├── pages
│   │
│   ├── services
│   │
│   ├── context
│   │
│   ├── routes
│   │
│   └── App.jsx
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── router
│   ├── services
│   ├── uploads
│   ├── config
│   └── server.js
│
└── README.md
```

---

# 🚀 Application Workflow

```
User Login
      │
      ▼
Dashboard
      │
      ▼
Upload Resume
      │
      ▼
Extract Resume Text
      │
      ▼
Google Gemini AI
      │
      ▼
Generate Analysis
      │
      ▼
Save Analysis in MongoDB
      │
      ▼
View AI Report
      │
      ▼
Analysis History
```

---

# 🧠 AI Analysis Includes

- ATS Compatibility Score
- Resume Summary
- Strengths
- Weaknesses
- Missing Skills
- Suggestions for Improvement

---

# 📸 Screenshots

> Add screenshots here after completing the UI.

Example:

```
screenshots/
    login.png
    dashboard.png
    upload.png
    analysis.png
    history.png
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/ai-resume-analyzer.git
```

---

## Client

```bash
cd client
npm install
npm run dev
```

---

## Server

```bash
cd server
npm install
npm start
```

---

# 🔑 Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000

MONGO_DB_URL=your_mongodb_connection

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_google_gemini_api_key
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/signup` | Register User |
| POST | `/api/auth/login` | Login User |

---

## Resume

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/resume/upload` | Upload Resume |
| GET | `/api/resume/resumes` | Get User Resumes |
| DELETE | `/api/resume/:id` | Delete Resume |

---

## AI Analysis

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/analysis/:resumeId` | Analyze Resume |
| GET | `/api/analysis/analysisresult/:resumeId` | Get Analysis Result |
| GET | `/api/analysis/analysisresult` | Get Analysis History |

---

# Future Improvements

- Resume vs Job Description Matching
- AI Cover Letter Generator
- Resume PDF Report Download
- Resume Version Comparison
- AI Interview Question Generator
- AI Career Recommendation
- Multi-language Resume Analysis
- Dark Mode
- Admin Dashboard

---

# Learning Outcomes

This project helped me gain hands-on experience with:

- MERN Stack Development
- JWT Authentication
- Google Gemini AI Integration
- File Upload Handling
- MongoDB Relationships
- REST API Development
- Responsive UI Design
- State Management in React
- Prompt Engineering
- AI-powered Web Applications

---

# Author

**Yash Chandratre**

Full Stack Web Developer

📧 Email: chandratreyash@gmail.com

🔗 LinkedIn: *(Add your LinkedIn URL)*

💻 GitHub: *(Add your GitHub URL)*

🌐 Portfolio: *(Add your Portfolio URL)*

---

# License

This project is licensed under the MIT License.