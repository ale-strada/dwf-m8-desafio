import { pictureURLState } from 'hooks/hooksPets';
import { IconoFoto } from 'img/iconos';
import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { useRecoilState } from 'recoil';
import css from "./index.css"


export function Previews(props) {

  const [files, setFiles] = useState([]);
  const [pictureURL, setPictreURL] = useRecoilState(pictureURLState)
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
      })));   

    const currentfile:any = acceptedFiles[0]
    const reader:any = new FileReader();
    reader.readAsDataURL(currentfile)
    reader.onloadend = ()=>{
    setPictreURL( reader.result)
    }
    }
  });

  
  const thumbs = files.map(file => (    
    <div className={css.thumb} key={file.name}>
      <div className={css.thumbInner}>
        <img
          src={file.preview}
          className={css.img}
          onLoad={() => { URL.revokeObjectURL(file.preview)     
        }}
        />
      </div>
    </div>
  ));
    
  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className={css.Container}>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <div className={css.icono_foto}>
            <IconoFoto/>
            <p className={css.p}>Agregar foto</p>
        </div>
      </div>
      <aside className={css.thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}
