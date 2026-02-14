# 🏃‍♀️ D3 Training Session App

A modern, professional React application for tracking athlete training sessions with Google & Facebook authentication, Bootstrap styling, and beautiful D3.js visualizations.

## ✨ Features

- **🔐 Social Authentication**: Google and Facebook login integration
- **📊 Individual Athlete Progress**: Visualize athlete performance with interactive D3.js charts
- **👥 Group Training Management**: Organize and track group training sessions
- **🎯 Path Simulation**: Simulate and visualize training paths with animations
- **📱 Responsive Design**: Mobile-first Bootstrap UI that works on all devices
- **⚡ PWA Ready**: Progressive Web App capabilities for app-like experience
- **🎨 Modern UI**: Professional interface with sidebar navigation and user profiles

## 🚀 Live Demo

**Demo Mode**: Experience the app immediately without setup!
- [Live Demo on GitHub Pages](https://yourusername.github.io)
- Test authentication with demo users
- Explore all features instantly

## 🛠️ Technologies Used

- **Frontend**: React 17, TypeScript, React Router
- **State Management**: Redux Toolkit
- **UI Framework**: Bootstrap 5, React-Bootstrap
- **Visualization**: D3.js v7
- **Authentication**: Firebase Auth (Google & Facebook)
- **Icons**: Bootstrap Icons
- **Deployment**: GitHub Pages

## 🏁 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/athron.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   - Navigate to `http://localhost:3000`
   - App starts in **Demo Mode** - no Firebase setup required!

## 🌐 Deploy to GitHub Pages

### Quick Deployment

1. **Update package.json:**
   ```json
   "homepage": "https://yourusername.github.io"
   ```

2. **Deploy with one command:**
   ```bash
   npm run deploy
   ```

3. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Select `gh-pages` branch as source

### Detailed Instructions
See [GITHUB_PAGES_DEPLOYMENT.md](GITHUB_PAGES_DEPLOYMENT.md) for complete step-by-step guide.

## 🔧 Configuration Modes
### Demo Mode (Default)
- ✅ **No setup required** - works immediately
- ✅ **Fake authentication** for testing
- ✅ **All features available**
- ✅ **Perfect for demos and development**

### Production Mode
- 🔥 **Real Firebase authentication**
- 🌐 **Live Google/Facebook login**
- 🔒 **Secure user management**

To switch to production mode:
1. Follow [FIREBASE_SETUP.md](FIREBASE_SETUP.md)
2. Set `DEMO_MODE = false` in `src/firebase/config.ts`

## 📖 Documentation

- 🔥 [Firebase Setup Guide](FIREBASE_SETUP.md) - Complete Firebase configuration
- 🚀 [GitHub Pages Deployment](GITHUB_PAGES_DEPLOYMENT.md) - Hosting instructions
- 🔐 [Authentication Summary](AUTHENTICATION_SUMMARY.md) - Auth implementation details

## 🎯 Usage

### Authentication
- **Demo Mode**: Click any login button to test
- **Production**: Real Google/Facebook OAuth flow

### Features
- **Dashboard**: Overview with stats and quick actions
- **Athlete Progress**: Individual performance tracking with D3 charts
- **Group Sessions**: Manage team training sessions
- **Path Simulation**: Interactive training path visualizations
- **Analytics**: Performance trends and insights
- **Settings**: User preferences and app configuration

### Navigation
- **Sidebar**: Collapsible navigation with hamburger menu
- **User Menu**: Profile dropdown with logout option
- **Responsive**: Adapts to mobile and desktop screens

## 🔨 Development Scripts

```bash
npm start          # Start development server
npm run build      # Create production build
npm test           # Run tests
npm run deploy     # Deploy to GitHub Pages
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Layout.tsx      # Main layout with sidebar
│   ├── Login.tsx       # Authentication interface
│   ├── Dashboard.tsx   # Main dashboard
│   └── ...
├── contexts/           # React contexts
│   ├── AuthContext.tsx     # Firebase auth
│   └── DemoAuthContext.tsx # Demo auth
├── firebase/           # Firebase configuration
├── redux/              # Redux store and slices
└── routes/             # Route components
```

## 🎨 UI Components

- **Responsive Sidebar**: Collapsible navigation with icons
- **Authentication**: Professional login interface
- **Cards & Stats**: Modern dashboard components
- **Interactive Charts**: D3.js visualizations
- **Form Controls**: Bootstrap-styled inputs
- **Animations**: Smooth transitions and loading states

## 🔒 Security Features

- **Protected Routes**: Authentication required
- **Secure Context**: Proper state management
- **Environment Variables**: Safe config storage
- **OAuth Integration**: Industry-standard authentication

## 🚀 Deployment Options

### GitHub Pages (Recommended)
- ✅ **Free hosting**
- ✅ **Automatic deployment**
- ✅ **Custom domain support**
- ✅ **SSL certificate included**

### Other Options
- Netlify
- Vercel
- Firebase Hosting
- Heroku

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Bootstrap team for the excellent UI framework
- D3.js community for powerful visualizations
- Firebase team for authentication services
- React team for the amazing framework

## 📞 Support

- 📖 Check the documentation files in this repository
- 🐛 Open an issue for bugs or feature requests
- 💬 Discussions are welcome in the Issues section

---

**Built with ❤️ for the athletic training community**