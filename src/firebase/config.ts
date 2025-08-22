import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

// Demo mode flag - set to true to use demo authentication (no Firebase required)
export const DEMO_MODE = true;

// Firebase configuration
// Replace these with your actual Firebase config values when DEMO_MODE is false
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
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
