import React from "react";
import css from "./index.css";

export function Title({ children }) {
  return <div className={css.conteiner}><h1 className={css.root}>{children}</h1></div>;}

export function Alert({children}) {
  return <div className={css.conteiner}><p className={css.p}>{children}</p></div>
}