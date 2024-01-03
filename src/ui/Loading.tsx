import React from "react";
import {RotatingLines} from 'react-loader-spinner'
import css from "../pages/login.css"

export function Loading() {
    
  return <div style={{
                position:"absolute", 
                top:0, 
                bottom:0, 
                left:0, 
                right:0, 
                backgroundColor: "rgba(0, 0, 0, 0.25)",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column",
                }}>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginBottom:"40px" }}>
                    <p style={{
                        fontFamily: 'Roboto',
                        fontStyle: "normal",
                        fontWeight: 700,
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: '#108896',
                        margin: '10px 30px',
                        }}>Estamos buscando la información que solicitas</p>
                    <p style={{
                        fontFamily: 'Roboto',
                        fontStyle: "normal",
                        fontWeight: 700,
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: '#108896',
                        margin: '10px 30px',
                        }}> Este proceso puede demorar un poco</p>
                </div>
                <RotatingLines
                    strokeColor='#108896'
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
            </div>
        }