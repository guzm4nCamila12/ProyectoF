import React, { useState } from "react";
import styles from "../Sensores/agregar.module.css"; 

const Agregar = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripción: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
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

