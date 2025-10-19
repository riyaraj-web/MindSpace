# Mindspace Setup Guide

## Quick Start (Frontend Only)

The app can run in development mode without the backend:

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Access the app**
   - Open http://localhost:5173
   - You'll see "DEV MODE" indicator
   - Use any email/password to login (simulated)

## Full Stack Setup (Frontend + Backend)

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

4. **Start MongoDB**
   - Local: `mongod`
   - Or use MongoDB Atlas (cloud)

5. **Start the backend server**
   ```bash
   npm run dev
   ```
   Backend will run on http://localhost:5000

### Frontend Setup

1. **In the root directory, install dependencies**
   ```bash
   npm install
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```

3. **Start the frontend**
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:5173

## Environment Variables

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

## Features Available

### Without Backend (Dev Mode)
- ✅ UI/UX fully functional
- ✅ Local storage for data
- ✅ All components work
- ✅ Simulated authentication
- ❌ No real user accounts
- ❌ No data persistence across devices

### With Backend (Full Stack)
- ✅ Real user authentication
- ✅ Database persistence
- ✅ Multi-user support
- ✅ Data analytics
- ✅ Secure API endpoints
- ✅ Production ready

## Troubleshooting

### "Failed to fetch" Error
- Backend server is not running
- Check if MongoDB is running
- Verify environment variables
- App will fallback to dev mode automatically

### Port Conflicts
- Frontend: Change port in vite.config.js
- Backend: Change PORT in server/.env

### Database Connection Issues
- Ensure MongoDB is running
- Check MONGODB_URI in server/.env
- For MongoDB Atlas, whitelist your IP

## Development Commands

```bash
# Frontend only
npm run dev

# Backend only
cd server && npm run dev

# Install all dependencies
npm install && cd server && npm install

# Build for production
npm run build
```

## Tech Stack Summary

**Frontend:** React, Vite, React Router, Chart.js, CSS3
**Backend:** Node.js, Express, MongoDB, JWT, bcrypt
**Database:** MongoDB with Mongoose ODM
**Authentication:** JWT tokens with secure password hashing
**Deployment:** Ready for Vercel (frontend) + Railway/Heroku (backend)