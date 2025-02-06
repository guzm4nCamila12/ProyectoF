import React, { useState } from "react";
import styles from "./agregar.module.css"; 

const Agregar = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    ubicacion: "",
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
      <h3 className={styles.title}>AGREGAR FINCA</h3>
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
          <h2> Ubique su ubicación aquí </h2>
          <h1><i class="bi bi-geo-alt"></i></h1>
        </div>

        <button type="submit" className={styles.button}>
        AGREGAR
        </button>
      </form>
    </div>
  );
};

export default Agregar;