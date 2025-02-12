import React, { useState } from "react";  // Importación de React y useState para manejar el estado
import styles from "./login.module.css";  
import { useNavigate } from "react-router-dom";
import { getUsuarioById, login } from "../../services/Usuarios/ApiUsuarios";

const Login = () => {
  // Estado para almacenar el valor del correo electrónico y la contraseña
  const [telefono, setTelefono] = useState("");  // Estado para el correo electrónico
  const [clave, setClave] = useState("");  // Estado para la contraseña
  const [idUsuarioRol, setIdUsuarioRol] = useState("");
  const navigate = useNavigate();



  // Función que maneja el envío del formulario de inicio de sesión
  const handleSubmit = async (e) => {
    e.preventDefault();

    const inicioUsuario = {
      telefono, clave
    }

    login(inicioUsuario)
    .then(data => setIdUsuarioRol(data.id_rol))

    
      if(idUsuarioRol== 1){
        console.log("SuperAdmin")
        navigate("/inicio-SuperAdmin")
        
      }
      if(idUsuarioRol== 2){
        console.log("Admin")
        navigate(`/lista-fincas/${id}`)
        return
      }
      if(idUsuarioRol== 3){
        console.log("Alterno")
        return
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
