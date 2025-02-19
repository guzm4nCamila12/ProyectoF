import React, { useState, useEffect } from "react";
import styles from '../EditarFinca/editar.module.css';
import Mapa from "../../../../components/Mapa";
import { actualizarFinca, getFincasByIdFincas } from "../../../../services/Fincas/ApiFincas";
import { useParams, useNavigate } from "react-router";
import { acctionSucessful } from "../../../../components/alertSuccesful";

export default function editar() {
  const { id } = useParams();
  const [nombreFinca, setNombreFinca] = useState("");
  const [fincas, setFincas] = useState({});
  const [ubicacion, setUbicacion] = useState(null); // Estado para la ubicación
  const navigate = useNavigate();

  const irAtras = () => {
    navigate(-1);
  };

  useEffect(() => {
    getFincasByIdFincas(id)
      .then(data => {
        setFincas(data);
        setNombreFinca(data.nombre); // Asigna el nombre de la finca
        setUbicacion(data.ubicacion); // Establece la ubicación de la finca
      })
      .catch(error => console.error("Error al cargar la finca:", error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombreFinca || !ubicacion?.lat || !ubicacion?.lng) {
      acctionSucessful.fire({
        icon: "error",
        title: "Debe ingresar un nombre y seleccionar una ubicación",
      });
      return; // Detener el envío del formulario
    }

    const fincaActualizada = {
      nombre: nombreFinca,
      idUsuario: fincas.idusuario,
      ubicacion,
    };

    try {
      actualizarFinca(id, fincaActualizada)
        .then(() => {
          acctionSucessful.fire({
            icon: "success",
            title: "Finca actualizada correctamente",
          });
          irAtras();
        })
        .catch((error) => {
          acctionSucessful.fire({
            icon: "error",
            title: "Error al actualizar la finca",
          });
          console.error("Error al actualizar finca:", error);
        });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
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
            name="nombreFinca"
            value={nombreFinca}
            onChange={(e) => setNombreFinca(e.target.value)}
            className={styles.input}
            placeholder={fincas.nombre}
            autoComplete="off"
          />
        </div>

        <div>
          <h1><i className="bi bi-geo-alt"></i></h1>
          {/* Solo renderizamos el mapa si ubicacion no es null */}
          {ubicacion ? (
            <Mapa setUbicacion={setUbicacion} ubicacion={ubicacion} />
          ) : (
            <p>Cargando mapa...</p>
          )}
        </div>

        <div>
          <p>Ubicación Actual: {ubicacion ? `${ubicacion.lat}, ${ubicacion.lng}` : "Cargando..."}</p>
        </div>

        <button type="submit" className={styles.button}>
          EDITAR
        </button>
      </form>
    </div>
  );
}