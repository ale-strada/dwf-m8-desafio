import { tokenState, userDataState, userState, signup, updateUser} from "hooks/hooks";
import React, { useState } from "react";
import { useNavigate} from "react-router-dom"
import {  useRecoilState, useRecoilValue } from "recoil";
import { FormButton } from "ui/Buttons";
import { TextField } from "ui/TextField";
import { TextFieldPassword } from "ui/TextFieldPassword";
import { Alert } from "ui/Title";
import css from "./index.css"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export function SignupForm(){
 const [currentUser, setCurrentUser] = useRecoilState(userState)
 const userData = useRecoilValue(userDataState)
 const [email,setEmail] = useState(userData.email||"")
 const [fullName, setFullName] = useState(userData.fullName||"")
 const MySwal = withReactContent(Swal)
 const navigate = useNavigate()
 const token = useRecoilValue(tokenState)
    
   
function handleSubmit(e){
    e.preventDefault()
    const email = e.target.email.value
    const fullName = e.target.fullName.value
    const password = e.target.password.value
    const passwordconfirm = e.target.passwordconfirm.value
        if (password === passwordconfirm)  {
            const user = {fullName,email,password}
            if(token){
              updateUser(userData, token)
              .then(()=>{
                setCurrentUser(user)
                navigate("/",{replace:true})
              })
            }else{
              signup(user).then(()=>{
              MySwal.fire({
              title: <Alert>Usuario registrado, inicie sesion.</Alert>,
              icon: "success",
              width:300,
              confirmButtonColor:"#108896"
             }).then(()=>navigate("/login/"+user.email,{replace:true}))   
            })
            }          
        } else {
          MySwal.fire({
            title: <Alert>Error al confirmar la contraseña.</Alert>,
            icon: "error",
            width:300,
            confirmButtonColor:"#108896"
           })            
        }
    }  
    
function handleChangeName(e){
      setFullName(e.target.value)
  }
function handleChangeEmail(e){
      setEmail(e.target.value)
  }

  return (
    <div>
        <form className={css.form} onSubmit={handleSubmit}>
            <TextField onChange = {handleChangeName} value={fullName} type="fullName" name="fullName" placeholder={"Introduce tu nombre"} />
            <TextField onChange = {handleChangeEmail} value={email}  type="email" name="email" placeholder={"Introduce tu email"}/>
            <TextFieldPassword name="password" autocomplete="off" placeholder={"Introduce tu contraseña"}/>
            <TextFieldPassword name="passwordconfirm" autocomplete="off" placeholder={"Repetir contraseña"}/>
            <FormButton>Enviar</FormButton> 
        </form>          
    </div>      
  )    
};
