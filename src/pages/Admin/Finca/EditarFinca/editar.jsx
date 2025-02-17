// import React, { useState, useEffect } from "react"; // Importación de React y useState
// import styles from "../CrearFincas/agregar.module.css"
// import Mapa from "../../../../components/Mapa"; // Importamos el componente que contiene el mapa
// import { actualizarFinca } from "../../../../services/Fincas/ApiFincas"; // Importamos el metodo actualizarFinca de la ApiFincas
// import { acctionSucessful } from "../../../../components/alertSuccesful"; // Importamos el mensaje de actualización exitosa
// import "bootstrap-icons/font/bootstrap-icons.css";
// import { useParams } from "react-router-dom"; // Importamos useParams para obtener el ID de la finca a actualizar
// import { getFincasById } from "../../../../services/Fincas/ApiFincas"; // Importamos el metodo para obtener la finca por id

// const ActualizarFinca = () => {
//   const { id } = useParams(); // Obtenemos el id de la finca desde la URL
//   const [nombre, setNombre] = useState(""); // Estado para el nombre de la finca
//   const [ubicacion, setUbicacion] = useState({ lat: 4.8088736064112, lng: -75.68756103515626 }); // Estado para la ubicación

//   // Este useEffect hace la llamada para obtener los datos de la finca
//   useEffect(() => {
//     const fetchFinca = async () => {
//       try {
//         const finca = await getFincasById(id); // Obtenemos la finca por id
//         setNombre(finca.nombre); // Rellenamos los campos con los datos actuales
//         setUbicacion(finca.ubicacion);
//       } catch (error) {
//         console.error("Error al obtener la finca:", error);
//       }
//     };

//     fetchFinca();
//   }, [id]);

//   // Maneja el envío del formulario para actualizar la finca
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const fincaActualizada = { 
//       nombre,
//       ubicacion
//     };

//     // Llamamos al método para actualizar la finca
//     actualizarFinca(id, fincaActualizada)
//       .then((data) => {
//         console.log(data);
//         acctionSucessful.fire({
//           icon: "success",
//           title: "Finca Actualizada Correctamente"
//         });
//       })
//       .catch((error) => {
//         console.error("Error al actualizar finca:", error);
//         acctionSucessful.fire({
//           icon: "error",
//           title: "Hubo un error al actualizar la finca"
//         });
//       });
//   };

//   return (
//     <div className={styles.container}>
//       <h3 className={styles.title}>ACTUALIZAR FINCA</h3>

//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div>
//           <label className={styles.label}>Ingrese el nombre:</label>
//           <input
//             type="text"
//             name="nombre"
//             value={nombre}
//             onChange={(e) => setNombre(e.target.value)}
//             className={styles.input}
//             placeholder="Nombre"
//             required
//           />
//         </div>

//         <div>
//           <h1><i className="bi bi-geo-alt"></i></h1>
//           <Mapa setUbicacion={setUbicacion} ubicacion={ubicacion} /> {/* Mapa que actualiza la ubicación */}
//         </div>

//         <button type="submit" className={styles.button}>
//           ACTUALIZAR
//         </button>
//       </form>

//       <div>
//         <p>Ubicación Actual: {ubicacion.lat}, {ubicacion.lng}</p> {/* Muestra la ubicación actual */}
//       </div>
//     </div>
//   );
// };

// export default ActualizarFinca;


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
        <button type="submit" className={styles.button}>
          EDITAR
        </button>
      </form>
    </div>
  );
}