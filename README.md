# 🧠 MindSpace

A comprehensive mental wellness platform that helps users track their mood, practice mindfulness, build healthy habits, and maintain a personal journal.

## ✨ Features

- **🎭 Mood Tracking** - Log and visualize your emotional patterns over time
- **📝 Digital Journal** - Private space for thoughts and reflections
- **🎯 Habit Tracker** - Build and maintain positive habits
- **🧘 Meditation & Breathing** - Guided exercises for mindfulness
- **🤖 AI Companion** - Get personalized insights and support
- **🎨 Collaborative Art** - Express yourself creatively
- **📖 Recovery Stories** - Read inspiring stories from the community
- **🎵 Mood-Based Music** - Curated playlists based on your emotions

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/riyaraj-web/MindSpace.git
cd MindSpace
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd server
npm install
cd ..
```

4. **Set up environment variables**

Create `.env` in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Mindspace
VITE_APP_VERSION=1.0.0
VITE_DEV_MODE=true
```

Create `server/.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mindspace
JWT_SECRET=your-super-secure-jwt-secret-key-here
CLIENT_URL=http://localhost:5173
```

5. **Start the development servers**

Frontend:
```bash
npm run dev
```

Backend (in a separate terminal):
```bash
cd server
npm start
```

6. **Open your browser**
```
http://localhost:5173
```

## 📁 Project Structure

```
MindSpace/
├── src/                      # Frontend source code
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── context/            # React context providers
│   ├── services/           # API services
│   ├── utils/              # Utility functions
│   └── assets/             # Images and static files
├── server/                  # Backend source code
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   └── server.js           # Server entry point
├── public/                  # Public assets
└── package.json            # Dependencies
```

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Chart.js** - Data visualization

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Rate limiting
- Input validation
- Helmet security headers

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Mood Tracking
- `POST /api/mood` - Create mood entry
- `GET /api/mood` - Get mood entries
- `GET /api/mood/analytics` - Get mood analytics
- `PUT /api/mood/:id` - Update mood entry
- `DELETE /api/mood/:id` - Delete mood entry

### Journal
- `POST /api/journal` - Create journal entry
- `GET /api/journal` - Get journal entries
- `GET /api/journal/:id` - Get specific entry
- `PUT /api/journal/:id` - Update entry
- `DELETE /api/journal/:id` - Delete entry

### Habits
- `POST /api/habits` - Create habit
- `GET /api/habits` - Get all habits
- `POST /api/habits/:id/complete` - Mark habit complete
- `GET /api/habits/:id/analytics` - Get habit analytics
- `PUT /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Delete habit

### Meditation
- `POST /api/meditation/sessions` - Start session
- `GET /api/meditation/history` - Get session history
- `GET /api/meditation/stats` - Get statistics
- `POST /api/meditation/sessions/:id/complete` - Complete session

## 🌐 Deployment

### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

### Backend (Vercel/Railway/Render)
- Set environment variables
- Deploy from `server/` directory
- Update `VITE_API_URL` in frontend

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Riya Raj**
- GitHub: [@riyaraj-web](https://github.com/riyaraj-web)

## 🙏 Acknowledgments

- Icons and images from various open-source projects
- Inspiration from mental wellness communities
- Contributors and testers

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

---

Made with ❤️ for mental wellness
