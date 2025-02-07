import React, { useState } from "react";
import styles from './registro.module.css'

export default function Registro() {
  const [formData, setFormData] = useState({
      nombre: "",
      telefono: "",
      correo: "",
      contrasena: "",
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
        <h2 className={styles.title}>REGISTRO</h2>
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
            <label className={styles.label}>Ingrese un teléfono:</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={styles.input}
              placeholder="Telefono"
              required
            />
          </div>
          <div>
            <label className={styles.label}>Ingrese un correo:</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className={styles.input}
              placeholder="Correo"
              required
            />
          </div>
          <div>
            <label className={styles.label}>Ingrese una contraseña:</label>
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              className={styles.input}
              placeholder="Contraseña"
              required
            />
          </div>
  
          <button type="submit" className={styles.button}>
          REGISTRAR TRABAJADOR
          </button>
        </form>
      </div>
    );
}
