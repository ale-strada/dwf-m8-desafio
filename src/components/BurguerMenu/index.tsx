import React,{useState} from "react";
import {useNavigate} from "react-router-dom"
import css from "./index.css"
import {IconoMisDatos, IconoMisMascotas, IconoReportar} from "../../img/iconos"
import {useRecoilState, useRecoilValue} from "recoil"
import {loadLocalToken, tokenState,userDataState, useUserState} from "hooks/hooks"


function BurguerMenu () {
const navigate = useNavigate()
const [token, setToken] = useRecoilState(tokenState)
const [sesion, setSesion] = useState("iniciar sesion")
const userData:any = useRecoilValue(userDataState)
const [displayMenu, setDisplayMenu] = useState(false)
const userEmail = userData.email



function handleClick(){
  displayMenu? setDisplayMenu(false): setDisplayMenu(true)
  token? setSesion("cerrar sesion"):setSesion("iniciar sesion")
}

function handleCerrarSesion(){
  if(token === ""){
    setSesion("cerrar sesion")
    navigate("/login",{replace:true})
    setDisplayMenu(false)
  }else{
    setSesion("iniciar sesion")
    setToken("")
    localStorage.setItem("token","")
    location.reload()
    setDisplayMenu(false)
  }
}
function handleClickMisDatos(){
  if(token === ""){
    navigate("/login",{replace:true})
    setDisplayMenu(false)
  }else{
    navigate("/signup",{replace:true})
    setDisplayMenu(false)
  }
}
function handleClickMisMascotas(){
  if(token === ""){
    navigate("/login",{replace:true})
    setDisplayMenu(false)
  }else{
    navigate("/mypets",{replace:true})
    setDisplayMenu(false)
  }
}
function handleClickReportar(){
  if(token === ""){
    navigate("/login",{replace:true})
    setDisplayMenu(false)
  }else{
    navigate("/post",{replace:true})
    setDisplayMenu(false)
  }
}
const menuStyle = displayMenu? {display:"inherit"}:{display:""}
    return (
      <div>
          <div className={css.button_box}>
            <button className={css.header__abrirmenu} onClick={handleClick}>☰</button> 
          </div>
          
          <div style={menuStyle} className={css.header__menu}>
            <div className={css.button_box}>
              <button className={css.header__cerrarmenu} onClick={handleClick}>X</button>
            </div>
            
            
            <div className={css.header__menuopcionescontainer}>  
              <div className={css.header__menuopcion}>
                <IconoMisDatos/>
                <a onClick= {handleClickMisDatos}className={css.header__menuopcion_link}>Mis Datos</a>
              </div>
              <div className={css.header__menuopcion}>
                <IconoMisMascotas/>
                <a onClick= {handleClickMisMascotas} className={css.header__menuopcion_link}>Mis Mascotas</a>
              </div>
              <div className={css.header__menuopcion}>
                <IconoReportar/>
                <a onClick= {handleClickReportar} className={css.header__menuopcion_link}>Reportar</a>
              </div>
            </div>   
            <div className={css.header__user_menu}>
              <p className={css.header__user_menu_usermail}>{userEmail}</p> 
              <div className={css.button_box}>
               <button onClick={handleCerrarSesion} className={css.header__user_menu_cerrarsesion}>{sesion}</button> 
              </div> 
            </div>  
          </div>
      </div>
    )

}

export { BurguerMenu }



 