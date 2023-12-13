"use client"

import Nav from "@/components/Nav";
import {getLinks} from "@/firebase";
import { useSelector } from "react-redux";

export default function Favoritos (){
    const valueLogin = useSelector((state) => state.userRegister.idUserLogin);
    console.log("El user ID logueado es en FAVOERITOS PAGE ES " , valueLogin);


    const handleClick =  async () =>{
        await getLinks(valueLogin);
    }
 return (
    <div>
        <Nav/>
        <div>
            <button 
            onClick={handleClick}
            className="text-2xl">MOSTRAR FARITOS</button>
        </div>
    </div>
 )
}