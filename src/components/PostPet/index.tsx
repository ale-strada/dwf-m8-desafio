import React from "react"
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
    
    function handleClickUbicacion(){
        navigator.geolocation.getCurrentPosition(p=>{
            const userLoc = [p.coords.latitude,p.coords.longitude]
            navigate("/post/"+ userLoc,{replace:true}) 
          })
    }
  
    function handleSubmit(e){
        e.preventDefault()
        const petData = {
            petName:e.target.petName.value,
            ubication:e.target.ubication.value,
            description:e.target.description.value,
            lng:petLoc[0],
            lat:petLoc[1],
            pictureURL:pictureURL,
            email:user.email
        }
        
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
        }
    }
    return <div className={css.root}>
                <form onSubmit={handleSubmit} className={css.form}>
                    <TextFieldLabel name="petName" type="text" label="Nombre de la mascota" />
                    <div className={css.dropzone}>
                        <Previews/>
                    </div>
                    <Mapa/>
                    <ButonColores naranja={true} onClicked={handleClickUbicacion}>Ir a mi ubicación aproximada</ButonColores>
                    <TextFieldLabel name="ubication" type="text" label="Indica ciudad y provincia" />
                    <TextFieldLabel name="description" textarea={true} label="Descripción" />
                    <FormButton>Publicar mascota</FormButton>
                </form>
           </div>
}