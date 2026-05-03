# 🚀 Portfolio Deployment Guide

## 📋 Environment Variables Strategy

### 🔐 Critical: Email Credentials Must Be Set in Production

Your email system **requires** these environment variables to work in production:

```bash
# Email Configuration (REQUIRED for production)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
CONTACT_EMAIL=your-email@gmail.com
```

## 🌐 Hosting Options & Environment Variable Setup

### Option 1: Vercel (Recommended for Frontend)
1. **Frontend Deployment:**
   ```bash
   # Deploy frontend to Vercel
   vercel --prod
   ```

2. **Backend Environment Variables in Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all email credentials above
   - **IMPORTANT:** Also add `NEXT_PUBLIC_API_URL=https://your-server.com`

### Option 2: Railway/Heroku (Backend + Frontend)
1. **Backend Deployment:**
   ```bash
   # On Railway
   railway login
   railway link
   railway up
   
   # Set environment variables in Railway dashboard
   ```

2. **Required Environment Variables:**
   - All email credentials
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret
   - `FRONTEND_URL` - Your deployed frontend URL

### Option 3: DigitalOcean/AWS (Full Control)
1. **Server Setup:**
   ```bash
   # On your server
   git clone your-repo
   cd portfolio
   npm install
   cd server && npm install
   ```

2. **Environment Variables:**
   ```bash
   # Create .env file on server
   nano .env
   # Add all required variables
   ```

## 🔧 Production Email Setup

### Gmail App Password (Required)
1. **Enable 2-Factor Authentication:**
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" → "Other (Custom name)"
   - Enter "Portfolio Contact"
   - Copy the 16-character password (no spaces)

3. **Set Environment Variables:**
   ```bash
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=the-16-char-password
   ```

## 📁 Files to Keep vs. Exclude

### ✅ Keep in Git:
- `.env.example` - Template file
- `DEPLOYMENT.md` - This guide
- All source code

### ❌ Exclude from Git (already in .gitignore):
- `.env` - Actual credentials
- `server/.env` - Server credentials
- Any test files

## 🔄 Production Deployment Steps

### Step 1: Prepare Your Repository
```bash
# Your .gitignore already protects sensitive files
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### Step 2: Set Up Hosting
1. **Choose your hosting platform** (Vercel, Railway, DigitalOcean, etc.)
2. **Deploy the application**
3. **Configure environment variables** in hosting dashboard

### Step 3: Configure Environment Variables
In your hosting dashboard, add these variables:

#### Email System (REQUIRED):
```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
CONTACT_EMAIL=your-email@gmail.com
```

#### Database (REQUIRED):
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

#### Security (REQUIRED):
```bash
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=https://your-domain.com
```

#### Optional:
```bash
NODE_ENV=production
PORT=3001
```

## 🧪 Production Testing

After deployment, test your email system:

1. **Visit your deployed portfolio**
2. **Fill out the contact form**
3. **Check if you receive the email**
4. **Check server logs for any errors**

## 🚨 Troubleshooting

### Email Not Working in Production:
1. **Check environment variables** are set correctly
2. **Verify Gmail App Password** is correct
3. **Check server logs** for authentication errors
4. **Ensure 2FA is enabled** on Gmail account

### Common Issues:
- **EAUTH Error**: App password is incorrect or 2FA not enabled
- **ECONNECTION Error**: Firewall blocking SMTP ports
- **Missing Variables**: Environment variables not set in hosting dashboard

## 📞 Support

If you need help with deployment:
1. Check this guide first
2. Review hosting platform documentation
3. Test with the diagnostic endpoint: `GET /api/contact/diagnose`

---

## ✅ Deployment Checklist

- [ ] Gmail App Password generated
- [ ] Hosting platform selected
- [ ] Repository pushed to GitHub
- [ ] Environment variables configured in hosting
- [ ] Frontend deployed
- [ ] Backend deployed
- [ ] Email system tested
- [ ] Contact form working
- [ ] Database connected
- [ ] SSL certificate configured

Your portfolio is ready for production! 🎉
