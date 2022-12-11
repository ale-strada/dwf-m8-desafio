import React, { useState } from "react"
import { Mapa } from "ui/Map";
import { ButonColores, FormButton } from "ui/Buttons"
import { TextFieldLabel } from "ui/text-field&label"
import { Alert, Title } from "ui/Title";
import {Previews } from "components/Picture";
import { useRecoilState, useRecoilValue } from "recoil";
import {tokenState, userDataState} from "hooks/hooks";
import {useNavigate} from "react-router-dom"
import css from "./index.css"
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { editPet, getPetById, myPetsLostState, petEditState, petGeoLocState, pictureURLState } from "hooks/hooksPets";

export function EditPetForm(){
    const [myPetsLost, setMyPetsLost] = useRecoilState(myPetsLostState)
    const [petEdit, setPetEdit]:any = useRecoilState(petEditState) 
    const user = useRecoilValue(userDataState)
    const MySwal = withReactContent(Swal)
    const token = useRecoilValue(tokenState) 
    const navigate = useNavigate()
    const [petLoc, setPetLoc] = useRecoilState(petGeoLocState)
    const [pictureURL, setPictreURL] = useRecoilState(pictureURLState)
    const[ petName, setPetName] = useState(petEdit.petName)
    const[ description, setDescription] = useState(petEdit.description)
    const[ ubication, setUbication] = useState(petEdit.ubication)
    const [submit,setSubmit] = useState(false) 

    function handleClickUbicacion(){
        navigator.geolocation.getCurrentPosition(p=>{
            const userLoc = [p.coords.latitude,p.coords.longitude]
            navigate("/edit/"+ userLoc,{replace:true}) 
          })
          
    }
  
    function handleSubmit(e){
      e.preventDefault()
        const petData:any = {
            petName:e.target.petName.value,
            ubication:e.target.ubication.value,
            description:e.target.description.value,
            lng:petLoc[0],
            lat:petLoc[1],
            email:user.email,
            id:petEdit.id
        }
        
        if(pictureURL === ""){
           if(submit){
                editPet(petData, token).then(()=>{ 
                 getPetById(petData.id, token).then((r)=>{
                setPetEdit(r)
                 })
                })
                MySwal.fire({
                    title: <Alert>Información actualizada.</Alert>,
                    icon: "success",
                    width:300,
                    confirmButtonColor:"#108896"
                   }).then(()=>{
                    navigate("/mypets",{replace:true})
                   })
            } 
        } else {
            petData.pictureURL = pictureURL
            if(submit){
                editPet(petData, token).then(()=>{ 
                    getPetById(petData.id, token).then((r)=>{
                   setPetEdit(r)
                    })
                   })
                MySwal.fire({
                    title: <Alert>Información actualizada.</Alert>,
                    icon: "success",
                    width:300,
                    confirmButtonColor:"#108896"
                   }).then(()=>{
                    navigate("/mypets",{replace:true})
                   })
            }
        }
      
    }
    function handleChangeName(e){
        setPetName(e.target.value)
    }
    function handleChangeDescription(e){
        setDescription(e.target.value)
    }
    function handleChangeUbication(e){
        setUbication(e.target.value)
    }
    function handleClick(){
        setSubmit(true)
    }
    const [visibility, setVisibility] = useState(false);
    function handleClickFind(){
        setVisibility(!visibility)
    }
    const popupCloseHandler = (e:any) => {
        setVisibility(e);
      };

    return <div className={css.root}>
                <form onSubmit={handleSubmit} className={css.form}>
                    <TextFieldLabel onChange={handleChangeName} value ={petName} name="petName" type="text" label="Nombre de la mascota" />
                    <div className={css.dropzone}>
                        <Previews/>
                    </div>
                    <div>
                        <Mapa/>
                        <ButonColores naranja={true} onClicked={handleClickUbicacion}>Ir a mi ubicación aproximada</ButonColores>
                    </div>
                    <TextFieldLabel onChange={handleChangeUbication} value ={ubication} name="ubication" type="text" label="Indica ciudad y provincia" />
                    <TextFieldLabel onChange={handleChangeDescription} value ={description} name="description" textarea={true} label="Descripción" />
                    <button onClick={handleClick} className={css.button}>Actualizar información</button>
                </form>
           </div>
}