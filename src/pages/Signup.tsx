import { tokenState } from "hooks/hooks";
import React from "react";
import { useRecoilValue } from "recoil";
import { Title } from "ui/Title";
import css from "./login.css"
import { SignupForm } from "components/SignUp&EditForm";

function Signup(){
const token = useRecoilValue(tokenState)
 
const titleEntrar = "Registrarme"
const titleMisDatos = "Mis Datos"

  return <div className={css.root}>
            <Title>{token? titleMisDatos:titleEntrar}</Title>
            <SignupForm/>         
         </div>      
     
};

export {Signup}

