import 'dotenv/config'; 
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  databaseURL: process.env.FIREBASE_DATABASE_URL,  
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
