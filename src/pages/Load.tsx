// pagina de prueba para configurar la vista del componente Loading
import React from "react";
import css from "./login.css"
import { Loading } from "ui/Loading";

function Load(){ 
  
return (
    <div className={css.root}>
        <Loading/>
    </div>      
  )    
};

export {Load}