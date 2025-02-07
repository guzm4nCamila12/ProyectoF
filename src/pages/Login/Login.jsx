import React, { useState } from "react";  // Importación de React y useState para manejar el estado
import styles from "./login.module.css";  

const Login = () => {
  // Estado para almacenar el valor del correo electrónico y la contraseña
  const [email, setEmail] = useState("");  // Estado para el correo electrónico
  const [password, setPassword] = useState("");  // Estado para la contraseña

  // Función que maneja el envío del formulario de inicio de sesión
  const handleSubmit = (e) => {
    e.preventDefault();  
    console.log("Email:", email, "Password:", password); 
  };

  return (
    <div className={styles.container}> 
      <h2>Inicio Sesión</h2> 
      
      <form onSubmit={handleSubmit} className={styles.form}>
        
        <input
          type="email"
          placeholder="Correo electrónico" 
          value={email}  // El valor del input está vinculado al estado email
          onChange={(e) => setEmail(e.target.value)}  // Actualiza el estado email con el valor ingresado
          required 
          className={styles.input} 
        />
        
        <input
          type="password"
          placeholder="Contraseña"
          value={password}  // El valor del input está vinculado al estado password
          onChange={(e) => setPassword(e.target.value)}  // Actualiza el estado password con el valor ingresado
          required  
          className={styles.input}  
        />
        
        <button type="submit" className={styles.button}>Ingresar</button>
      </form>
    </div>
  );
};

export default Login;  
