import React, { useState } from "react"; // Importación de React y useState para manejo de estado
import styles from "../AgregarSensor/agregar.module.css"; 

const Agregar = () => {
  // Definición del estado inicial del formulario (nombre y descripción)
  const [formData, setFormData] = useState({
    nombre: "",
    descripción: "",
  });

  // Maneja los cambios de los campos del formulario
  const handleChange = (e) => {
    // Se actualiza el estado del formulario con el valor correspondiente
    setFormData({
      ...formData, // Se preservan los valores actuales de formData
      [e.target.name]: e.target.value, // Se actualiza el campo que cambia
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>AGREGAR SENSOR</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>Ingrese su nombre:</label>
          <input
            type="text"
            name="nombre" // (para la gestión de su valor en el estado)
            value={formData.nombre} // Valor del input, vinculado con el estado
            onChange={handleChange} // Llama a la función que actualiza el estado cuando cambia el valor
            className={styles.input}
            placeholder="Nombre"
            required
          />
        </div>

        <div>
          <label className={styles.label}>Ingrese una descripción:</label>
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className={styles.input}
            placeholder="Descripcion"
            required
          />
        </div>

        <button type="submit" className={styles.button}>
        AGREGAR
        </button>
      </form>
    </div>
  );
};

export default Agregar;

