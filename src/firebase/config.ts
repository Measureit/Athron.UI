import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

// Demo mode flag - set to true to use demo authentication (no Firebase required)
export const DEMO_MODE = true;

// Firebase configuration
// Replace these with your actual Firebase config values when DEMO_MODE is false
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase only if not in demo mode
let app: any = null;
let auth: any = null;
let googleProvider: any = null;
let facebookProvider: any = null;

if (!DEMO_MODE) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  
  // Initialize providers
  googleProvider = new GoogleAuthProvider();
  facebookProvider = new FacebookAuthProvider();

  // Configure providers
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });

  facebookProvider.setCustomParameters({
    'display': 'popup'
  });
}

export { auth, googleProvider, facebookProvider };
export default app;
