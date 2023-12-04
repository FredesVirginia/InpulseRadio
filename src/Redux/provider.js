// este es un componetne contenedor que va a contener todos los componentes 
import React, { Children } from "react";
import {Provider} from "react-redux";
import {store} from "./store";



export function Providers ({children} ) {
    return <Provider store ={store}>
        {children}
    </Provider>
}