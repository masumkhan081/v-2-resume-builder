import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//
const firebaseConfig = {
  apiKey: "AIzaSyByXqr-2wKmmL7MKopQgTAbxWM-RUgGfDo",
  authDomain: "react-fireb-auth-self.firebaseapp.com",
  projectId: "react-fireb-auth-self",
  storageBucket: "react-fireb-auth-self.appspot.com",
  messagingSenderId: "361024440379",
  appId: "1:361024440379:web:9fe73cbdf55960e0c3f41e",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
//

//
export default app;
