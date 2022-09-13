import { useEffect, useState } from "react";
import css from "./index.css";
import React from "react";
import { IconoX } from "img/iconos";

export function PetReportCard(props){
  const [show, setShow] = useState(false);
  const [reportado, setReportado] = useState(false)
  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
    setReportado(false)
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  async function SendEmail(emailData) {
    const res = await fetch("https://dwf-m7-final.herokuapp.com/send", {
              method: "post",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                to: emailData.email,
                from: "buscador.de.mascotas.app@gmail.com",
                subject: emailData.nombre,
                text: emailData.description + " mi telefono es:" + emailData.tel,
              }),
            });
        const data = await res.json();
            
        return data
         }

  function handleSubmit(e){
    e.preventDefault()
    setReportado(true)
    const emailData ={
        nombre:e.target.nombre.value,
        tel:e.target.reporterPhone.value,
        description:e.target.description.value,
        email:props.email,
    }
    if(emailData.nombre && emailData.email){
     const mensaje = SendEmail(emailData)
    console.log(mensaje);   
    }else{
        console.log("faltan datos");
        
    }  
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
          <IconoX/>
        </span>

        <div className={css.content}>
            {reportado? 
            <div className={css.box}>
                <h3 className={css.h3} >¡Reporte exitoso!</h3>
                <p className={css.p}>Gracias por ayudar</p>
            </div>
            :
            <div className={css.box}>
                <h3 className={css.h3}>Reportar info de {props.petName}</h3>
                <form onSubmit={handleSubmit} className={css.form}>
                    <label className={css.label}>Tu nomber
                        <input className={css.input} type="text" name="nombre"/>
                    </label>

                    <label className={css.label}>Tu teléfono
                        <input  className={css.input} type="number" name="reporterPhone" />
                    </label>

                    <label className={css.label}>Descripción
                     <textarea className={css.textArea}  name="description"></textarea>
                    </label>

                    <button className={css.button}>enviar</button>
                </form>
            </div>
            }
            </div>
        </div>
    </div>
  );
};
