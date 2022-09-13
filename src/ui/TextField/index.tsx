import React, { useState } from "react";
import css from "./index.css";

type TextField = {
    type:string,
    name:string
    placeholder?:any
    autocomplete?:any
    error?:boolean
    value?:string
    onChange?
}


export function TextField(props:TextField) {
   
   return<div>  
            <input 
              onChange={props.onChange}
              className={css.input} 
              type={props.type} 
              name={props.name} 
              placeholder={props.placeholder} 
              autoComplete={props.autocomplete} 
              value = {props.value}/> 
          </div>
  }
