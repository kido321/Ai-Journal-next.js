import { initializeApp ,getApp ,getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjAndMbr1EvmOJwJFAUlBxRMpBVkUVXMo",
  authDomain: "ai-journal-bcedb.firebaseapp.com",
  projectId: "ai-journal-bcedb",
  storageBucket: "ai-journal-bcedb.appspot.com",
  messagingSenderId: "419129881848",
  appId: "1:419129881848:web:04aea5fe427a3fcb6f770d"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };