import React, { useEffect, useState } from "react"
import { IconoUbication2 } from "img/iconos"
import css from "./index.css"
import {useNavigate} from "react-router-dom"
import { useRecoilState } from "recoil"
import { petEditState } from "hooks/hooksPets"
type petProps = {
  petName:string,
  description:string,
  pictureURL:string,
  ubication:string,
  id?
  email:string,
}

export function MyPetCard (props:petProps) {
  const [petEdit, setPetEdit] = useRecoilState(petEditState)
  const [encontrada, setEncontrada] = useState(false)
  const navigate = useNavigate()
  function handleEditarClick(){
   
   setPetEdit({
    petName:props.petName,
    ubication:props.ubication,
    description:props.description,
    id:props.id
   })
   navigate("/edit",{replace:true}) 
  }
   
    useEffect(()=>{
        if(props.petName === "Sin nombre ( mascota encontrada )"){
      console.log("encontrada", props);
      setEncontrada(true)
    }
    },[props.petName])
  
      
  return (
        <div className={css.pet__box}>
          {encontrada ? 
          <div className= {css.pet__encontrada}>MASCOTA ENCONTRADA</div> 
          : null }
            <img className={css.pet__foto} src={props.pictureURL}/>
            <div className={css.pet__box_description}>
                <div className={css.box}>
                    {encontrada ? <span className= {css.pet__span_email}>encontada por: 
                      <h6 className={css.pet__titulo_email}>{props.email}</h6>
                    </span> 
                    :
                    <h3 className={css.pet__titulo_name}>{ props.petName}</h3>
                    }
                    
                    <div className={css.pet__ubicacion}>
                      <IconoUbication2/>
                      <p className={css.pet__ubicacion_text}>{props.ubication}</p>
                    </div>
                </div>

                <div className={css.box}>
                  <div className={css.button_box}>
                    <button onClick={handleEditarClick}className={css.button}>EDITAR</button>
                  </div>
                </div>
            </div>
        </div>
      );
  }
