import React, { useState } from "react"
import { ButonColores, FormButton } from "ui/Buttons"
import {  Title } from "ui/Title";
import { useRecoilState, useRecoilValue } from "recoil";
import { petEditState } from "hooks/hooksPets";
import {useNavigate} from "react-router-dom"
import css from "./post.css"
import { PopupFind } from "components/PopupFind";
import { EditPetForm } from "components/EditPetForm";

export function EditPet(){
    const [petEdit, setPetEdit]:any = useRecoilState(petEditState) 
    const navigate = useNavigate()
    

    function handleClickCAncelar(){
       navigate("/",{replace:true}) 
    }
    const [visibility, setVisibility] = useState(false);
    function handleClickFind(){
        setVisibility(!visibility)
    }
    const popupCloseHandler = (e:any) => {
        setVisibility(e);
      };

    return <div className={css.root}>
                <Title>Publicar mascota perdida</Title>
                <EditPetForm/>
                <FormButton onClick={handleClickFind}>Mascota encontrada</FormButton>
                <PopupFind onClose={popupCloseHandler} show={visibility} id={petEdit.id}></PopupFind>
                <ButonColores naranja={false} onClicked={handleClickCAncelar}>Cancelar</ButonColores>
           </div>
}