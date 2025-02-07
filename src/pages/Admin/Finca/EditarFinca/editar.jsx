import React, { useState } from "react"; // Importación de React y useState para manejo de estado
import styles from '../EditarFinca/editar.module.css'

export default function editar() {
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
      <h3 className={styles.title}>EDITAR FINCA</h3> 
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>Ingrese su nuevo nombre:</label> 
          <input
            type="text"
            name="nombre"  //(para la gestión de su valor en el estado)
            value={formData.nombre}  // Valor del input, vinculado con el estado
            onChange={handleChange}  // Llama a la función que actualiza el estado cuando cambia el valor
            className={styles.input}
            placeholder="Nuevo nombre"
            required 
          />
        </div>

        {/* Campo para actualizar la ubicación (esto podría mejorarse con un mapa o selector de ubicación) */}
        <div>
          <h2>Ubique su nueva ubicación aquí</h2>
          <h1><i className="bi bi-geo-alt"></i></h1> 
        </div>
        <button type="submit" className={styles.button}>
          EDITAR 
        </button>
      </form>
    </div>
  );
}
