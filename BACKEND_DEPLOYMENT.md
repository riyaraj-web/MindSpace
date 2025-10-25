# 🚀 Mindspace Backend Deployment Guide

## 🌟 Option 1: Vercel (Serverless Functions)

### ✅ Pros:
- Free tier with generous limits
- Automatic HTTPS and CDN
- Easy GitHub integration
- Serverless scaling

### ⚠️ Cons:
- 10-second function timeout on free tier
- Cold starts for infrequent requests
- Limited to serverless architecture

### 📋 Deployment Steps:

#### Step 1: Prepare Database
```bash
# Set up MongoDB Atlas (free tier)
# 1. Go to https://cloud.mongodb.com
# 2. Create free cluster
# 3. Get connection string
# 4. Add to Vercel environment variables
```

#### Step 2: Deploy to Vercel
```bash
cd server

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# MONGODB_URI=mongodb+srv://...
# JWT_SECRET=your-secret-key
# CLIENT_URL=https://your-frontend.vercel.app
# NODE_ENV=production
```

#### Step 3: Update Frontend API URLs
```javascript
// In src/services/api.js
const API_BASE_URL = 'https://mindspace-api.vercel.app/api';
```

---

## 🔥 Option 2: Railway (Recommended for Full Backend)

### ✅ Pros:
- Always-on server (no cold starts)
- Built-in database options
- Easy deployment
- Free tier available

### 📋 Deployment Steps:

#### Step 1: Deploy to Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Step 2: Add Environment Variables
```bash
railway variables set MONGODB_URI=mongodb+srv://...
railway variables set JWT_SECRET=your-secret-key
railway variables set CLIENT_URL=https://your-frontend.vercel.app
```

---

## 🐙 Option 3: Render (Free Tier)

### ✅ Pros:
- Free tier with always-on server
- Built-in database options
- Easy GitHub integration
- No cold starts

### 📋 Deployment Steps:

1. **Connect GitHub** to Render
2. **Create Web Service** from your backend repo
3. **Set Build Command**: `npm install`
4. **Set Start Command**: `npm start`
5. **Add Environment Variables** in dashboard

---

## ☁️ Option 4: Heroku (Paid)

### 📋 Deployment Steps:

```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create mindspace-api

# Set environment variables
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=your-secret-key
heroku config:set CLIENT_URL=https://your-frontend.vercel.app

# Deploy
git push heroku main
```

---

## 🗄️ Database Options

### Option 1: MongoDB Atlas (Recommended)
- **Free Tier**: 512MB storage
- **Setup**: https://cloud.mongodb.com
- **Connection**: Use connection string in MONGODB_URI

### Option 2: Railway PostgreSQL
- **Free Tier**: 1GB storage
- **Setup**: Automatic with Railway deployment
- **Note**: Requires changing from MongoDB to PostgreSQL

### Option 3: Render PostgreSQL
- **Free Tier**: 1GB storage
- **Setup**: Add PostgreSQL service in Render
- **Note**: Requires database migration

---

## 🔧 Environment Variables Setup

### Required Variables:
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mindspace
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
CLIENT_URL=https://mindspace-wellness.vercel.app
NODE_ENV=production
PORT=5000
```

### Setting Variables:

#### Vercel:
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable

#### Railway:
```bash
railway variables set MONGODB_URI=your-mongodb-uri
railway variables set JWT_SECRET=your-jwt-secret
```

#### Render:
1. Go to Render dashboard
2. Select your service
3. Go to Environment tab
4. Add variables

---

## 🔗 Frontend Integration

### Update API Base URL:

#### In `src/services/api.js`:
```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://mindspace-api.vercel.app/api'  // Your backend URL
  : 'http://localhost:5000/api';

export const api = {
  // ... your API methods
};
```

#### Or create environment variables:
```bash
# In frontend .env
VITE_API_URL=https://mindspace-api.vercel.app/api
```

```javascript
// In api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

---

## 🧪 Testing Deployment

### Health Check:
```bash
curl https://your-backend-url.vercel.app/api/health
```

### Expected Response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

### Test API Endpoints:
```bash
# Test authentication
curl -X POST https://your-backend-url/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'
```

---

## 🎯 Recommended Deployment Strategy

### For Resume/Portfolio:
1. **Frontend**: Deploy to Vercel (fast, free, professional URL)
2. **Backend**: Deploy to Railway or Render (always-on, reliable)
3. **Database**: MongoDB Atlas (free tier, managed)

### URLs Structure:
- **Frontend**: `https://mindspace-wellness.vercel.app`
- **Backend**: `https://mindspace-api.railway.app`
- **Database**: MongoDB Atlas cluster

---

## 🔒 Security Checklist

### ✅ Before Deployment:
- [ ] Strong JWT secret (32+ characters)
- [ ] CORS configured for your frontend domain
- [ ] Rate limiting enabled
- [ ] Helmet security headers
- [ ] Environment variables set
- [ ] Database connection secured
- [ ] API endpoints tested

### ✅ After Deployment:
- [ ] Health check endpoint working
- [ ] All API routes accessible
- [ ] Frontend can connect to backend
- [ ] Authentication flow working
- [ ] Database operations successful

---

## 🎉 Success!

Once deployed, you'll have:
- ✅ **Professional API** with custom domain
- ✅ **Scalable backend** handling requests
- ✅ **Secure authentication** system
- ✅ **Database integration** working
- ✅ **Full-stack application** live and functional

**Perfect for showcasing your backend development skills!** 🚀

---

## 🆘 Troubleshooting

### Common Issues:

#### 1. CORS Errors:
```javascript
// Update CORS in server.js
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

#### 2. Database Connection:
- Check MongoDB Atlas IP whitelist (allow all: 0.0.0.0/0)
- Verify connection string format
- Ensure database user has proper permissions

#### 3. Environment Variables:
- Double-check all required variables are set
- Verify no typos in variable names
- Ensure JWT_SECRET is long enough

#### 4. Function Timeouts (Vercel):
- Optimize database queries
- Add connection pooling
- Consider upgrading to Pro plan for longer timeouts