import React, { useState, useEffect } from "react";
import styles from '../EditarFinca/editar.module.css';
import Mapa from "../../../../components/Mapa";
import { actualizarFinca, getFincasByIdFincas } from "../../../../services/Fincas/ApiFincas";
import { useParams, useNavigate } from "react-router";
import { acctionSucessful } from "../../../../components/alertSuccesful";
import BotonAtras from "../../../../components/BotonAtras";
export default function editar() {
  const { id } = useParams();
  const [nombreFinca, setNombreFinca] = useState("");
  const [fincas, setFincas] = useState({});
  const [ubicacion, setUbicacion] = useState(null); // Estado para la ubicación
  const [originalFinca, setOriginalFinca] = useState({}); // Estado para almacenar los datos originales
  const navigate = useNavigate();

  const irAtras = () => {
    navigate(-1);
  };

  useEffect(() => {
    getFincasByIdFincas(id)
      .then(data => {
        setFincas(data);
        setOriginalFinca(data); // Guardamos los datos originales
        setNombreFinca(data.nombre); // Asigna el nombre de la finca
        setUbicacion(data.ubicacion); // Establece la ubicación de la finca
      })
      .catch(error => console.error("Error al cargar la finca:", error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar si se modificó algo
    if (
      nombreFinca === originalFinca.nombre && 
      JSON.stringify(ubicacion) === JSON.stringify(originalFinca.ubicacion)
    ) {
      acctionSucessful.fire({
        icon: "info",
        title: "No se ha modificado la informacion de la finca",
      });
      return; // Detener el envío del formulario si no hubo cambios
    }

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
            title: `Finca ${fincaActualizada.nombre} actualizada correctamente`,
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

    <div>
      <div className="d-flex text-start">
        <button className="btn btn-success me-auto" onClick={irAtras}><i class="bi bi-arrow-left"></i></button>
      </div>
      <div className={styles.container}>
        <h3 className={styles.title}>EDITAR FINCA : {fincas.nombre}</h3>

    <div className={styles.container}>

      <BotonAtras />
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
      </div>
    </div>
  );
}