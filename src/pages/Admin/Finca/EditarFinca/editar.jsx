import React, { useState, useEffect } from "react"; // Importación de React y useState para manejo de estado
import styles from '../EditarFinca/editar.module.css'
import Mapa from "../../../../components/Mapa";
import { actualizarFinca, getFincasByIdFincas } from "../../../../services/Fincas/ApiFincas";
import { useParams, useNavigate } from "react-router"
import { acctionSucessful } from "../../../../components/alertSuccesful";

export default function editar() {
  const { id } = useParams();
  // Definición del estado inicial del formulario (nombre y ubicación)
  const [nombreFinca, setNombreFinca] = useState("")
  const [fincas, setFincas] = useState({});
  const [ubicacion, setUbicacion] = useState({});
  const navigate = useNavigate();


  const irAtras = () => {
    navigate(-1)
  }

  useEffect(() => {

    getFincasByIdFincas(id)
      .then(data => setFincas(data))


  }, []);

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const fincaActualizada = {
      nombre: nombreFinca,
      idUsuario: fincas.idusuario,
      ubicacion
    };
    try {
      actualizarFinca(id, fincaActualizada)
        .then(data => console.log(data))
      acctionSucessful.fire({
        icon: "success",
        title: "Finca actualizada correctamente"
      });

    } catch {

    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>EDITAR FINCA {fincas.nombre}</h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>Ingrese su nuevo nombre:</label>
          <input
            type="text"
            name="nombreFinca"  //(para la gestión de su valor en el estado)
            value={nombreFinca}  // Valor del input, vinculado con el estado
            onChange={(e) => setNombreFinca(e.target.value)}  // Llama a la función que actualiza el estado cuando cambia el valor
            className={styles.input}
            placeholder={fincas.nombre}
            required
          />
        </div>

        {/* Campo para actualizar la ubicación (esto podría mejorarse con un mapa o selector de ubicación) */}
        <div>
          <h1><i className="bi bi-geo-alt"></i></h1>
          <Mapa setUbicacion={setUbicacion} />
        </div>

        <div>
        <p>Ubicacion Actual: {ubicacion.lat} <br /> {ubicacion.lng}</p> {/* Muestra la ubicación actual */}
        </div>

        <button type="submit" className={styles.button} onClick={irAtras}>
          EDITAR
        </button>
      </form>
    </div>
  );
}