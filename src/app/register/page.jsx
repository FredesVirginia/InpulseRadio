 "use client"
import React, { useState } from 'react';
import { FaRadio } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../Redux/userSlice';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { v4 as uuidv4} from  "uuid"
import { auth , registerNewUser } from '@/firebase';
import {  createUserWithEmailAndPassword } from "firebase/auth";

import { useRouter } from 'next/navigation';

export default function Register() {

  const dispatch = useDispatch();
  const router = useRouter();

  const [user, setUser] = useState({
    uid:uuidv4(),
    name: '',
    email: '',
    password: '',
  });

  const registro = async (e)=>{
    try{
        await registerNewUser(user)
           
     
    }catch(error){
        console.log(error)
    }
  }

  const setDataHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    console.log('Por el submit');

    try {
      console.log('El user es en register', user);
      await dispatch(registerUser(user));
     const res = await createUserWithEmailAndPassword(auth, user.email, user.password);
      await registerNewUser(user);


      toast.promise(
        Promise.resolve('Registro  Correcto'), // Resuelve la promesa cuando la notificación se cierra
        {
          loading: 'Cargando...',
          success: (resolved) => {
            router.push('/login'); // Redirige a la página 'home' después de que la notificación se cierre
            return resolved;
          },
        }
      );

    } catch (error) {
      console.error('Error en onSubmit de register', error);
    }
  };

  return (
    <div className="flex flex-col gap-10 items-center  bg-gray-100 w-[350px] h-[350px]  mx-auto mt-20">
      <div className="flex justify-center p-5 w-full bg-color4">
        <FaRadio className="text-white text-2xl mr-6" />
        <h1 className="text-white  font-bold text-center   ">REGISTER USER</h1>
      </div>
      <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-4 max-w-sm ">
        <input
          className="border border-gray-200 rounded py-1 px-2 outline-none"
          type="text"
          name="name"
          placeholder="👤 Name"
          onChange={setDataHandler}
        />
        <input
          className="border border-gray-200 rounded py-1 px-2 outline-none"
          type="email"
          name="email"
          placeholder="📩 Email"
          onChange={setDataHandler}
        />
        <input
          className="border border-gray-200 rounded py-1 px-2 outline-none"
          type="password"
          name="password"
          placeholder="🔑 Password"
          onChange={setDataHandler}
        />
        <button className="bg-color3 py-1 text-white rounded shadow">Registrarse</button>
      </form>
    </div>
  );
}
