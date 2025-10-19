# 🧠 Mindspace - Mental Wellness Platform

A comprehensive full-stack mental wellness application built with React and Node.js, featuring mood tracking, journaling, meditation, and habit monitoring with a beautiful midnight indigo theme.

![Mindspace Preview](https://via.placeholder.com/800x400/0F1419/A5B4FC?text=Mindspace+Mental+Wellness+Platform)

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

### 🎨 Premium Design
- **Midnight Indigo Theme** - Sophisticated dark theme
- **Glassmorphism Effects** - Modern UI with backdrop blur
- **Responsive Design** - Works on all devices
- **Smooth Animations** - Premium feel with subtle transitions

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
```

## 🌐 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_DEV_MODE=false
```

### Backend (server/.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mindspace
JWT_SECRET=your-super-secure-jwt-secret-key-here
CLIENT_URL=http://localhost:5173
```

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Mood Tracking
- `POST /api/mood` - Create mood entry
- `GET /api/mood` - Get mood entries
- `GET /api/mood/analytics` - Get mood analytics
- `PUT /api/mood/:id` - Update mood entry
- `DELETE /api/mood/:id` - Delete mood entry

### Journal
- `POST /api/journal` - Create journal entry
- `GET /api/journal` - Get journal entries
- `GET /api/journal/stats/overview` - Get journal statistics
- `PUT /api/journal/:id` - Update journal entry
- `DELETE /api/journal/:id` - Delete journal entry

### Habits
- `POST /api/habits` - Create habit
- `GET /api/habits` - Get user habits
- `POST /api/habits/:id/complete` - Mark habit as completed
- `GET /api/habits/:id/analytics` - Get habit analytics
- `PUT /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Delete habit

### Meditation
- `POST /api/meditation/sessions` - Start meditation session
- `GET /api/meditation/history` - Get meditation history
- `GET /api/meditation/stats` - Get meditation statistics
- `GET /api/meditation/recommendations` - Get personalized recommendations

## 🎨 Design System

### Color Palette
- **Primary Background:** `#0F1419` (Almost black)
- **Secondary Background:** `#1A1F2E` (Dark slate)
- **Card Background:** `#252B3B` (Dark card)
- **Accent Primary:** `#4C6EF5` (Bright blue)
- **Accent Secondary:** `#7B61FF` (Purple)
- **Text Primary:** `#A5B4FC` (Soft lavender)
- **Border Color:** `#6366F1` (Blue border)

### Typography
- **Font Family:** SF Pro Display, system fonts
- **Headings:** 700-800 weight with gradient text
- **Body:** 400-500 weight with high contrast
- **Code:** SF Mono for monospace elements

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  profile: {
    age: Number,
    timezone: String,
    preferences: Object
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Mood Model
```javascript
{
  userId: ObjectId,
  mood: String (enum),
  intensity: Number (1-10),
  note: String,
  tags: [String],
  triggers: [String],
  activities: [String],
  date: Date
}
```

### Journal Model
```javascript
{
  userId: ObjectId,
  title: String,
  content: String,
  mood: String,
  tags: [String],
  isPrivate: Boolean,
  wordCount: Number,
  createdAt: Date
}
```

### Habit Model
```javascript
{
  userId: ObjectId,
  name: String,
  category: String,
  frequency: String,
  completions: [Object],
  streak: Object,
  statistics: Object
}
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

### Backend (Railway/Heroku)
```bash
# In server directory
git init
git add .
git commit -m "Initial commit"

# Deploy to Railway
railway login
railway link
railway up
```

### Database (MongoDB Atlas)
1. Create MongoDB Atlas account
2. Create new cluster
3. Get connection string
4. Update `MONGODB_URI` in environment variables

## 🧪 Testing

```bash
# Run frontend tests
npm test

# Run backend tests
cd server && npm test

# Run linting
npm run lint
```

## 📈 Performance Features

- **Code Splitting** - Lazy loading for optimal performance
- **Image Optimization** - Compressed assets
- **Caching** - Browser and API response caching
- **Minification** - Optimized production builds
- **Tree Shaking** - Remove unused code

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt with salt rounds
- **Input Validation** - Comprehensive request validation
- **Rate Limiting** - Prevent API abuse
- **CORS Protection** - Configurable cross-origin requests
- **Security Headers** - Helmet.js middleware

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React library
- **Chart.js** - For beautiful data visualizations
- **MongoDB** - For the flexible database solution
- **Vercel** - For seamless deployment platform

## 📞 Contact

- **Email:** your.email@example.com
- **LinkedIn:** [Your LinkedIn](https://linkedin.com/in/yourprofile)
- **Portfolio:** [Your Portfolio](https://yourportfolio.com)

---

**Built with ❤️ for mental wellness and personal growth**