import {configureStore} from "@reduxjs/toolkit";
import userRegisterReducer from "./userSlice";
import stationSlice from "./stationSlice";

export const store = configureStore({
    reducer : {
        userRegister : userRegisterReducer,
        stationReducer : stationSlice,
    }
})












