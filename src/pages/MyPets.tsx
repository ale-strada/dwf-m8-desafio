import React from "react"
import css from "./PetsNear.css"
import {Title} from "../ui/Title"
import { myPetsLostState, useMyPetsState } from "hooks/hooksPets"
import { MyPetCard } from "components/MyPetCard"
import { useRecoilValue } from "recoil"

export function MyPets () {
useMyPetsState()

const petsList = useRecoilValue(myPetsLostState)

const pet = petsList?petsList.map(p=>(
              <MyPetCard 
              id={p.id}
              key={p.id}
              email={p.email}
              pictureURL={p.pictureURL} 
              petName={p.petName} 
              description={p.description} 
              ubication={p.ubication}/>
               ))
               :
               <p className={css.p}>Aún no reportaste mascotas perdidas</p>


  return (
    <div className={css.root}>
      <Title>Mis mascotas reportadas</Title>
      <div className={css.card_conteiner}>
      {pet[0]?pet:<p className={css.p}>Aún no reportaste mascotas perdidas</p>}
      </div>
    </div> 
      );
    
  }