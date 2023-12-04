//Esta es una funcionalidad de tantas funcionalidades
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   nameStation: ""
}

export const stationSlice = createSlice({
    name: "stationSlice" ,
    initialState ,
    reducers :{
        //estas seria las actions que modifican el estado global, en tes caso el estado couter
        changeName : (state , action) =>{
            console.log("El action payload en el stationSlice " , action.payload);
           state.nameStation = action.payload

        } 
    }
})

//aqui estamos exportando las actions

 export const {changeName} = stationSlice.actions;
 // esto en principio es el valor iniciail de  tods la aplicacion

 export default stationSlice.reducer