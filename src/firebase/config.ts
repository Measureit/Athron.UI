import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { type Auth } from 'firebase/auth';

export const DEMO_MODE = import.meta.env.MODE === 'development' || !import.meta.env.VITE_FIREBASE_API_KEY;

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase only if not in demo mode
let app: ReturnType<typeof initializeApp> | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;
let facebookProvider: FacebookAuthProvider | null = null;

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
