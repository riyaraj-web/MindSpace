# 🧠 Mindspace - Mental Wellness Platform

A comprehensive full-stack mental wellness application built with React and Node.js, featuring mood tracking, journaling, meditation, and habit monitoring with a beautiful midnight indigo theme.


## ✨ Features

### 🎯 Core Wellness Features
- **Mood Tracking** - Log daily moods with intensity ratings and notes
- **Personal Journaling** - Rich text journaling with tags and search
- **Meditation Center** - Guided sessions with progress tracking
- **Habit Tracker** - Build healthy habits with streak counting
- **Breathing Exercises** - Guided breathing with visual cues
- **AI Companion** - Personalized insights and recommendations

### 🔐 Authentication & Security
- **User Registration/Login** - Secure JWT-based authentication
- **Password Hashing** - bcrypt encryption for security
- **Session Management** - Persistent login sessions
- **Input Validation** - Comprehensive form validation

### 📊 Analytics & Insights
- **Mood Analytics** - Visualize mood patterns over time
- **Progress Tracking** - Monitor wellness journey progress
- **Data Visualization** - Interactive charts with Chart.js
- **Personalized Insights** - AI-powered recommendations


## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **React Router** - Client-side routing
- **Chart.js** - Data visualization
- **CSS3** - Custom styling with gradients and animations
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **Vite** - Build tool and dev server
- **Nodemon** - Auto-restart for development

## 🛠️ Installation & Setup

### Quick Start (Frontend Only)
```bash
# Clone the repository
git clone https://github.com/yourusername/mindspace.git
cd mindspace

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` and use any email/password to login in development mode.

### Full Stack Setup

#### Backend Setup
```bash
# Navigate to server directory
cd server

# Install backend dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your MongoDB connection string

# Start MongoDB (if running locally)
mongod

# Start backend server
npm run dev
```

#### Frontend Setup
```bash
# In root directory
npm install

# Create environment file
cp .env.example .env

# Start frontend
npm run dev
 
**Built with ❤️ for mental wellness and personal growth**
