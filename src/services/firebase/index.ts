import { FirebaseOptions, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { CLOUD_FUNCTIONS_REGION } from './constants';

const options: FirebaseOptions = {
  apiKey:
    process.env.FIREBASE_API_KEY || 'AIzaSyABT5BjNlYGyD3C29-ggonXwNhycn2FsdE',
  authDomain:
    process.env.FIREBASE_AUTH_DOMAIN || 'mountain-app-e6ae8.firebaseapp.com',
  databaseURL: process.env.FIREBASE_DATABASE_URL || '',
  projectId: process.env.FIREBASE_PROJECT_ID || 'mountain-app-e6ae8',
  storageBucket:
    process.env.FIREBASE_STORAGE_BUCKET || 'mountain-app-e6ae8.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '297524745034',
  appId:
    process.env.FIREBASE_APP_ID || '1:297524745034:web:3d4c336ac3883dca3267b3',
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || 'G-JDKJC6BJ5T',
};

const initializeFirebaseApp = () => {
  if (options.apiKey) {
    return getApps().length === 0 ? initializeApp(options) : getApps()[0];
  }

  throw new Error('Firebase API key is not defined');
};

const firebaseApp = initializeFirebaseApp();

export const auth = getAuth(firebaseApp);
export const functions = getFunctions(firebaseApp, CLOUD_FUNCTIONS_REGION);
// to connect to local emulator, uncomment the following line
// connectFunctionsEmulator(functions, 'localhost', 5001);
