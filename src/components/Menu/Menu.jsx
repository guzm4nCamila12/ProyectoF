import React from "react";
import styles from "../Menu/menu.module.css"; // Asegúrate de que esta ruta es correcta

const Menu = () => {
  return (
    <div className={styles.container}>
      <h2>MENU</h2>
      <button type="button" className={styles.button}>Gestion de fincas</button>
      <button type="button" className={styles.button}>Gestion de sensores</button>
      <button type="button" className={styles.button}>Estado de sensores</button>
    </div>
  );
};

export default Menu;
