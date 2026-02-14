# Firebase Authentication Setup Guide

## 📋 Prerequisites

Before you can use Google and Facebook login, you need to set up Firebase Authentication in your project.

## 🔥 Firebase Setup Steps

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the setup wizard to create your project

### 2. Enable Authentication

1. In your Firebase project console, go to **Authentication**
2. Click on the **Sign-in method** tab
3. Enable the following providers:
   - **Google**: Click on Google → Enable → Save
   - **Facebook**: Click on Facebook → Enable → You'll need Facebook App ID and App Secret

### 3. Get Your Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click **Add app** → Web app (</>) icon
4. Register your app and copy the configuration object

### 4. Update Firebase Config

Replace the placeholder values in `src/firebase/config.ts` with your actual Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "your-actual-app-id"
};
```

### 5. Set Up Facebook Authentication

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app or use existing one
3. Add **Facebook Login** product
4. In Firebase Console → Authentication → Sign-in method → Facebook:
   - Enter your Facebook App ID
   - Enter your Facebook App Secret
   - Copy the OAuth redirect URI and add it to your Facebook app settings

### 6. Configure Authorized Domains

In Firebase Console → Authentication → Settings → Authorized domains:
- Add your development domain (usually `localhost`)
- Add your production domain when deploying

## 🚀 Testing Authentication

1. Start your development server: `npm start`
2. The app will show a login screen if not authenticated
3. Click "Continue with Google" or "Continue with Facebook"
4. Complete the OAuth flow
5. You should be redirected to the main dashboard

## 🔒 Security Notes

- Never commit your actual Firebase configuration to public repositories
- Consider using environment variables for sensitive configuration
- Set up proper security rules in Firebase
- Configure proper OAuth redirect URIs in Facebook Developer Console

## 🛠️ Environment Variables (Optional)

You can use environment variables instead of hardcoding config values:

Create a `.env` file in your project root:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=your-app-id
```

Then update `src/firebase/config.ts`:

```typescript
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
```

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your Firebase configuration
3. Ensure OAuth providers are properly configured
4. Check that authorized domains are set correctly
