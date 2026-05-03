# Professional Portfolio Website

A full-stack, modern portfolio website built with Next.js 15, Express.js, and MongoDB featuring advanced animations, admin dashboard, and a beautiful violet ray color scheme.

## 🚀 Features

### Frontend
- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Advanced Animations**: Framer Motion, scroll-triggered effects, parallax
- **Dark Mode**: System preference detection with toggle
- **Responsive Design**: Mobile-first approach
- **Interactive Components**: Hover effects, micro-interactions
- **Contact Form**: Form validation with toast notifications
- **SEO Optimized**: Meta tags and structured data

### Backend
- **RESTful API**: Express.js with comprehensive endpoints
- **Authentication**: JWT-based auth system
- **Database**: MongoDB with Mongoose ODM
- **File Uploads**: Image upload functionality
- **Email Service**: Contact form notifications
- **Security**: Rate limiting, CORS, input validation
- **Admin Dashboard**: Full content management system

## 🏗️ Architecture

This is a complete full-stack application with:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (Next.js)     │◄──►│   (Express)     │◄──►│  (MongoDB)      │
│                 │    │                 │    │                 │
│ • Portfolio UI  │    │ • REST API      │    │ • Projects      │
│ • Animations    │    │ • Auth          │    │ • Skills        │
│ • Dark Mode     │    │ • File Upload   │    │ • Experiences   │
│ • Contact Form  │    │ • Email Service │    │ • Messages      │
│ • Admin Panel   │    │ • Security      │    │ • Users         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎨 Design System

- **Color Palette**: Violet Ray (11 shades from #f5e5ff to #150024)
- **Typography**: Inter, Space Mono, Cal Sans fonts
- **Animations**: Smooth transitions and micro-interactions
- **Components**: Reusable UI components with consistent styling

## 📁 Project Structure

```
portfolio/
├── client/                 # Next.js frontend (current directory)
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   │   ├── (dashboard)/ # Admin dashboard routes
│   │   │   ├── globals.css # Global styles
│   │   │   ├── layout.tsx  # Root layout
│   │   │   └── page.tsx    # Home page
│   │   ├── components/     # React components
│   │   │   ├── Header.tsx  # Navigation header
│   │   │   ├── Footer.tsx  # Footer
│   │   │   ├── ThemeProvider.tsx # Theme context
│   │   │   └── sections/   # Page sections
│   │   │       ├── Hero.tsx # Hero section
│   │   │       ├── About.tsx # About section
│   │   │       ├── Projects.tsx # Projects showcase
│   │   │       ├── Skills.tsx # Skills section
│   │   │       └── Contact.tsx # Contact section
│   │   └── lib/           # Utilities and API client
│   │       └── api.ts     # API client
│   ├── public/            # Static assets
│   │   ├── logo.svg       # Logo
│   │   └── Logo.png       # Logo PNG
│   └── package.json       # Frontend dependencies
├── server/                # Express.js backend
│   ├── src/
│   │   ├── models/        # MongoDB models
│   │   │   ├── User.js    # User model
│   │   │   ├── Project.js # Project model
│   │   │   ├── Skill.js   # Skill model
│   │   │   ├── Experience.js # Experience model
│   │   │   └── Message.js # Message model
│   │   ├── routes/        # API routes
│   │   │   ├── auth.js    # Authentication routes
│   │   │   ├── projects.js # Project routes
│   │   │   ├── skills.js  # Skill routes
│   │   │   ├── experiences.js # Experience routes
│   │   │   ├── contact.js # Contact routes
│   │   │   └── users.js   # User routes
│   │   └── middleware/    # Express middleware
│   │       └── auth.js    # Authentication middleware
│   ├── uploads/           # File upload directory
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── ARCHITECTURE.md        # Detailed architecture documentation
├── SETUP.md              # Detailed setup instructions
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas account)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
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
   ```bash
   # Backend
   cp server/.env.example server/.env
   
   # Frontend
   cp .env.local.example .env.local
   ```

5. **Start MongoDB**
   ```bash
   # Local MongoDB
   # Start MongoDB service
   
   # Or use MongoDB Atlas
   # Update MONGODB_URI in server/.env
   ```

6. **Run the applications**
   ```bash
   # Start backend (terminal 1)
   cd server
   npm run dev
   
   # Start frontend (terminal 2)
   cd portfolio
   npm run dev
   ```

7. **Open your browser**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000/api](http://localhost:5000/api)
   - Admin Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

## 📖 Detailed Setup

For comprehensive setup instructions, including:
- Environment configuration
- Database setup
- Email configuration
- Admin user creation
- Deployment instructions

👉 **See [SETUP.md](./SETUP.md)**

## 📝 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend
```bash
cd server
npm run dev    # Start development server with nodemon
npm start      # Start production server
npm test       # Run tests
```

## 🎯 Sections

### Hero Section
- Animated background with floating particles
- Magnetic cursor effect
- Text reveal animations
- Social media links
- Call-to-action buttons

### About Section
- Personal introduction
- Statistics with animated counters
- Skills overview
- Professional summary

### Projects Section
- Filterable project gallery
- Project cards with hover effects
- Technology tags
- Live demo and GitHub links
- Featured projects highlighting

### Skills Section
- Categorized skill display
- Animated progress bars
- Technology icons
- Interactive category tabs

### Contact Section
- Contact form with validation
- Social media links
- Contact information
- Toast notifications

## 🎨 Customization

### Colors
The violet ray color palette is defined in `tailwind.config.js` and `globals.css`. You can customize the colors by modifying these files.

### Content
Update the content in each section component:
- Personal information in `Hero.tsx` and `About.tsx`
- Projects in `Projects.tsx`
- Skills in `Skills.tsx`
- Contact details in `Contact.tsx`

### Logo
Replace the logo files in the `public/` directory:
- `logo.svg` - Scalable vector logo
- `Logo.png` - High-resolution PNG logo

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- GitHub Pages
- AWS Amplify
- DigitalOcean

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1920x1080 and above)
- Tablet (768x1024)
- Mobile (375x667 and above)

## 🌟 Features Implemented

### Frontend ✅
- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS with custom violet ray palette
- Dark mode with system preference detection
- Advanced animations with Framer Motion
- Scroll-triggered animations
- Interactive components and micro-interactions
- Contact form with validation
- Responsive design
- SEO optimization
- Performance optimization

### Backend ✅
- Express.js RESTful API
- MongoDB database with Mongoose ODM
- JWT authentication system
- File upload functionality
- Email service integration
- Rate limiting and security
- Input validation and sanitization
- CORS configuration
- Error handling middleware

### Admin Dashboard ✅
- Full content management system
- Project management
- Skills management
- Experience management
- Message management
- User management
- Statistics and analytics
- Profile management

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Content Management
- `GET/POST/PUT/DELETE /api/projects` - Project CRUD
- `GET/POST/PUT/DELETE /api/skills` - Skills CRUD
- `GET/POST/PUT/DELETE /api/experiences` - Experience CRUD
- `POST /api/contact` - Send contact message
- `GET /api/contact/messages` - Get messages (admin)

### User Management
- `GET /api/users/profile` - Get public profile
- `PUT /api/users/profile` - Update profile (admin)
- `POST /api/users/upload-avatar` - Upload avatar
- `GET /api/users/stats` - Get statistics

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy automatically

### Backend (Railway/Render/Heroku)
1. Push code to GitHub
2. Connect to deployment platform
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create free cluster
2. Configure IP whitelist
3. Update connection string

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Frontend: Next.js, React, Tailwind CSS, Framer Motion
- Backend: Express.js, MongoDB, JWT, Nodemailer
- Icons: React Icons
- Deployment: Vercel, Railway, MongoDB Atlas

---

**Made with ❤️ and ☕ by Supernovaprime**
