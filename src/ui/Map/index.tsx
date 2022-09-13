
import { mapboxgl } from "lib/mapbox";
import React, { useRef, useEffect, useState } from 'react';
import css from "./index.css"
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { petGeoLocState } from "hooks/hooksPets";



export function Mapa(){
    const [petLoc, setPetLoc] = useRecoilState(petGeoLocState)
    const params = useParams();
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-64.28802530721768);
    const [lat, setLat] = useState(-31.2999610245013);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
        });
        });
 
    function addMarker(){
        const marker = new mapboxgl.Marker().setLngLat([lng,lat]).addTo(map.current);
        //aca estan las coordenadas para cargar en la info de la pet
        setPetLoc([lng,lat])
        return [lat,lng] 
       }
    
   
    function handleClick(){
            addMarker()
        }

     useEffect(()=>{
     map.current.on("click",(e)=>{
        setLng(e.lngLat.lng)
        setLat(e.lngLat.lat)})
        },[lng,lat])


    useEffect(()=>{
        if(params.lat && params.lng){  
          map.current.flyTo({
            center: [params.lng, params.lat],
            zoom: 15,
          });  
        }   
    },[params])

    return (
            <div className={css.root}>
            <span className={css.span}>Marcá en el mapa dónde lo viste por última vez</span>
            <div onClick={handleClick} ref={mapContainer} className={css.map_container} />
            </div>
            );
}