# 🚀 MargaDarshak – AI Powered Placement Preparation Platform

> A full-stack MERN application that helps students prepare for placements through structured learning paths, progress tracking, and AI-powered mentorship.

![Version](https://img.shields.io/badge/Version-V1-blue)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📖 Overview

MargaDarshak is an AI-assisted placement preparation platform designed to help students stay consistent during interview preparation.

Instead of using multiple websites for coding practice, aptitude preparation, interview questions, and mentorship, MargaDarshak provides everything in a single personalized dashboard.

Users can:

- Track their placement preparation
- Solve coding, aptitude and interview tasks
- Monitor progress through analytics
- Gain XP by completing tasks
- Receive AI-powered mentorship for doubts and interview preparation

---

# ✨ Features

## 🔐 Authentication

- Secure JWT Authentication
- User Registration & Login
- Protected Routes
- Persistent Login Session

---

## 📊 Dashboard

- Personalized welcome dashboard
- Overall placement progress
- XP tracking system
- Completed task statistics
- Continue Learning shortcut
- Category-wise progress

---

## 📚 Placement Roadmap

Students can practice three different categories:

- 💻 Coding Problems
- 🧠 Aptitude Questions
- 🎤 Interview Preparation

Features include:

- Search tasks
- Filter by difficulty
- Filter by company
- Filter by topic
- Topic-wise progress bars
- XP rewards
- Task completion tracking

---

## 🤖 AI Mentor

Integrated with OpenRouter LLM.

Students can ask questions about:

- Data Structures & Algorithms
- System Design
- DBMS
- Operating Systems
- Computer Networks
- HR Interview Questions
- Resume Guidance
- Placement Strategy

Responses are structured into:

- Step 1
- Step 2
- Step 3
- Tips

---

## 📈 Progress Analytics

- Overall completion percentage
- Topic-wise completion
- XP calculation
- Placement readiness visualization

---

# 🛠 Tech Stack

## Frontend

- React
- React Router
- Axios
- React Hot Toast
- CSS
- Vite

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

---

## AI

- OpenRouter API
- LLM-based Mentor

---

# 🏗 Architecture

```
Frontend (React)

        │

        ▼

REST APIs (Express)

        │

        ▼

Authentication (JWT)

        │

        ▼

MongoDB Atlas

        │

        ▼

OpenRouter LLM
```

---

# 📁 Project Structure

```
margadarshak

├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── data
│   └── server.js
│
├── frontend
│   ├── components
│   ├── context
│   ├── hooks
│   ├── pages
│   ├── routes
│   ├── services
│   ├── styles
│   └── App.jsx
│
└── README.md
```

---

# 🚀 Live Demo

### Frontend

https://margadarshak-two.vercel.app

### Backend

https://margadarshak-backend-jxyh.onrender.com

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/KPranav2609/margadarshak.git

cd margadarshak
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔐 Environment Variables

## Backend (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

OPENROUTER_API_KEY=your_api_key

CLIENT_URL=http://localhost:5173
```

---

## Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 📸 Screenshots

# Login
<img width="1917" height="1060" alt="image" src="https://github.com/user-attachments/assets/7bf46397-8a28-425a-bce8-2f2121186920" />

# Sign up
<img width="1916" height="906" alt="image" src="https://github.com/user-attachments/assets/17d2334a-6985-40ca-b125-0731a79f3e04" />

# Dashboard
<img width="1917" height="942" alt="image" src="https://github.com/user-attachments/assets/ab64fc55-07b8-4b06-a2c8-c8ef80fd733e" />

# Tasks
<img width="1917" height="979" alt="image" src="https://github.com/user-attachments/assets/e706fc9b-a189-4c9d-8a87-622ed07404dd" />

# Mentor
<img width="1918" height="940" alt="image" src="https://github.com/user-attachments/assets/bc0fcbc6-7505-485b-8bab-596456d9d79a" />

---

# 🚀 Version 1 Highlights

✅ JWT Authentication

✅ Dashboard Analytics

✅ Coding + Aptitude + Interview Tasks

✅ XP Tracking

✅ Topic Progress

✅ AI Mentor Integration

✅ Responsive UI

✅ Render Deployment

✅ Vercel Deployment

---

# 🔮 Roadmap (Version 2)

- 🧠 Personalized AI Placement Coach
- 📅 AI Daily Study Planner
- 💼 Company-Specific Placement Preparation
- 💡 Advanced AI Doubt Solver with Step-by-Step Explanations
- 📚 AI Revision Notes & Topic Summaries
- 🎯 AI Practice Question Generator

---

# 👨‍💻 Author

**Pranav Kollipara**

Information Technology Undergraduate

GitHub

https://github.com/KPranav2609

LinkedIn

(Add your LinkedIn URL)

---

# ⭐ Support

If you found this project helpful,

⭐ Star this repository

🍴 Fork it

📢 Share it with others

---

> Built with ❤️ to simplify placement preparation using AI.
