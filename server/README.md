# Mindspace Backend API

A comprehensive REST API for the Mindspace mental wellness application built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: JWT-based authentication with secure password hashing
- **Mood Tracking**: Create, read, update, and delete mood entries with analytics
- **Journal Management**: Personal journaling with search, tags, and statistics
- **Habit Tracking**: Create and track daily habits with streak counting
- **Meditation Sessions**: Track meditation sessions with progress and analytics
- **Data Analytics**: Comprehensive insights and visualizations for all features
- **Security**: Rate limiting, input validation, and security headers

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting
- **Password Hashing**: bcryptjs

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - User logout

### Mood Tracking
- `POST /api/mood` - Create mood entry
- `GET /api/mood` - Get mood entries (with filtering)
- `GET /api/mood/analytics` - Get mood analytics
- `PUT /api/mood/:id` - Update mood entry
- `DELETE /api/mood/:id` - Delete mood entry

### Journal
- `POST /api/journal` - Create journal entry
- `GET /api/journal` - Get journal entries (with search)
- `GET /api/journal/:id` - Get single journal entry
- `GET /api/journal/stats/overview` - Get journal statistics
- `PUT /api/journal/:id` - Update journal entry
- `DELETE /api/journal/:id` - Delete journal entry

### Habits
- `POST /api/habits` - Create habit
- `GET /api/habits` - Get user habits
- `GET /api/habits/:id` - Get single habit
- `POST /api/habits/:id/complete` - Mark habit as completed
- `GET /api/habits/:id/analytics` - Get habit analytics
- `PUT /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Delete habit

### Meditation
- `POST /api/meditation/sessions` - Start meditation session
- `GET /api/meditation/sessions/:id` - Get meditation session
- `PUT /api/meditation/sessions/:id/progress` - Update session progress
- `POST /api/meditation/sessions/:id/complete` - Complete session
- `GET /api/meditation/history` - Get meditation history
- `GET /api/meditation/stats` - Get meditation statistics
- `GET /api/meditation/recommendations` - Get personalized recommendations

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mindspace-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   - Local: `mongod`
   - Or use MongoDB Atlas cloud database

5. **Run the server**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mindspace
JWT_SECRET=your-super-secure-jwt-secret-key-here
CLIENT_URL=http://localhost:5173
```

## Database Schema

### User
- Personal information and preferences
- Authentication credentials
- Profile settings and timezone

### Mood
- Mood entries with intensity ratings
- Notes, tags, triggers, and activities
- Weather and sleep data correlation

### Journal
- Rich text journal entries
- Tags, mood association, and privacy settings
- Gratitude lists and goal tracking
- Word count and reading time analytics

### Habit
- Habit definitions with categories and frequencies
- Completion tracking with dates and counts
- Streak calculation and statistics
- Reminder settings and customization

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Configurable cross-origin requests
- **Security Headers**: Helmet.js security middleware

## API Response Format

### Success Response
```json
{
  "message": "Success message",
  "data": { ... },
  "pagination": { ... } // For paginated endpoints
}
```

### Error Response
```json
{
  "message": "Error message",
  "errors": [ ... ] // Validation errors if applicable
}
```

## Development

### Running Tests
```bash
npm test
```

### Code Formatting
```bash
npm run format
```

### Linting
```bash
npm run lint
```

## Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Use a secure JWT secret
3. Configure MongoDB Atlas or production database
4. Set up proper CORS origins
5. Configure reverse proxy (nginx)
6. Set up SSL certificates

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details