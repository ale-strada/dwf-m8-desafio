import React from "react";
import css from "./index.css";

export function MainButton({onClicked,children}) {
  return <button onClick ={onClicked} className={css.root}>{children}</button>;
}
type formButonProps= {
  children,
  onClick?
}
export function FormButton(props:formButonProps){
  return <button onClick={props.onClick} className={css.form_button}>{props.children}</button>;
}

export function ButonColores({onClicked,children,naranja}){
  return <button  onClick ={onClicked} className={naranja? css.naranja : css.gris}>{children}</button>
}