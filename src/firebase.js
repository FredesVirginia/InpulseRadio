
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getStorage , ref , uploadBytes , getDownloadURL , getBytes} from "firebase/storage";
import { getFirestore , collection , addDoc , getDoc , 
  doc , getDocs ,query , where, setDoc , deleteDoc , docId } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB41Gfg8XMm1Aty_NwXpn5EF4Tk_oMWyO0",
  authDomain: "impulseradio-cf0a6.firebaseapp.com",
  projectId: "impulseradio-cf0a6",
  storageBucket: "impulseradio-cf0a6.appspot.com",
  messagingSenderId: "413542059649",
  appId: "1:413542059649:web:a6df54b8f6c90fee340780",
  measurementId: "G-R7CG4383JS"
};

// Initialize Firebas  e   
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

export async function registerNewUser(user){
  console.log("EL user de registro en firebase register " , user)
  try {
    const collectionRef = collection(db , "users");
    const docRef = doc(collectionRef , user.uid)
    await setDoc(docRef , user);

   
  }catch(error){
 console.log("error en firebase register" , error)
  }
}

export async function addNewLink  (){

}