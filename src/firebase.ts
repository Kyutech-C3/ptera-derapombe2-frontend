import { FirebaseOptions, initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage, ref } from 'firebase/storage'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_ENV_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_ENV_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_ENV_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_ENV_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_ENV_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_ENV_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const storage = getStorage(app)
export const provider = new GoogleAuthProvider()
