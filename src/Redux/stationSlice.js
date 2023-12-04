//Esta es una funcionalidad de tantas funcionalidades
import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
    try {
      const serializedState = localStorage.getItem("stationReducer");
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("stationReducer", serializedState);
    } catch (err) {
      // Handle errors
    }
  };



const initialState = loadState() || {
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
           saveState(state);
        } 
    }
})

//aqui estamos exportando las actions

 export const {changeName} = stationSlice.actions;
 // esto en principio es el valor iniciail de  tods la aplicacion

 export default stationSlice.reducer