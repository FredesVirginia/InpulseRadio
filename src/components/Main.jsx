import { stationRadioInfo  }from "@/helpers/stationRadioInfo";
import Nav from "./Nav";
import Image from "next/image" ; 
import Link from 'next/link';
export default function  Main ({ handleSignOut, currentPage, divsPerPage, totalPages, handleClickPrev, handleClickNext }) {
    const currentDivsData = stationRadioInfo.slice((currentPage - 1) * divsPerPage, currentPage * divsPerPage);
  
    return (
        <div className="   h-screen  ">
        
        
  
        <div className="flex justify-center  "> {/* Contenedor centrado */}
        <div className="grid grid-cols-3 grid-rows-2 gap-4 p-4">
          {/* Muestra los divs actuales según la página actual */}
          {currentDivsData.map((div) => (
            <div className="bg-gray-200 m-2 w-56 h-76" key={div.id}>
             
              {/* Aquí puedes agregar la imagen u otro contenido según tus necesidades */}
              <Image
                  src={div.img}
                  width={230}
                  height={150}
                  alt="Picture of the author"
                  className=''
              />
               <h3 className="text-center my-4"
               
               >{div.name}</h3>
               <div className="text-center p-2 bg-sky-600">
               <Link className=' animate-pulse text-white font-bold text-2xl ' href={div.link}>Listen</Link>
               </div>
            </div>
          ))}
        </div>
      </div>

             {/* Botones para avanzar y retroceder */}
          <div className="flex justify-center  mb-20 ">
            <button
              onClick={handleClickPrev}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Anterior
            </button>
            <button
              onClick={handleClickNext}
              disabled={currentPage === totalPages}
              className="bg-blue-500 text-white px-4 py-2  rounded"
            >
              Siguiente
            </button>
          </div>


      </div>
      );
}