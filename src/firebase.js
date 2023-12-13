
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
    const docRef = await addDoc(collectionRef , user)
   return docRef

   
  }catch(error){
 console.log("error en firebase register" , error)
  }
}

export async function addNewLink  (favorito){
  console.log("El  FAVORITO que llega a firebase INSERTnewLin es :" , favorito);
  try{
     const docRef = collection(db , "favoritos");
     const res = await addDoc(docRef , favorito);
     return res;
  }catch(error){
     console.error(error);

  }
}

export async function getLinks(TTTuuid) {
  if (typeof TTTuuid !== 'string' && typeof TTTuuid !== 'number') {
    throw new Error('El UID debe ser una cadena o un número.');
  }

  // Convierte el UID a una cadena si es un número
  const uidString = typeof TTTuuid === 'number' ? TTTuuid.toString() : TTTuuid;

  const favoritos = [];

  try {
    const collectionRef = collection(db, "favoritos");
    const q = query(collectionRef, where('uuid', '==', uidString));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      const linkData = doc.data();
      const link = { docId: doc.id, ...linkData };
      favoritos.push(link);
    });
    console.log("LOS FAROTISO EN FIREBASE ESON " , favoritos)
    return favoritos;
  } catch (error) {
    console.error(error);
    throw error;
  }
}