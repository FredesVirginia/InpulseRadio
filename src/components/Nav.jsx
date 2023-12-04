"use client"
import {signOut } from "firebase/auth";
import toast from "react-hot-toast";
import Link from "next/link";


export default function Nav (){
    const handleSignOut = async () => {
        try {
          await signOut(auth);
          console.log('Usuario cerró sesión exitosamente.');
          await dispatch(loginUser(false));
          toast.promise(
            Promise.resolve('Cerraste Sesión!'),
            {
              loading: 'Cargando...',
              success: (resolved) => {
                // Verificar si se está ejecutando en el lado del cliente antes de redirigir
                if (typeof window !== "undefined") {
                  router.push('/login');
                }
                return resolved;
              },
            }
          );
        } catch (error) {
          console.error('Error al cerrar sesión:', error.message);
        }
      };
    return (
        <div className=" px-10  h-54">
            <h1 className="text-red-400 font-bold text-4xl">100`5</h1>
             <span className="text-white font-bold">RADIO</span>
             <div className=" flex justify-end space-x-6">
             <Link className='  text-white font-bold text-2xl ' href="/">FAVORITOS</Link>
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
               <select className="h-10 px-3 bg-gray-400">
                    <option selected disabled>Seleccionar disco</option>
                   
               </select>
            </div>
        </div>
    )
}