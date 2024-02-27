"use client"
import {signOut } from "firebase/auth";
import toast from "react-hot-toast";
import Link from "next/link";
import {auth} from "@/firebase"
import { loginUser2 } from "@/Redux/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
export default function Nav (){
  const router = useRouter();
  const dispatch = useDispatch();
    const handleSignOut = async () => {
        try {
          await signOut(auth);
          console.log('Usuario cerró sesión exitosamente.');
          const user = {
            id : "o", 
            value: false
          }
         await dispatch(loginUser2(false));
          router.push("/login");
          toast("Cerrando secion ")
        } catch (error) {
          console.error('Error al cerrar sesión:', error.message);
        }
      };
    return (
        <div className=" px-10  h-54">
            <h1 className="text-red-400 font-bold text-4xl">100`5</h1>
             <span className="text-white font-bold">RADIO</span>
             <div className=" flex justify-end space-x-6">
           
             <a className=" text-white font-bold text-2xl" href="/favoritos">FAVORITOS</a>
           
            <button 
                className="text-2xl  text-white font-bold"
                onClick={handleSignOut}
            >
                LOG OUT
            </button>
             </div>


            <div className="flex justify-between pt-5">
                <h2 className="  text-white text-6xl font-extrabold"
                     >LISTEN ONLINE</h2>
               
            </div>
        </div>
    )
}