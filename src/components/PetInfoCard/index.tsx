import React, { useEffect, useState } from "react";
import { IconoUbication3 } from "../../img/iconos";
import css from "./index.css"

type InfoProps = {
  petName:string,
  description:string,
  ubication:string,
}


export function PetInfoCard(props:InfoProps){

  const [encontrada, setEncontrada] = useState(false)

  useEffect(()=>{
    if(props.petName === "Sin nombre ( mascota encontrada )"){
  console.log("encontrada", props);
  setEncontrada(true)
}
},[props.petName])

   return( <div className={css.pet__full_info_conteiner}>
                {encontrada ? 
                  <div className={css.pet__full_info_title}>MASCOTA ENCONTRADA</div> 
                  :
                  <h3 className={css.pet__full_info_title}>{props.petName}</h3>
                } 
                <p className={css.text}>{props.description}</p>
                <div className={css.pet__full_info_ubication}>
                  <p className={css.text}>ultima vez visto en:</p>
                  <div className={css.pet__full_info_ubication_box}>
                    <span className={css.span}><IconoUbication3/></span>
                    <p className={css.text}>{props.ubication}</p>
                  </div> 
                </div>
                
           
          </div>)
  
}   
    
  

