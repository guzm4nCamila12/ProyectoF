import React, { useState } from "react";
import styles from "../Sensores/agregar.module.css"; 

const Editar = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
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
      <h2 className={styles.title}>EDITAR SENSOR</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>Ingrese su nuevo nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={styles.input}
            placeholder="Nuevo nombre"
            required
          />
        </div>

        <div>
          <label className={styles.label}>Ingrese su nueva descripción</label>
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className={styles.input}
            placeholder="Nueva descripcion"
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