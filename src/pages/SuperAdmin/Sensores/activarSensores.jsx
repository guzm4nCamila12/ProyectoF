import React from "react"; // Importación de React
import { useParams } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { getSensoresById } from "../../../services/Sensores/ApiSensores";
import { getFincasByIdFincas } from "../../../services/Fincas/ApiFincas";
import { getUsuarioById } from "../../../services/Usuarios/ApiUsuarios";
import { useState, useEffect } from "react"; // Importación de hooks de React
import { insertarSensor } from "../../../services/Sensores/ApiSensores";
import Swal from 'sweetalert2'

function activarSensores() {
  // Estado para almacenar la lista de sensores
  const [sensores, setSensores] = useState([]);
  const [fincas, setFincas] = useState({});
  const [usuario, setUsuario] = useState({});
  
  const [formData, setFormData] = useState({
      mac: null,
      nombre: "",
      descripcion: "",
      estado: false,
      idusuario: "",
      idfinca: "",
    });
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


useEffect(() => {
      if (usuario && fincas) {
        setFormData({
          mac: null, 
          nombre: "",
          descripcion: "",
          estado: false,
          idusuario: usuario.id, 
          idfinca: fincas.id,    
        });
      }
    }, [usuario, fincas]); 

    // Maneja los cambios de los campos del formulario
      const handleChange = (e) => {
        // Se actualiza el estado del formulario con el valor correspondiente
        setFormData({
          ...formData, // Se preservan los valores actuales de formData
          [e.target.name]: e.target.value, // Se actualiza el campo que cambia
        });
      };
    
      // Maneja el envío del formulario
      const handleSubmit = (e) => {
        e.preventDefault();
        
        insertarSensor(formData);
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El sensor se actualizó correctamente.',
          confirmButtonText: 'Aceptar',
        });
        console.log("Datos enviados:", formData);
      };
  // Función que maneja el cambio del estado del checkbox (activar/desactivar)
  const handleSwitch = (event) => {
    setCheck(event.target.checked); // Actualiza el estado 'check' con el valor del checkbox
    console.log(fincas);
  };

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
          
          <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalInsertar">Agregar Sensor</button>
          
          <table className="table table-bordered mt-3">
        <thead className="bg-dark text-light text-center">
          <tr>
              
            <th>N°</th>
            <th>MAC</th>
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
                <td>{sensor.mac}</td>
                <td>{sensor.nombre}</td>
                <td>{sensor.descripcion}</td>
                <td className="d-flex justify-content-center align-items-center">
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
     

      <div className="modal fade" id="modalInsertar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">INSERTAR SENSOR</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <label className="form-label">NOMBRE</label>
                <input className="form-control" type="text"
                  name="nombre" // (para la gestión de su valor en el estado)
                  // Valor del input, vinculado con el estado
                  onChange={handleChange} // Llama a la función que actualiza el estado cuando cambia el valor
                  placeholder="Nombre"
                  required />

                <label className="form-label">DESCRIPCION</label>
                <input type="text"
                  name="descripcion"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Descripcion"
                  required />


                <div className="mt-3">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CERRAR</button>
                  <button type="submit" className="btn btn-primary ms-2" data-bs-dismiss="modal">AGREGAR</button>
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
