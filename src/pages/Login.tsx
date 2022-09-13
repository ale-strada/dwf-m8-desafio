import React from "react";
import { Link } from "react-router-dom"
import { Title } from "ui/Title";
import css from "./login.css"
import { LoginForm } from "components/LoginForm";

function Login(){ 
  
return (
    <div className={css.root}>
        <Title>Entrar en mi cuenta</Title>
        <LoginForm/>          
        <p className={css.link_signup}>¿No tienes cuenta?
            <span style={{margin:"3px"}}>
             <Link to="/signup">Regístrate</Link>   
            </span> 
        </p> 
    </div>      
  )    
};

export {Login}