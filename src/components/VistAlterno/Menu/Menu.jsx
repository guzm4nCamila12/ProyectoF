import React from "react";
import styles from "../Menu/menu.module.css"; 

const Menu = () => {
  return (
    <div className={styles.container}>
      <h2>MENU</h2>
      <button type="button" className={styles.button}>Ver sensores</button>
      <button type="button" className={styles.button}>Ver datos de la finca</button>
    </div>
  );
};

export default Menu;
