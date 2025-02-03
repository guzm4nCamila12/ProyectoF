import React, { useState } from "react";
import styles from "../Sensores/agregar.module.css"; 

const Editar = () => {
  const [formData, setFormData] = useState({
    tipo: "",
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
      <h2 className={styles.title}>Editar sensor</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>Tipo</label>
          <input
            type="text"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className={styles.input}
            placeholder="Escribe su tipo"
            required
          />
        </div>

        <div>
          <label className={styles.label}>Ubicacion</label>
          <input
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            className={styles.input}
            placeholder="Escribe su ubicacion"
            required
          />
        </div>

        <button type="submit" className={styles.button}>
        EDITAR
        </button>
      </form>
    </div>
  );
};

export default Editar;