import React, { useState } from "react";  // Importación de React y useState para manejar el estado
import styles from "./login.module.css";  
import { login } from "../../services/Usuarios/ApiUsuarios";

const Login = () => {
  // Estado para almacenar el valor del correo electrónico y la contraseña
  const [telefono, setTelefono] = useState("");  // Estado para el correo electrónico
  const [clave, setClave] = useState("");  // Estado para la contraseña

  // Función que maneja el envío del formulario de inicio de sesión
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const inicioUsuario = { telefono, clave };
  
    try {
      const data = await login(inicioUsuario);
      if(data){
        
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  };


  return (
    <div className={styles.container}> 
      <h2>Inicio Sesión</h2> 
      
      <form onSubmit={handleSubmit} className={styles.form}>
        
        <input
          type="number"
          placeholder="Número de teléfono" 
          value={telefono}  // El valor del input está vinculado al estado email
          onChange={(e) => setTelefono(e.target.value)}  // Actualiza el estado email con el valor ingresado
          required 
          className={styles.input} 
        />
        
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}  // El valor del input está vinculado al estado clave
          onChange={(e) => setClave(e.target.value)}  // Actualiza el estado clave con el valor ingresado
          required  
          className={styles.input}  
        />
        
        <button type="submit" className={styles.button}>Ingresar</button>
      </form>
    </div>
  );
};

export default Login;  
