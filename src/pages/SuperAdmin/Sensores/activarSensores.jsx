import React from "react"; // Importación de React
import { useParams } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { actualizarSensor, getSensoresById, eliminarSensores } from "../../../services/Sensores/ApiSensores";
import { getFincasByIdFincas } from "../../../services/Fincas/ApiFincas";
import { getUsuarioById } from "../../../services/Usuarios/ApiUsuarios";
import { useState, useEffect } from "react"; // Importación de hooks de React
import { Link } from "react-router";
import { acctionSucessful } from "../../../components/alertSuccesful";
import Swal from 'sweetalert2';

function activarSensores() {
  // Estado para almacenar la lista de sensores
  const [sensores, setSensores] = useState([]);
  const [fincas, setFincas] = useState({});
  const [usuario, setUsuario] = useState({});
  const [editarSensor, setEditarSensor] = useState({nombre: "", descripcion: ""});
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

  const handleEditar = async (e) => {
    e.preventDefault();
      try{
        actualizarSensor(editarSensor.id,editarSensor)
        setSensores(sensores.map(u => u.id === editarSensor.id ? editarSensor : u));
        acctionSucessful.fire({
          icon: "success",
          title: "Sensor editado correctamente"
        });
  
      }catch(error){
        console.error(error)
      }
  
  
  
  };
  
  const handleChangeEditar = (e) => {
      setEditarSensor({ ...editarSensor, [e.target.name]: e.target.value });
  
  };
  const cargarDatosEdicion = (sensores) => {
    setEditarSensor(sensores);
  };

  const HandlEliminarSensor = (id) =>{
      Swal.fire({
        icon: 'error',
        title: '¿Estas seguro?',
        text: "¿Estas seguro de eliminar este sensor?",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "blue",
        confirmButtonText: "si, eliminar ",
        cancelButtonText: "cancelar "
    }).then((result) => {
      if(result.isConfirmed){
  
          try{
            eliminarSensores(id)
            setSensores(sensores.filter(sensor => sensor.id !== id));
            acctionSucessful.fire({
              icon: "success",
              title: "Sensor eliminado correctamente"
            });
            
  
          }catch{
            console.error("Error eliminando sensor:");
          }
      }
    })
    }

  // Función llamada al oprimir un botón
  const oprimir = (e, a) => {
    if (e) {
      console.log(); // Aquí podrías agregar una lógica para realizar una acción cuando el checkbox esté activado
    }
  };

  //asignar las acciones según el rol del usuario

         
       

        






  return (
    <div className="container mt-4">
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
            <th>MAC</th>
            <th>NOMBRE</th>
            <th>DESCRIPCION</th>
            <th>Inactivo/Activo</th>
            <th> EDITAR</th>
            <th> ELIMINAR</th>
            <th> VER INFO</th>
          </tr>
        </thead>
        <tbody>
          {/* Si hay sensores, los mostramos, de lo contrario mostramos un mensaje de no hay datos */}
          {Array.isArray(sensores) && sensores.length > 0 ? (
            sensores.map((sensor, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{sensor.mac}</td>
                <td>{sensor.nombre}</td>
                <td>{sensor.descripcion}</td>
                <td className="d-flex justify-content-centTELÉFONOer align-items-center">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      checked={sensor.estado}
                      id={`flexSwitchCheck${index}`}
                      onChange={handleSwitch}
                      disabled
                    />
                  </div>
                </td>
                <td>
                <button
                    className="btn btn-warning btn-sm m-1"
                    data-bs-toggle="modal"
                    data-bs-target="#modalEditar"
                    onClick={() => cargarDatosEdicion(sensor)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  </td>
                  <td><button
                    className="btn btn-danger btn-sm m-1"
                    onClick={() => HandlEliminarSensor(sensor.id)}
                  >
                   <i className="bi bi-trash3"></i>
                  </button>
                  </td>
                  <td>
                    <Link to={`/sensores-grafica`}>
                  <button className="btn btn-primary btn-sm m-1">
                      <i className="bi bi-eye-fill"></i>
                    </button>
                    </Link>
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
              <h5 className="modal-title">EDITAR SENSOR</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditar}>

                <label className="form-label">NOMBRE</label>
                <input
                  className="form-control"
                  value={editarSensor.nombre}
                  type="text"
                  name="nombre"
                  required
                  onChange={handleChangeEditar}
                />

                <label className="form-label">DESCRIPCIÓN</label>
                <input
                  className="form-control"
                  value={editarSensor.descripcion}
                  type="text"
                  name="descripcion"
                  required
                  onChange={handleChangeEditar}
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
                  <button type="submit" className="btn btn-primary ms-2 " data-bs-dismiss="modal">
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
