"use client"
 import { useEffect , useState} from "react";
import StationDetailC from "@/components/StationDetailC";
import { useRouter } from 'next/navigation';
import Nav from "@/components/Nav";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function StationDetail (){
  const [localData, setLocalData] = useState([]);

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

  console.log("El stado local de stations es " , localData.length)
    return (
        <div className="bg-red-600">
           <Nav className="bg-blue-400"/>
           {localData.length > 0 ? (
        // Renderiza solo si hay elementos en first200Objects
        localData.map((item, index) => (
          <div key={index}>
            <p>{item.name}</p>
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







  