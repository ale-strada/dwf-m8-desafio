import React from "react"
import { ButonColores, FormButton } from "ui/Buttons"
import { Alert, Title } from "ui/Title";
import {useNavigate} from "react-router-dom"
import css from "./post.css"
import { PostPet } from "components/PostPet";

export function Post(){
    const navigate = useNavigate()
   
    function handleClickCAncelar(){
       navigate("/",{replace:true}) 
    }
    
   
    return <div className={css.root}>
                <Title>Publicar mascota perdida</Title>
                <PostPet/>
                <ButonColores naranja={false} onClicked={handleClickCAncelar}>Cancelar</ButonColores>
           </div>
}