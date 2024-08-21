import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// live;

const firebaseConfig = {
  apiKey: 'AIzaSyALnEs56bQvo90KIQm4E-IisiqwmhJlpUg',
  authDomain: 'task-tracker-d686c.firebaseapp.com',
  projectId: 'task-tracker-d686c',
  storageBucket: 'task-tracker-d686c.appspot.com',
  messagingSenderId: '499379176184',
  appId: '1:499379176184:web:dc62d6bd49e13633cbf10d'
};

// test

// const firebaseConfig = {
//   apiKey: 'AIzaSyBv7H9Si3ytdgB79Vp06YmLZBt_Y5bRoWw',
//   authDomain: 'tn-snacks-staging.firebaseapp.com',
//   projectId: 'tn-snacks-staging',
//   storageBucket: 'tn-snacks-staging.appspot.com',
//   messagingSenderId: '810232991026',
//   appId: '1:810232991026:web:90e8376ddfcbc187011b2b'
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const currentUser = auth.currentUser;

export const DOC_PATHS = {
  TASKS: 'tasks'
};
