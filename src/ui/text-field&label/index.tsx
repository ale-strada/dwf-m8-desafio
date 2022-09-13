import React, { useState } from "react";
import css from "./index.css";

type TextFieldLabel = {
    name:string
    type?:string,
    placeholder?:any
    label?:string
    textarea?:boolean
    value?
    onChange?
}


export function TextFieldLabel(props:TextFieldLabel) {
   
   return <div className={css.root}>
            <label className={css.label}>{props.label}
                {props.textarea? 
                <textarea
                onChange={props.onChange}
                className={css.textArea}
                value={props.value} 
                name={props.name}/> 
                :
                <input 
                    onChange={props.onChange}
                    className={css.input} 
                    type={props.type} 
                    name={props.name} 
                    value={props.value} 
                    placeholder={props.placeholder}/> }
            </label>  
          </div>
  }
