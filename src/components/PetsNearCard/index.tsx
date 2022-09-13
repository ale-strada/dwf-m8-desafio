import React, { useState } from "react"
import { ButtonCerrarAzul, IconoUbication2 } from "img/iconos"
import css from "./index.css"
import Swal from "sweetalert2"
import { PetInfoCard } from "components/PetInfoCard"
import { PetReportCard } from "components/PetReportCard"
import withReactContent from "sweetalert2-react-content"

type petProps = {
  petName:string,
  description:string,
  pictureURL:string,
  ubication:string,
  id?
  email:string,
}

function PetsNearCard (props:petProps) {
  const MySwal = withReactContent(Swal)



  function handleInformationClick(){
    MySwal.fire({
      showCloseButton:true,
      showConfirmButton:false,
      closeButtonHtml:<ButtonCerrarAzul/>,
      width:300,
      background:"#FFF8ED",
      customClass:{
        closeButton:css.closeButton,
        popup:css.conteiner},
      text:"algo",
      html:<PetInfoCard petName={props.petName} description={props.description} ubication={props.ubication} />,
     })
    }
  const [visibility, setVisibility] = useState(false);

  function handleReportarClick(){
   setVisibility(!visibility)
   
   
  }

   const popupCloseHandler = (e:any) => {
      setVisibility(e);
    };
   
  return (
        <div className={css.pet__box}>
            <img className={css.pet__foto} src={props.pictureURL}/>
            <div className={css.pet__box_description}>
                <div className={css.box}>
                    <h3 className={css.pet__titulo_name}>{props.petName}</h3>
                    <div className={css.pet__ubicacion}>
                      <IconoUbication2/>
                      <p className={css.pet__ubicacion_text}>{props.ubication}</p>
                    </div>
                </div>

                <div className={css.box}>
                  <div className={css.button_box}>
                    <button onClick={handleInformationClick} className={css.button}>Informacion</button>
                  </div>
                  <div className={css.button_box}>
                    <button onClick={handleReportarClick}className={css.button}>Reportar</button>
                  </div>
                  <PetReportCard onClose={popupCloseHandler} show={visibility} email={props.email} petName={props.petName}></PetReportCard>
                </div>
            </div>
        </div>
      );
  }

export {PetsNearCard}