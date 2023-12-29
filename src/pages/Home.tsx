import React from "react"
import{Title} from "../ui/Title"
import{MainButton} from "../ui/Buttons"
import { Perrito } from "img/perrito"
import css from "./home.css"
import {useNavigate} from "react-router-dom"

function Home () {   
 const navigate = useNavigate()

  function handleClick (){
  navigator.geolocation.getCurrentPosition(p=>{
    const userLoc = [p.coords.latitude,p.coords.longitude]
    navigate("/mascotas/"+ userLoc,{replace:true}) 
  })
   }
    return (
          <div className={css.root}>
           <Title>Consigue ayuda, ayuda a otros</Title>
           <div className={css.perrito_container}>
           <Perrito />
           </div>
           <MainButton onClicked={handleClick}>Mostrar mascotas</MainButton>
          </div>
        )
      
    }
  
  export {Home}