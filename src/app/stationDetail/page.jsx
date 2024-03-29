"use client"
 import { useEffect , useState} from "react";


import Nav from "@/components/Nav";
import Link from "next/link";

import { useSelector } from 'react-redux';
import { FaPlayCircle } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import { recoverRadio } from "@/helpers/recoverRadio";
import { MdFavorite } from "react-icons/md";                                                                               

import { addNewLink } from "@/firebase";
import toast from 'react-hot-toast';
export default function StationDetail (){
  const valueLogin = useSelector((state) => state.userRegister.idUserLogin);
  const [localData, setLocalData] = useState([]);
  const [audioRef, setAudioRef] = useState(null);
 

 
  const stationName = useSelector((state) => state.stationReducer.nameStation);
  console.log("El REDUCER EN EL STATIONDEDAITL  ES ", stationName);

  // Llama a la API en el cliente y actualiza el store con los datos obtenidos
  useEffect(() => {
    const fetchStationData = async () => {
      try {
        const first200Data = await recoverRadio(stationName);

        // Actualiza el estado local con los primeros 200 datos obtenidos de la API
        setLocalData(first200Data);
      } catch (error) {
        console.error("Error fetching station data: ", error);
      }
    };
    fetchStationData();
  }, [stationName]);


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

  const addFavorito = async (station) =>{
      console.log("Hiciste click");
      console.log("La radion es " , station);
      const favorito ={
        uuid : valueLogin,
        name: station.name,
        country : station.country,
        votes : station.votes,
        url : station.url
      };

      try{
       
        console.log("El objeto que se envia a FIREBA SES " , favorito)

     const res= await addNewLink(favorito);
      favorito.docId = res.id;
      console.log("AL PARECER SALIO BIEN ");
      toast.success("Se agrego a Favoritos");
      }catch(error){
        console.log("Hubo en error en componnete addLink" , error)
      }
      
  }

 

  console.log("El stado local de stations es " , localData.length)
    return (
        <div className="pt-10"  
        style={{
          backgroundImage: 'url("./Img/playa3.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          height: '100vh',
          position: 'relative', // Añadir posición relativa
          overflowY: 'scroll',  // Agregar desplazamiento vertical
        }}
        >
           <Nav />
           <div className="flex justify-center"> 
             <div className="grid grid-cols-2  gap-4 p-4 ">
             {localData.length > 0 ? (
        // Renderiza solo si hay elementos en first200Objects
        localData.map((item, index) => (
          <div key={index} className=" relative flex flex-col w-[380px] h-[280px] space-y-12 p-12 bg-gradient-to-b from-color7 to-color8 m-10">
           
            <p className="text-2xl   font-bold text-white truncate">  {cleanName(item.name)}  </p>
            

             <div className="absolute bottom-0 pb-10 space-y-2 text-white ">
              
             <p>VOTES : {item.votes}</p>
                  <p className="truncate"> COUNTRY : {item.country}</p>
                  <div className="flex space-x-8  w-[250px] "> 
                  <p>  <Link  className="underline " href={item.homepage}> Fan Page </Link> </p>
                                                                                          
                        <FaPlayCircle className="text-2xl" onClick={() => playRadio(item)}/>
                        <FaCirclePause className="text-2xl" onClick={ stopRadio}/>
                        <MdFavorite  onClick={()=>addFavorito(item)} className="text-2xl" />
                  </div>
               </div>
            {/* Agrega más campos según la estructura de tus objetos */}
          </div>
        ))
      ) : (
        // Renderiza algo diferente si no hay elementos


        <p>Cargando</p>
      )}
             </div>
           </div>
        </div>
    )
}







  