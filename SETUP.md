# Full-Stack Portfolio Setup Guide

This guide will help you set up the complete portfolio website with both frontend and backend components.

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git
- Code editor (VS Code recommended)

## 🗂️ Project Structure

```
portfolio/
├── client/                 # Next.js frontend (current directory)
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   ├── public/
│   └── package.json
├── server/                 # Express.js backend
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   ├── uploads/
│   └── package.json
├── ARCHITECTURE.md         # Technical documentation
└── README.md              # Project overview
```

## 🚀 Quick Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Environment Configuration

#### Backend Environment
```bash
# Copy environment template
cp server/.env.example server/.env

# Edit server/.env with your configuration
```

#### Frontend Environment
```bash
# Copy environment template
cp .env.local.example .env.local

# Edit .env.local with your configuration
```

### 3. Database Setup

#### Option A: Local MongoDB
```bash
# Start MongoDB service
# For Windows: Start MongoDB service from Services
# For Mac: brew services start mongodb-community
# For Linux: sudo systemctl start mongod
```

#### Option B: MongoDB Atlas
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `server/.env`

### 4. Start the Applications

#### Start Backend Server
```bash
cd server
npm run dev
```
Backend will run on `http://localhost:5000`

#### Start Frontend Application
```bash
# Open new terminal
cd portfolio
npm run dev
```
Frontend will run on `http://localhost:3000`

## 🔧 Detailed Configuration

### Backend Environment Variables

Create `server/.env` with the following:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/portfolio

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
JWT_EXPIRE=7d

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
CONTACT_EMAIL=your_contact_email@gmail.com

# File Upload Configuration
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend Environment Variables

Create `.env.local` with the following:

```env
# Frontend Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_HOTJAR_ID=

# Map API (Optional)
NEXT_PUBLIC_MAPBOX_TOKEN=

# Recaptcha (Optional)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
```

## 🗄️ Database Initialization

The backend will automatically create the necessary collections when you start the server. However, you may want to create an initial admin user:

### Create Admin User

1. Start the backend server
2. Use a tool like Postman or curl to create an admin user:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Supernovaprime",
    "email": "admin@example.com",
    "password": "your_secure_password"
  }'
```

3. Manually update the user role to 'admin' in MongoDB:

```javascript
// Connect to MongoDB
use portfolio
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 📧 Email Setup (Optional)

To enable email notifications for contact forms:

1. For Gmail:
   - Enable 2-factor authentication
   - Create an App Password
   - Use the App Password in `EMAIL_PASS`

2. For other email providers:
   - Update `EMAIL_HOST` and `EMAIL_PORT` accordingly
   - Use appropriate credentials

## 🎨 Admin Dashboard

Access the admin dashboard at `http://localhost:3000/dashboard` after:

1. Creating an admin user
2. Logging in through the authentication system

### Admin Features:
- **Dashboard**: Overview with statistics
- **Projects**: Create, edit, delete projects
- **Skills**: Manage skills and categories
- **Experiences**: Add work/education history
- **Messages**: View and manage contact messages
- **Users**: User management
- **Settings**: Profile and configuration

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Backend Deployment (Heroku/Railway/Render)

1. Push your code to GitHub
2. Connect to your deployment platform
3. Set environment variables
4. Deploy

### MongoDB Deployment

1. Use MongoDB Atlas for production
2. Update connection string in backend environment
3. Configure IP whitelist

## 🔍 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/categories` - Get categories
- `POST /api/skills` - Create skill (admin)
- `PUT /api/skills/:id` - Update skill (admin)
- `DELETE /api/skills/:id` - Delete skill (admin)

### Contact
- `POST /api/contact` - Send message
- `GET /api/contact/messages` - Get messages (admin)
- `PUT /api/contact/messages/:id` - Update message status (admin)
- `DELETE /api/contact/messages/:id` - Delete message (admin)

### Users
- `GET /api/users/profile` - Get public profile
- `PUT /api/users/profile` - Update profile (admin)
- `POST /api/users/upload-avatar` - Upload avatar (admin)
- `GET /api/users/stats` - Get statistics (admin)

## 🛠️ Development Commands

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Backend
```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm test             # Run tests
```

## 🔒 Security Considerations

1. **JWT Secret**: Use a strong, unique JWT secret in production
2. **Environment Variables**: Never commit `.env` files
3. **Database Security**: Use MongoDB Atlas with IP whitelist
4. **Rate Limiting**: Configured to prevent abuse
5. **Input Validation**: All inputs are validated and sanitized
6. **File Uploads**: Limited to image files with size restrictions

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string in `.env`
   - Check network connectivity

2. **CORS Errors**
   - Ensure `FRONTEND_URL` matches your frontend URL
   - Check that backend is running

3. **Authentication Issues**
   - Verify JWT secret is set
   - Check token expiration
   - Ensure proper token format in headers

4. **File Upload Issues**
   - Create `uploads` directory in server folder
   - Check file size limits
   - Verify file type restrictions

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
```

## 📞 Support

If you encounter issues:

1. Check the console logs for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB is accessible
4. Check network connectivity between frontend and backend

## 🎉 Success!

Once everything is set up, you'll have:
- ✅ Modern portfolio website with advanced animations
- ✅ Full backend API with authentication
- ✅ Admin dashboard for content management
- ✅ Email notifications for contact forms
- ✅ Responsive design with dark mode
- ✅ Production-ready deployment configuration

Enjoy your new portfolio website! 🚀
