import React from "react";
import styles from "./menu.module.css"; 
import { Link } from "react-router-dom";  // Importación de Link de react-router-dom para navegación


const Menu = () => {
  return (
    <div className={styles.container}>
      <p>(nombre finca)</p>
      <h2>MENU</h2> 
      
      {/* Enlace a la página para agregar un sensor */}
      <Link to={`/agregar-sensor`}>
        <button type="button" className={styles.button}>Agregar sensor</button> 
      </Link>
      
      {/* Enlace a la página para registrar un trabajador */}
      <Link to={`/registro-trabajador`}>
        <button type="button" className={styles.button}>Registrar trabajador</button> 
      </Link>
      
      {/* Enlace a la página para ver sensores */}
      <button type="button" className={styles.button}>Ver sensores</button>
      
      {/* Enlace a la página para ver datos de la finca */}
      <button type="button" className={styles.button}>Ver datos de la finca</button>
    </div>
  );
};

export default Menu;

