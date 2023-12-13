"use client"
import React, { useState } from 'react';
import { FaRadio } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
import {loginUser2 , userLoggeado } from '../../Redux/userSlice';
import toast from 'react-hot-toast';
import { v4 as uuidv4} from  "uuid"
import {auth} from "../../firebase"
import { getAuth , signInWithEmailAndPassword} from "firebase/auth";

import { useRouter } from 'next/navigation';

export default function Login ( ){
  const valueLogin = useSelector((state) => state.userRegister.idUser);
    const router = useRouter();
    const dispatch = useDispatch();

    const [user , setUser] = useState({
        email : "" ,
        password : "",
     });

     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const setDataHandler = (e) => {
        setUser({
          ...user,
          [e.target.name]: e.target.value,
        });
      };

    

      const handleLogin = async (e) => {
        e.preventDefault();
     
        try {
           const response =  await  signInWithEmailAndPassword(auth, email, password);
           console.log("Lo que viene de RESPONSE LOGIN ES " , valueLogin)
          console.log("EL response COMPLETO ES " , valueLogin)
            await dispatch (userLoggeado(valueLogin))
            await dispatch(loginUser2(true));

            toast.promise(
                Promise.resolve('Login  Correcto'), // Resuelve la promesa cuando la notificación se cierra
                {
                  loading: 'Cargando...',
                  success: (resolved) => {
                    router.push('/'); // Redirige a la página 'home' después de que la notificación se cierre
                    return resolved;
                  },
                }
              );
        
        }catch(error){
            console.log("El error en login fue" , error)
        }
          
      };

      const onSubmit = async (e) =>{
        e.preventDefault();
        console.log('Por el submit');
        try{ 
            console.log( "EL auht es " , auth);
            console.log("El email fue " , user.email);
            console.log("la clave es " , user.password)
            await signInWithEmailAndPassword(auth, user.email, user.password)
             
         // Signed in 
           console.log("Correcto login ")
         // ...
         }catch(error){
             console.log("Error en login 2  " , error)
         }

      }


    return (
        <div className="flex flex-col gap-10 items-center  bg-gray-100 w-[350px] h-[350px]  mx-auto mt-20">
      <div className="flex justify-center p-5 w-full bg-color5">
        <FaRadio className="text-white text-2xl mr-6" />
        <h1 className="text-white  font-bold text-center   ">Login USER</h1>
      </div>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm ">
        
        <input
          className="border border-gray-200 rounded py-1 px-2 outline-none"
          type="email"
          name="email"
          placeholder="📩 Email"
          value={email} onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border border-gray-200 rounded py-1 px-2 outline-none"
          type="text"
          name="password"
          placeholder="🔑 Password"
          value={password} onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-color6 py-1 text-white rounded shadow">Login</button>
      </form>
    </div>
    )
}