import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQWlaH8qyVkcEuhrtgc8GirkcRMhj3DIE",
  authDomain: "live-stream-ce9c0.firebaseapp.com",
  projectId: "live-stream-ce9c0",
  storageBucket: "live-stream-ce9c0.appspot.com", // Định dạng chính xác
  messagingSenderId: "59829229545",
  appId: "1:59829229545:web:dc77bffe4256ca3e2b5d78",
  measurementId: "G-5VTQNBZTKG",
};

// Check if Firebase is already initialized
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // Use the already initialized app
}

// Initialize Analytics (only works on web)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Initialize Firebase Authentication
const auth = getAuth(app);

export { app, analytics, auth };