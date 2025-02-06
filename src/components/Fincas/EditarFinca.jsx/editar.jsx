import React, { useState } from "react";
import styles from '../EditarFinca.jsx/editar.module.css' 

export default function editar() {
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
        <h3 className={styles.title}>EDITAR FINCA</h3>
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
            <h2> Ubique su nueva ubicación aquí </h2>
            <h1><i class="bi bi-geo-alt"></i></h1>
          </div>
  
          <button type="submit" className={styles.button}>
          EDITAR
          </button>
        </form>
      </div>
    );
}
