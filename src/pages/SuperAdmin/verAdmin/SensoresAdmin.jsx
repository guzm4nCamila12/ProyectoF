import React from "react"; // Importación de React
import { useParams } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { getSensoresById } from "../../../services/Sensores/ApiSensores";
import { getFincasByIdFincas } from "../../../services/Fincas/ApiFincas";
import { getUsuarioById } from "../../../services/Usuarios/ApiUsuarios";
import { useState, useEffect } from "react"; // Importación de hooks de React
import { Link } from "react-router";
import { actualizarSensor } from "../../../services/Sensores/ApiSensores";


//hacer todo el proceso de envio de datos en el modal y solo llamarlo en el handlerSwitch



function SensoresAdmin() {
  // Estado para almacenar la lista de sensores
  const [sensores, setSensores] = useState([]);
  const [fincas, setFincas] = useState({});

  const [usuario, setUsuario] = useState({});
  const [estado, setEstado] = useState([]);

  //id es el id de la finca para traer todos los sensores de la finca

  const { id, idUser } = useParams();

  // Estado para controlar si el checkbox está activado o no

  // Datos de prueba para simular los sensores
  useEffect(() => {
    try {
      getSensoresById(id).then((data) => {
        setSensores(data);
        setEstado(data.map(({ id, estado }) => ({ id, estado })))
      });

    } catch {
      (error) => console.error("Error: ", error);
    }
    getUsuarioById(idUser).then((data) => setUsuario(data));

    getFincasByIdFincas(id).then((data) => setFincas(data));



  }, [id, idUser]);

  console.log(estado);



  // Función que maneja el cambio del estado del checkbox (activar/desactivar)
  const handleSwitch = (id, estado, index) => {
    const newEstado = !estado;
  
    // Crear una copia del array de sensores y actualizar el estado del sensor en la posición correspondiente
    const updatedSensores = [...sensores];
    updatedSensores[index].estado = newEstado;

    // Actualizamos el estado de los sensores para reflejar los cambios en la UI
    setSensores(updatedSensores);

    const updatedFormData = {
      mac: null,
      nombre: sensores[index].nombre,
      descripcion: sensores[index].descripcion,
      estado: newEstado,
      idusuario: sensores[index].idusuario,
      idfinca: sensores[index].idfinca,
    };

    actualizarSensor(sensores[index].id, updatedFormData)

    console.log("sensor:", updatedFormData);

  };

  const handleHabilitar = (event) => {

  };

  function estadoSensores(estado, id, index) {

    let checkbox = <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        value={estado}
        checked={estado}
        onChange={() => handleSwitch(id, estado, index)}


      />
    </div>
    return checkbox;
  }






  return (
    <div className="container mt-4">
      <p>OBSERVANDO A:</p>
      <h1 className="text-center">{fincas.nombre}</h1>
      <h2>Id de finca: {id}</h2>


      <p>Administrador</p>
      {/*Boton para que el administrador pueda agregar un sensor */}
      <Link to={`/agregar-sensor/${usuario.id}/${id}`}>
        <button type="button" className="btn btn-success">Agregar Sensor</button>
      </Link>
      <table className="table table-bordered mt-3">
        <thead className="bg-dark text-light text-center">
          <tr>

            <th>N°</th>
            <th>NOMBRE</th>
            <th>DESCRIPCION</th>
            <th>Inactivo/Activo</th>
          </tr>
        </thead>
        <tbody>
          {/* Si hay sensores, los mostramos, de lo contrario mostramos un mensaje de no hay datos */}
          {Array.isArray(sensores) && sensores.length > 0 ? (
            sensores.map((sensor, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{sensor.nombre}</td>
                <td>{sensor.descripcion}</td>
                <td className="d-flex justify-content-center align-items-center">
                  {estadoSensores(sensor.estado, sensor.id, index)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No hay datos
              </td>
            </tr>
          )}
        </tbody>
      </table>


      <div
        className="modal fade"
        id="modalEditar"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Habilitar sensor</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleHabilitar}>
              
                

                <label className="form-label">Dirección MAC</label>
                <input
                  className="form-control"
                  type="text"
                  name="mac"
                  required
                />



                {/* Botones de acción para cerrar el modal o editar */}
                <div className="mt-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    CERRAR
                  </button>
                  <button type="submit" className="btn btn-primary ms-2">
                    Habilitar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SensoresAdmin;
