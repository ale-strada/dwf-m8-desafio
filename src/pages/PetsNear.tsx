import { PetsNearCard } from "components/PetsNearCard"
import React, { useState, useEffect } from "react"
import css from "./PetsNear.css"
import {Title} from "../ui/Title"
import { useSearchPets } from "hooks/hooks"

function PetsNear () {
const findPets = useSearchPets() 
console.log(findPets);

const TitleNo = "No hay mascotas perdidas cerca tuyo"
const TitleSi = "Mascotas perdidas cerca tuyo"

  return (
    <div className={css.root}>
      <Title>{findPets[0]? TitleSi : TitleNo}</Title>
      <p className={css.p}>Radio de 2km</p>
      <div className={css.card_conteiner}>
       {findPets.map(p=>(
      <PetsNearCard 
      key={p.objectID}
      email={p.email}
      pictureURL={p.pictureURL} 
      petName={p.petName} 
      description={p.description} 
      ubication={p.ubication}/>
     ))} 
      </div>
    </div>
        
      );
    
  }

export {PetsNear}