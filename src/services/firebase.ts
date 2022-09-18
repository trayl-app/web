import { FirebaseOptions, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

const CLOUD_FUNCTIONS_REGION = 'europe-west2';

const options: FirebaseOptions = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length === 0 ? initializeApp(options) : getApps()[0];
const auth = getAuth(app);
const functions = getFunctions(app, CLOUD_FUNCTIONS_REGION);
// to connect to local emulator, uncomment the following line
// connectFunctionsEmulator(functions, 'localhost', 5001);

export { auth, functions };
