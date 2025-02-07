import React from "react";
import styles from "./menu.module.css"; 
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className={styles.container}>
      <h2>MENU</h2>
      <Link to={`/agregar-sensor`}>
      <button type="button" className={styles.button}>Agregar sensor</button>
      </Link>
      <Link to={`/registro-trabajador`}>
      <button type="button" className={styles.button}>Registrar trabajador</button>
      </Link>
      <button type="button" className={styles.button}>Ver sensores</button>
      <button type="button" className={styles.button}>Ver datos de la finca</button>
    </div>
  );
};

export default Menu;
