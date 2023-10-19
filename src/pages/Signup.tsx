import React from "react";
import { tokenState } from "hooks/hooks";
import { useRecoilValue } from "recoil";
import { Title } from "ui/Title";
import css from "./login.css"
import { SignupForm } from "components/SignUp&EditForm";

export function Signup(){
const token = useRecoilValue(tokenState)
const titleEntrar = "Registrarme"
const titleMisDatos = "Mis Datos"

  return <div className={css.root}>
            <Title>{token? titleMisDatos:titleEntrar}</Title>
            <SignupForm/>         
          </div>    
};
