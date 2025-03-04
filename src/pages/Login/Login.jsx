import React, { useState } from "react";  // Importación de React y useState para manejar el estado
import styles from "./login.module.css";  
import { useNavigate } from "react-router-dom";
import { login } from "../../services/Usuarios/ApiUsuarios";

const Login = () => {
  // Estado para almacenar el valor del correo electrónico y la contraseña
  const [telefono, setTelefono] = useState("");  // Estado para el correo electrónico
  const [clave, setClave] = useState("");  // Estado para la contraseña
  const [usuario, setUsuario] = useState(null);  // Estado para almacenar el usuario
  const navigate = useNavigate();
  
  // Función que maneja el envío del formulario de inicio de sesión
  const handleSubmit = async (e) => {
    e.preventDefault();

    const inicioUsuario = {
      telefono, clave
    };

    // Llamada asincrónica a la API para obtener el usuario
    login(inicioUsuario)
      .then((data) => {
        setUsuario(data);  // Actualiza el estado con los datos del usuario
        
        // Lógica de navegación después de que se haya actualizado el estado
        if (data.id_rol === 1) {
          console.log(data.id);
          navigate("/inicio-SuperAdmin");
        } else if (data.id_rol === 2) {
          console.log("Admin");
          navigate(`/lista-fincas/${data.id}`);
        } else if (data.id_rol === 3) {
          console.log("Alterno");
          navigate(`/activar-sensores/${data.id_finca}`);
        }
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        // Manejo de errores si la API falla
      });
  };

  return (
    <div className={styles.container}> 
      <h2>Inicio Sesión</h2> 
      
      <form onSubmit={handleSubmit} className={styles.form}>
        
        <input
          type="number"
          placeholder="Número de teléfono" 
          value={telefono}  // El valor del input está vinculado al estado telefono
          onChange={(e) => setTelefono(e.target.value)}  // Actualiza el estado telefono con el valor ingresado
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
