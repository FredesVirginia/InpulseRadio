"use client"

import Nav from "@/components/Nav";

import Link from "next/link";
import {getLinks} from "@/firebase";
import { useSelector } from "react-redux";
import  {useState , useEffect} from "react";
import { FaPlayCircle } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";

import { MdFavorite } from "react-icons/md";   

export default function Favoritos (){
    const valueLogin = useSelector((state) => state.userRegister.idUserLogin);
    console.log("El user ID logueado es en FAVOERITOS PAGE ES " , valueLogin);
    const [arrayFavorito , setArrayFavorito] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleClick =  async () =>{
     const array = await getLinks(valueLogin);
     setArrayFavorito(array);
     setLoading(false);
    }

    const cleanName = (rawName) => {
        // Utiliza una expresión regular para eliminar caracteres no deseados
        return rawName.replace(/[^a-zA-Z ]/g, '');
      };
    
      const playRadio = (radio) =>{
          // Si ya hay una instancia de Audio, pausarla antes de crear una nueva
        if (audioRef) {
          audioRef.pause();
        }
    
        const newAudio = new Audio(radio.url);
        newAudio.play();
        setAudioRef(newAudio);
      }
    
    
      const stopRadio = () => {
        if (audioRef) {
          audioRef.pause();
          audioRef.currentTime = 0; // Reinicia la reproducción al principio
        }
      }; 


    useEffect(()=>{
        handleClick()
    } ,
    
    []);

    
 return (
    <div 
    style={{
        backgroundImage: 'url("./Img/favoritos.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        height: '100vh',
        position: 'relative', // Añadir posición relativa
        overflowY: 'scroll',  // Agregar desplazamiento vertical
      }}
    >
        <Nav/>
        <div>
          
            <div >
            {loading ? (
            <p className="text-center font-bold text-white text-2xl">Cargando...</p>
          ) : arrayFavorito.length === 0 ? (
            <p className="text-center font-bold text-white text-2xl">Aún no tienes favoritos.</p>
          ) : (
            
                <div className="flex justify-center">
                <div className="grid grid-cols-2  gap-4 p-4">
                {arrayFavorito.map((item, index) => (
                 <div key={index} className=" text-white relative flex flex-col w-[300px] h-[200px] space-y-12 p-12 bg-gradient-to-b from-color9 to-color10 m-10">
           
                 <p className="text-2xl   font-extrabold  truncate">  {cleanName(item.name)}  </p>
                 
     
                  <div className="absolute bottom-0 pb-10 space-y-2 text-white ">
                   
                  <p className="font-bold">VOTES : {item.votes}</p>
                       <p className="truncate font-bold">  {item.country}</p>
                       <div className="flex space-x-8  w-[250px] "> 
                       <p>  <Link  className="underline font-bold" href={item.url}> Fan Page </Link> </p>
                                                                                               
                             <FaPlayCircle className="text-2xl" onClick={() => playRadio(item)}/>
                             <FaCirclePause className="text-2xl" onClick={ stopRadio}/>
                            
                       </div>
                    </div>
                 {/* Agrega más campos según la estructura de tus objetos */}
               </div>
              ))}
                </div>
                </div>
          )}

            </div>
        </div>
    </div>
 )
}