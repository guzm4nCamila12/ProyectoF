import React, { useState } from "react"; // Importación de React y useState para manejo de estado
import styles from "./agregar.module.css";
import Mapa from "../../../../components/Mapa";//Importamos el componente que contiene el mapa
import { insertarFinca } from "../../../../services/Fincas/ApiFincas";//Importamos el metodo insertarFinca de la ApiFincas
import { acctionSucessful } from "../../../../components/alertSuccesful";//Importamos el mensaje de registro de finca exitoso
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate, useParams } from "react-router"
import BotonAtras from "../../../../components/BotonAtras";
const Agregar = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState("")
  const [ubicacion, setUbicacion] = useState({ lat: 4.8088736064112, lng: -75.68756103515626 });
  const navigate = useNavigate();

  const irAtras = () =>{
    navigate(-1)
  }
  
  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const nuevaFinca = { 
      idUsuario: Number(id),
      nombre,
      ubicacion
    };

    insertarFinca(nuevaFinca)

    acctionSucessful.fire({
      icon: "success",
      title: "Finca Insertada Correctamente"
    });

  };

  return (
    <div className={styles.container}> 
    <BotonAtras /> 
      <h3 className={styles.title}>AGREGAR FINCA</h3> 
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>Ingrese su nombre:</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={styles.input} 
            placeholder="Nombre"
            required 
          />
        </div>

        <div>
          <h1><i className="bi bi-geo-alt"></i></h1>
          <Mapa setUbicacion={setUbicacion} /> {/* Mapa que actualiza la ubicación */}
        </div>
        

        <button type="submit" className={styles.button} onClick={irAtras}>
          AGREGAR
        </button>

        
      </form>
      
      <div>
        <p>Ubicacion Actual: {ubicacion.lat}, {ubicacion.lng}</p> {/* Muestra la ubicación actual */}
      </div>
    </div>
  );
};

export default Agregar;