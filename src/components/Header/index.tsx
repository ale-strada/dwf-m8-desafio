import React from "react";
import css from "./index.css";
import { BurguerMenu } from "components/BurguerMenu";
import {Logo} from "../../img/iconos"
import {useNavigate} from "react-router-dom"
import { useUserState } from "hooks/hooks";

function Header () {
  const navigate = useNavigate()
    function handleClick(){
      navigate("/",{replace:true}) 
    }
    return (
      <div className={css.root}>
        <BurguerMenu />
         <div onClick={handleClick}className={css.logo}><Logo /></div> 
      </div>
    )

}

export { Header }