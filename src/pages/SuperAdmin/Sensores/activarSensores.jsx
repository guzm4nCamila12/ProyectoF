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

function activarSensores() {
  // Estado para almacenar la lista de sensores
  const [sensores, setSensores] = useState([]);
  const [fincas, setFincas] = useState({});
  const [usuario, setUsuario] = useState({});
  let bloque
  //id es el id de la finca para traer todos los sensores de la finca
  
  const {id,idUser} = useParams();

  // Estado para controlar si el checkbox está activado o no
  const [check, setCheck] = useState(false);

  // Datos de prueba para simular los sensores
  useEffect(() => {
    try {
      getSensoresById(id).then((data) => setSensores(data));
    } catch {
      (error) => console.error("Error: ", error);
    }
    getUsuarioById(idUser).then((data) => setUsuario(data));

    getFincasByIdFincas(id).then((data) => setFincas(data));
  }, []);

  // Función que maneja el cambio del estado del checkbox (activar/desactivar)
  const handleSwitch = (event) => {
    setCheck(event.target.checked); // Actualiza el estado 'check' con el valor del checkbox
    console.log(fincas);
  };

  const handleEditar = (event) => {};

  // Función llamada al oprimir un botón
  const oprimir = (e, a) => {
    if (e) {
      console.log(); // Aquí podrías agregar una lógica para realizar una acción cuando el checkbox esté activado
    }
  };

  //asignar las acciones según el rol del usuario
  function asignarRoles(idRol){
    switch(idRol){
      case 1:
        bloque=<div>
        <p>Super admin</p>
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
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id={`flexSwitchCheck${index}`}
                    onChange={handleSwitch}
                  />
                </div>
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





      </div>

      return bloque;


      case 2:
        bloque=<div>
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
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id={`flexSwitchCheck${index}`}
                      onChange={handleSwitch}
                      disabled
                    />
                  </div>
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





        </div>

        return bloque;

        case 3:
          bloque=<div>
          <p>Alterno</p>
          <table className="table table-bordered mt-3">
        <thead className="bg-dark text-light text-center">
          <tr>
              
            <th>N°</th>
            <th>NOMBRE</th>
            <th>DESCRIPCION</th>
            <th>Activo/Inactivo</th>
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
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id={`flexSwitchCheck${index}`}
                      onChange={handleSwitch}
                      disabled
                    />
                  </div>
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





        </div>

        return bloque;
      default: return 'Sin Rol';

    }

  }






  return (
    <div className="container mt-4">
      <h1 className="text-center">{fincas.nombre}</h1>
      <h2>Id de finca: {id}</h2>
      {asignarRoles(usuario.id_rol) }
     

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
              <h5 className="modal-title">EDITAR LIBRO</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditar}>
                {/* Formulario para editar un libro */}
                <label className="form-label">ID</label>
                <input
                  className="form-control"
                  type="text"
                  name="id"
                  disabled
                />

                <label className="form-label">NOMBRE</label>
                <input
                  className="form-control"
                  type="text"
                  name="nombre"
                  required
                />

                <label className="form-label">TELÉFONO</label>
                <input
                  className="form-control"
                  type="text"
                  name="telefono"
                  required
                />

                <label className="form-label">CORREO</label>
                <input
                  className="form-control"
                  type="email"
                  name="correo"
                  required
                />

                <label className="form-label">CONTRASEÑA</label>
                <input
                  className="form-control"
                  type="password"
                  name="contrasena"
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
                    EDITAR
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

export default activarSensores;
