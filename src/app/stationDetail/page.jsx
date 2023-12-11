"use client"
 import { useEffect , useState} from "react";
import StationDetailC from "@/components/StationDetailC";
import { useRouter } from 'next/navigation';
import Nav from "@/components/Nav";
import Link from "next/link";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaPlayCircle } from "react-icons/fa";



export default function StationDetail (){
  const [localData, setLocalData] = useState([]);
  const [audioRef, setAudioRef] = useState(null);

  const stationName = useSelector((state) => state.stationReducer.nameStation);
  console.log("El REDUCER EN EL STATIONDEDAITL  ES ", stationName);

  // Llama a la API en el cliente y actualiza el store con los datos obtenidos
  useEffect(() => {
    const fetchStationData = async () => {
      try {
        const response = await fetch(`https://de1.api.radio-browser.info/json/stations/byname/${stationName}`);
        const data = await response.json();
        console.log("LA data del fecht es ", data.length);
        // Actualiza el estado local con los datos obtenidos de la API
        const first200Data = data.filter((item, index) => index < 200);

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

  console.log("El stado local de stations es " , localData.length)
    return (
        <div className="">
           <Nav className="bg-blue-400"/>
           {localData.length > 0 ? (
        // Renderiza solo si hay elementos en first200Objects
        localData.map((item, index) => (
          <div key={index} className="bg-blue-800 m-10">
            <p> NOMBRE : {cleanName(item.name)} <FaPlayCircle  onClick={() => playRadio(item)}/> </p>
            <button onClick={stopRadio}>Detener</button>
            <p> Home Page <Link href={item.homepage}> Visitar </Link> </p>
            <p> PAIS : {item.country}</p>
            <p>VOTES : {item.votes}</p>
            {/* Agrega más campos según la estructura de tus objetos */}
          </div>
        ))
      ) : (
        // Renderiza algo diferente si no hay elementos


        <p>Cargando</p>
      )}
        </div>
    )
}







  