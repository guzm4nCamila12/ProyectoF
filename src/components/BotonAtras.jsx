import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function BotonAtras () {

    const navigate = useNavigate();

    const irAtras = () =>{
      navigate(-1)
    }



  return (
    <div><button type="button" className="btn-close  position-absolute top-0 end-0 m-3" onClick={irAtras} ></button></div>
  )
}
