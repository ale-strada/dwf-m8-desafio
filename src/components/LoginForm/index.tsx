import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom"
import { FormButton } from "ui/Buttons";
import { TextFieldPassword } from "ui/TextFieldPassword";
import { TextField } from "ui/TextField";
import { Alert } from "ui/Title";
import {useRecoilState} from "recoil"
import {userLoginState, useToken, useUserState} from "hooks/hooks"
import css from "./index.css"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export function LoginForm(){ 

  const MySwal = withReactContent(Swal)
  const [error, setError] = useState(false)
  const [userLogin,setUserLogin] = useRecoilState(userLoginState)
  const navigate = useNavigate()
  
  const token = useToken()
  useUserState()

  useEffect(()=>{
        if (token === "email or pass incorrect"){
        setError(true)
        }else if (token === "usuario no registrado"){
        MySwal.fire({
          title: <Alert>Usuario no registrado</Alert>,
          icon: "error",
          width:300,
          confirmButtonColor:"#108896"
         })
        }else if (token !== undefined){ 
         navigate("/",{replace:true})
      }
  },[token])

    function handleSubmit(e){
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        
        setUserLogin({email,password})
        navigate("/login/"+email,{replace:true})
    }  
    
  return (
    <div>
        <form className={css.form} onSubmit={handleSubmit}>
            <TextField type="email" name="email" placeholder={"Introduce tu email"}/>
            <TextFieldPassword error={error} name="password" autocomplete="off" placeholder={"Introduce tu contraseña"}/>
            <FormButton>Enviar</FormButton> 
        </form>          
    </div>      
  )    
};

