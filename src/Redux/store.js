import {configureStore} from "@reduxjs/toolkit";
import userRegisterReducer from "./userSlice";

export const store = configureStore({
    reducer : {
        userRegister : userRegisterReducer
    }
})












