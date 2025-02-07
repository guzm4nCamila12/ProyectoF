import React, { useState } from "react"; 
import styles from './registro.module.css'; 

export default function Registro() {
  // Estado inicial del formulario con los campos
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    contrasena: "",
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
      <h2 className={styles.title}>REGISTRO</h2> 
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>Ingrese su nombre:</label> 
          <input
            type="text"
            name="nombre"  // Nombre del campo para gestionar su valor en el estado
            value={formData.nombre}  // Valor del input, vinculado con el estado
            onChange={handleChange}  // Actualiza el estado al cambiar el valor del campo
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
            placeholder="Teléfono"  
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
