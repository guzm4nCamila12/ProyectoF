/*import React, { useState } from "react"; // Importación de React y useState para manejo de estado
import styles from "./agregar.module.css";
import Mapa from "../../../../components/Mapa";
import { insertarFinca } from "../../../../services/Fincas/ApiFincas";

const Agregar = () => {

  
  const [ubicacion,setUbicacion] = useState([4.8088736064112, -75.68756103515626])
  // Definición del estado inicial del formulario (nombre y ubicación)
  const [formData, setFormData] = useState({
    nombre: "",
    ubi: ubicacion,
  });


  const [nuevaFinca,setNuevaFinca] = useState({nombre: formData.nombre, idUsuario: 27 ,ubicacion: formData.ubi} )
  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value,  
    });
  };
  console.log("form:",formData)
  console.log("nueva finca:",nuevaFinca)

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); 
        const nueva = { 
            nombre: nuevaFinca.nombre, 
            idUsuario: nuevaFinca.idUsuario,
            ubicacion: nuevaFinca.ubicacion,  
        };
        console.log("nueva: ",nueva)
        try {
          console.log("try:",nueva)
          const data = await insertarFinca(
            nueva
          );
          console.log(nueva)
          if (data) {
            setNuevaFinca({ nombre: "",idUsuario: "",ubicacion: ""});
    
            acctionSucessful.fire({
              icon: "success",
              title: "Finca agregada correctamente"
            });
    
          }
        } catch (error) {
          console.error("Error en la solicitud:", error);
        }
    console.log("Datos enviados:", formData); 
    console.log("Ubicacion: ",ubicacion)
  };

  

  return (
    <div className={styles.container}> 
      <h3 className={styles.title}>AGREGAR FINCA</h3> 
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>Ingrese su nombre:</label>
          <input
            type="text"
            name="nombre"  // (para la gestión de su valor en el estado)
            value={formData.nombre}  // Valor del input, vinculado con el estado
            onChange={handleChange}  // Llama a la función que actualiza el estado cuando cambia el valor
            className={styles.input} 
            placeholder="Nombre"
            required 
          />
        </div>

        {/* Campo para ubicación (esto podría ser mejorado con un mapa o selector de ubicación) */
        /*<div>
          <h1><i className="bi bi-geo-alt"></i></h1>
          <Mapa setUbicacion={setUbicacion}/>
        </div>
        <button type="submit" className={styles.button}>
          AGREGAR
        </button>
      </form>
      <div>
        <p>Ubicacion Actual: {ubicacion[0]},{ubicacion[1]}</p>
      </div>
    </div>
  );
};

export default Agregar*/








import React, { useState } from "react"; // Importación de React y useState para manejo de estado
import styles from "./agregar.module.css";
import Mapa from "../../../../components/Mapa";
import { insertarFinca } from "../../../../services/Fincas/ApiFincas";

const Agregar = () => {
  const [nombre, setNombre] = useState("")
  const [ubicacion, setUbicacion] = useState({ lat: 4.8088736064112, lng: -75.68756103515626 }); // Ubicación inicial en formato { lat, lng }
  

 

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const nuevaFinca = { 
      idUsuario: 1,
      nombre,
      ubicacion
    };
    console.log("nueva:", nuevaFinca);

    


    
    // try {
    //   const data = await insertarFinca(nueva); // Aquí haces la llamada para insertar la finca
    //   console.log("Datos enviados:", nueva);

    //   if (data) {
    //     setNuevaFinca({ nombre: "", idUsuario: "", ubicacion: {} }); // Resetea los valores después de insertar

    //     acctionSucessful.fire({
    //       icon: "success",
    //       title: "Finca agregada correctamente",
    //     });
    //   }
    // } catch (error) {
    //   console.error("Error en la solicitud:", error);
    // }
  };

  return (
    <div className={styles.container}> 
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
        
        <button type="submit" className={styles.button}>
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
