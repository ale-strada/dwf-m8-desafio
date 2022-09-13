import { useEffect, useState } from "react";
import css from "./index.css";
import React from "react";
import {IconoXblanco } from "img/iconos";
import { useRecoilState, useRecoilValue } from "recoil";
import {tokenState, deletePet } from "hooks/hooks";
import { myPetsLostState, petEditState } from "hooks/hooksPets";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Alert } from "ui/Title";

export function PopupFind(props){
  const [myPetsLost, setMyPetsLost] = useRecoilState(myPetsLostState)
  const [petEdit, setPetEdit]:any = useRecoilState(petEditState) 
  const [show, setShow] = useState(false);
  const [reportado, setReportado] = useState(false)
  const token = useRecoilValue(tokenState) 
  const id = props.id
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)
  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
    setReportado(false)
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

 function handleConfirmClick(){
    deletePet(id, token)
    myPetsLost.forEach(p => {
      if(p.id === id){
        setPetEdit(p)
      }
    });
    MySwal.fire({
      title: <Alert>Mascota encontrada.</Alert>,
      icon: "success",
      width:300,
      confirmButtonColor:"#108896"
     }).then(()=>{
      navigate("/mypets",{replace:true})
     })
  }

  return (
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0"
      }}
      className={css.overlay}
         >
        <div className={css.popup}>
            <span className={css.close} onClick={closeHandler}>
              <IconoXblanco/>
            </span>
            <h3 className={css.h3} >Reportar como encontrada</h3>
            <p className={css.p}>Si confirmas esta acción se eliminará la mascota de la base de datos.</p>
            <button onClick={handleConfirmClick} className={css.button}>Confirmar</button>
        </div>
    </div>
  );
};
