import React, { useState } from "react";
import css from "./index.css";
import {Icon} from "react-icons-kit"
import {eye} from "react-icons-kit/feather/eye"
import {eyeOff} from "react-icons-kit/feather/eyeOff"

type TextFieldPass = {
    type?:string,
    name:string
    placeholder?:any
    autocomplete?:any
    error?:boolean
}


export function TextFieldPassword(props:TextFieldPass) {
 const [type, setType] = useState("password")
 const [icon, SetIcon] = useState (eyeOff)
   
function handleToggle(){
  if(type === "password"){
    SetIcon(eye)
    setType("text")
  }else{
    SetIcon(eyeOff)
    setType("password")
  }
}
   return<div>  
      {props.error?
    <div className={css.label}>
    <div className={css.label}>
    <input 
    className={css.error} 
    type={props.type || type}
    name={props.name} 
    placeholder={props.placeholder} 
    autoComplete={props.autocomplete} />  
    <span className={css.icon} onClick={handleToggle}><Icon icon={icon} size={23}/></span>
    </div>
    <span className={css.span}>Contraseña incorrecta</span>
    </div>
    :
    <div className={css.label}>
     <input 
    className={css.input} 
    type={props.type || type} 
    name={props.name} 
    placeholder={props.placeholder} 
    autoComplete={props.autocomplete} /> 
    <span className={css.icon} onClick={handleToggle}><Icon icon={icon} size={23}/></span>
    </div>
    }
    </div>
  

  }
