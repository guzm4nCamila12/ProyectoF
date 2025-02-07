import React, { useState } from "react"; // Importación de React y useState para manejo de estado
import styles from "./agregar.module.css";

const Agregar = () => {
  // Definición del estado inicial del formulario (nombre y ubicación)
  const [formData, setFormData] = useState({
    nombre: "",
    ubicacion: "",
  });

  // Maneja los cambios de los campos del formulario
  const handleChange = (e) => {
    // Se actualiza el estado del formulario con el valor correspondiente
    setFormData({
      ...formData,  // Se preservan los valores actuales de formData
      [e.target.name]: e.target.value,  // Se actualiza el campo que cambia
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("Datos enviados:", formData); 
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

        {/* Campo para ubicación (esto podría ser mejorado con un mapa o selector de ubicación) */}
        <div>
          <h2>Ubique su ubicación aquí</h2>
          <h1><i className="bi bi-geo-alt"></i></h1>
        </div>
        <button type="submit" className={styles.button}>
          AGREGAR
        </button>
      </form>
    </div>
  );
};

export default Agregar
