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
    option?:string
    handleOptionClick?:()=>void
    isShowInput?:boolean
    id?:string
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
                    id={props.id}
                    onChange={props.onChange}
                    className={props.isShowInput? css.input : css.input_none} 
                    type={props.type} 
                    name={props.name} 
                    value={props.value} 
                    disabled={props.isShowInput? false : true}
                    placeholder={props.placeholder}/> }
                    {props.option && <div className={css.option} onClick={props.handleOptionClick}>{props.option}</div>}
            </label>  
          </div>
  }
