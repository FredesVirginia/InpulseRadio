// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("userRegister");
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
    localStorage.setItem("userRegister", serializedState);
  } catch (err) {
    // Handle errors
  }
};

const initialState = loadState() || {
  name: "",
  email: "",
  password: "",
  valueLogin: false,
  idUserLogin : "",
};

export const userSliceRegister = createSlice({
  name: "userRegisterReducer",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { name, email, password } = action.payload;
      state.name = name;
      state.email = email;
      state.password = password;
      saveState(state);
    },

   
    loginUser2 : (state , action)=>{
     
     state.valueLogin= action.payload;
     saveState(state);
    },

    userLoggeado : (state , action) =>{
      console.log("EL action en userLoggeado" , action.payload)
      state.idUserLogin = action.payload;
      saveState(state);
    }
  },
});

export const { registerUser,  loginUser2 , userLoggeado} = userSliceRegister.actions;

export default userSliceRegister.reducer;

