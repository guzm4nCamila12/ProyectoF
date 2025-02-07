import React, { useState } from "react";  // Importación de React y useState para manejar el estado
import styles from "../EditarSensor/editar.module.css"; 

const Editar = () => {
  // Estado inicial del formulario con los campos: nombre y descripcion
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
  });

  // Función que maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,  // Mantiene los valores previos del formulario
      [e.target.name]: e.target.value,  // Actualiza el campo específico con el nuevo valor
    });
  };

  // Función que maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();  
    console.log("Datos enviados:", formData);  
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>EDITAR SENSOR</h2> 
      
      <form onSubmit={handleSubmit} className={styles.form}>
        
        <div>
          <label className={styles.label}>Ingrese su nuevo nombre:</label>  
          <input
            type="text"
            name="nombre"  // Nombre del campo para asociarlo con el estado
            value={formData.nombre}  // Valor del campo vinculado al estado
            onChange={handleChange}  // Actualiza el estado con el nuevo valor del campo
            className={styles.input}  
            placeholder="Nuevo nombre" 
            required  
          />
        </div>
        
        <div>
          <label className={styles.label}>Ingrese su nueva descripción:</label>  
          <input
            type="text"
            name="descripcion"  
            value={formData.descripcion}  
            onChange={handleChange}  
            className={styles.input}  
            placeholder="Nueva descripción" 
            required  
          />
        </div>
        
        <button type="submit" className={styles.button}>
          EDITAR SENSOR  
        </button>
      </form>
    </div>
  );
};

export default Editar; 
