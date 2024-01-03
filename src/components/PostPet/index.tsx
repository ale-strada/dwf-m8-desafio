import React, { useState } from "react"
import { Mapa } from "ui/Map";
import { ButonColores, FormButton } from "ui/Buttons"
import { TextFieldLabel } from "ui/text-field&label"
import { Alert } from "ui/Title";
import {Previews } from "components/Picture";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState, userDataState} from "hooks/hooks";
import {useNavigate} from "react-router-dom"
import css from "./index.css"
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { postPet, petEditState, petGeoLocState, pictureURLState} from "hooks/hooksPets";

export function PostPet(){
    const [petEdit, setPetEdit]:any = useRecoilState(petEditState) 
    const user = useRecoilValue(userDataState)
    const MySwal = withReactContent(Swal)
    const token = useRecoilValue(tokenState) 
    const navigate = useNavigate()
    const [petLoc, setPetLoc] = useRecoilState(petGeoLocState)
    const [pictureURL, setPictreURL] = useRecoilState(pictureURLState)
    const [petName, setPetName] = useState("")
    const [isShowInput, setIsShowInput] = useState(true)

    const [submited, setSubmited] = useState(true)
    function handleClickUbicacion(){
       
        setSubmited(false)
        navigator.geolocation.getCurrentPosition(p=>{
            const userLoc = [p.coords.latitude,p.coords.longitude]
            navigate("/post/"+ userLoc,{replace:true}) 
          })
    }

    function handleOptionClick (){
        const name = "Sin nombre ( mascota encontrada )"
        setIsShowInput(!isShowInput)
        if (isShowInput){
            setPetName(name)
        } else {
            setPetName(null)
            var inputElement = document.getElementById('petNameInput') as HTMLInputElement;
            inputElement.value = "";
        }
    }
    
    function handleSubmit(e){
        e.preventDefault()
        setSubmited (true)
        const petData = {
            petName: isShowInput ? petName : e.target.petName.value,
            ubication:e.target.ubication.value,
            description:e.target.description.value,
            lng:petLoc[0],
            lat:petLoc[1],
            pictureURL:pictureURL,
            email:user.email
        }
        
        if(submited){
          if(petData.lat && petData.petName && petData.pictureURL && petData.ubication){
        postPet(petData, token).then((pet)=>{setPetEdit(pet)})
        MySwal.fire({
            title: <Alert>Mascota Publicada</Alert>,
            icon: "success",
            width:300,
            confirmButtonColor:"#108896",
           }).then(()=>{
            navigate("/mypets",{replace:true})
           })
        } else {
            MySwal.fire({
                title: <Alert>La informacion no esta completa.</Alert>,
                icon: "error",
                width:300,
                confirmButtonColor:"#108896",
               })
        }  
        }
        
    }

    // VER LA FORMA DE PONER EL CAMPO NAME EN VACIO AL VOLVER A TOCAR EL BOTON DE "NO ES MI MASCOTA"
    return <div className={css.root}>
                <form onSubmit={handleSubmit} className={css.form}>
                    <TextFieldLabel 
                        id="petNameInput"
                        name="petName" 
                        type="text" 
                        label="Nombre de la mascota" 
                        option="No es mi mascota, la encontré." 
                        handleOptionClick={handleOptionClick}
                        value = {petName ? petName : null}
                        isShowInput={isShowInput}/>
                    <div className={css.dropzone}>
                        <Previews/>
                    </div>
                    <Mapa/>
                    <ButonColores naranja={true} onClicked={handleClickUbicacion}>Ir a mi ubicación aproximada</ButonColores>
                    <TextFieldLabel name="ubication" type="text" label="Indica ciudad y provincia" isShowInput = {true}/>
                    <TextFieldLabel name="description" textarea={true} label="Descripción" />
                    <FormButton>Publicar mascota</FormButton>
                </form>
            </div>
}