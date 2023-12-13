"use client"
import { useEffect } from "react";
import {signOut } from "firebase/auth";
import {auth} from "../firebase";
import {useState} from "react";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {loginUser2 } from '../Redux/userSlice';
import Main from "@/components/Main"
import Nav from "@/components/Nav"
  
export default function  Home () {
  const dispatch = useDispatch();
  const router = useRouter();
  const valueLogin = useSelector((state) => state.userRegister.idUserLogin);
  console.log("El user ID logueado es " , valueLogin);
  console.log("El REDUCER ES ", valueLogin);
  const [currentPage, setCurrentPage] = useState(1);
  const divsPerPage = 6; // 2 filas x 3 columnas
  const [isLoading, setIsLoading] = useState(true)
  const totalDivs = 20;
  const totalPages = Math.ceil(totalDivs / divsPerPage);

  const handleClickNext = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
    console.log("Se hizo clik en boton Siguiente");
  };

  const handleClickPrev = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    console.log("Se hizo click en el boton Anterior");
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Usuario cerró sesión exitosamente.');
     
      await dispatch(loginUser2(false));
   
      router.push('/login');
      toast("SE CERRO SECCION")
      console.log("1");
      
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  useEffect(() => {
    // Cargar el estado almacenado en localStorage
    const storedState = JSON.parse(localStorage.getItem('userRegister'));
    if (storedState) {
      dispatch(loginUser2(storedState.valueLogin));
    }
  }, [dispatch]);

  // Redirigir a /login si no está autenticado
  useEffect(() => {
    if (!valueLogin && typeof window !== 'undefined') {
      router.push('/login');
    }
  }, [valueLogin, router]);

  // Agregar un efecto para manejar la carga inicial
  useEffect(() => {
    setIsLoading(false); // Marcar la carga inicial como completa
  }, []);

  // background: url("./Img/image10.jpg") no-repeat center center fixed;
  //background-size: cover;

  // Renderiza Main solo si está autenticado
  return (
    <div className="" >
      {!isLoading && valueLogin ? (
         <div 
         className="py-10 "
         style={{
          backgroundImage: 'url("./Img/niños2.jpg")',
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
         <Main className= ""
          handleSignOut={handleSignOut}
          currentPage={currentPage}
          divsPerPage={6}
          totalPages={Math.ceil(17 / 6)}
          handleClickPrev={() => setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage))}
          handleClickNext={() => setCurrentPage((prevPage) => (prevPage < 4 ? prevPage + 1 : prevPage))}
        />
         </div>
      ) : (   
         <div className=" bg-colorPrincipal flex h-full justify-center items-center">
            <h1 className="mt-[200px] text-2xl">Autenticando...</h1>
         </div>
         )}
    </div>
  );
};


  

  

  

