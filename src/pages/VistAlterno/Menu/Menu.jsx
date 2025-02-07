import React from "react";  // Importación de React
import styles from "./menu.module.css";  

const Menu = () => {
  return (
    <div className={styles.container}>  
      <h2>MENU</h2>  

      {/* Botón para ver los sensores */}
      <button type="button" className={styles.button}>
        Ver sensores
      </button>

      {/* Botón para ver los datos de la finca */}
      <button type="button" className={styles.button}>
        Ver datos de la finca
      </button>
    </div>
  );
};

export default Menu;  