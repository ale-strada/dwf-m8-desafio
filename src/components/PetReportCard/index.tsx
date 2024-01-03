import { useEffect, useState } from "react";
import css from "./index.css";
import React from "react";
import { IconoX } from "img/iconos";

export function PetReportCard(props){
  const [show, setShow] = useState(false);
  const [reportado, setReportado] = useState(false)
  const [sinDatos, setSinDatos] = useState(false)
  const [encontrada, setEncontrada] = useState(false)

  useEffect(()=>{
    if(props.petName === "Sin nombre ( mascota encontrada )"){
  console.log("encontrada", props);
  setEncontrada(true)
}
},[props.petName])
  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
    setReportado(false)
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  async function SendEmail(emailData) {
    const res = await fetch("https://pet-finder-app.onrender.com/send", {
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
    const emailData ={
      nombre:e.target.nombre.value,
      tel:e.target.reporterPhone.value,
      description:e.target.description.value,
      email:props.email,
    }
    if(emailData.nombre && emailData.email && emailData.description){
      const mensaje = SendEmail(emailData)
      setReportado(true)
      console.log(mensaje);   
    }else{
        setSinDatos(true)
        console.log("faltan datos"); 
    }  
  }

  function handleContent(){
    if(reportado){
      return reporto
    }else if (sinDatos){
      return formSinDatos}
  else{
    return formReportar
  }}
  const reporto =  <div className={css.box}>
                          <h3 className={css.h3} >¡Reporte exitoso!</h3>
                          <p className={css.p}>Gracias por ayudar</p>
                        </div>;

   const formReportar = <div className={css.box}>
                            {encontrada ? 
                              <div style={{marginBottom:"10px"}}>
                                <h3 className={css.h3} style={{marginBottom:"5px"}}>Es tu mascota?</h3>
                                <h6 className={css.p}>Solicita informacion para recuperarla</h6>
                              </div>
                            : 
                              <h3 className={css.h3}>Reportar info de {props.petName}</h3>
                            }
                            
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
    const formSinDatos = <div className={css.box}>
                            <h3 className={css.h3}>Reportar info de {props.petName}</h3>
                            <form onSubmit={handleSubmit} className={css.form}>
                                <label className={css.label}>Tu nomber <span className={css.span}>*Este campo es obligatorio</span>
                                    <input className={css.input_error} type="text" name="nombre"/>
                                </label>
                                <label className={css.label}>Tu teléfono <span className={css.span}>*Este campo es obligatorio</span>
                                    <input  className={css.input_error} type="number" name="reporterPhone" />
                                </label>
                                <label className={css.label}>Descripción <span className={css.span}>*Este campo es obligatorio</span>
                                 <textarea className={css.textArea_error}  name="description"></textarea>
                                </label>
                                <button className={css.button}>enviar</button>
                            </form>
                          </div>


    const content = handleContent()
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
            {/* -------------------------------- */}
            
            {content}
            {/* -------------------------------- */}
            </div>
        </div>
    </div>
  );
};




// {reportado? 
//   <div className={css.box}>
//       <h3 className={css.h3} >¡Reporte exitoso!</h3>
//       <p className={css.p}>Gracias por ayudar</p>
//   </div>
//   :
//   <div className={css.box}>
//       <h3 className={css.h3}>Reportar info de {props.petName}</h3>
//       <form onSubmit={handleSubmit} className={css.form}>
//           <label className={css.label}>Tu nomber
//               <input className={css.input} type="text" name="nombre"/>
//           </label>

//           <label className={css.label}>Tu teléfono
//               <input  className={css.input} type="number" name="reporterPhone" />
//           </label>

//           <label className={css.label}>Descripción
//            <textarea className={css.textArea}  name="description"></textarea>
//           </label>

//           <button className={css.button}>enviar</button>
//       </form>
//   </div>
//   }