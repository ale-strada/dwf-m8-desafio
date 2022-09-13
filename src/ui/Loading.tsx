import React from "react";
import {RotatingLines} from 'react-loader-spinner'

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
            alignItems:"center"
            }}>
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>;
        }