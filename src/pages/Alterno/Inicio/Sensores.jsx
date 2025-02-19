import React from "react"; // Importación de React
import { useParams, Link } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { getSensoresById } from "../../../services/Sensores/ApiSensores";
import { getFincasByIdFincas } from "../../../services/Fincas/ApiFincas";
import { getUsuarioById } from "../../../services/Usuarios/ApiUsuarios";
import { useState, useEffect } from "react"; // Importación de hooks de React

function Sensores() {
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
  
  const {id} = useParams();

  // Estado para controlar si el checkbox está activado o no
  const [check, setCheck] = useState(false);

  // Datos de prueba para simular los sensores
  useEffect(() => {
    try {
      getSensoresById(id).then((data) => setSensores(data));
    } catch {
      (error) => console.error("Error: ", error);
    }
    getUsuarioById(id).then((data) => setUsuario(data));

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

    
  // Función que maneja el cambio del estado del checkbox (activar/desactivar)
  const handleSwitch = (event) => {
    setCheck(event.target.checked); // Actualiza el estado 'check' con el valor del checkbox
    console.log(fincas);
  };

       

  return (
    <div className="container mt-4">
      <h1 className="text-center">{fincas.nombre}</h1>
      <h2>Id de finca: {id}</h2>
      <p>Alterno</p>
          
          {/*<button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalInsertar">Agregar Sensor</button>*/}
          
          <table className="table table-bordered mt-3">
        <thead className="bg-dark text-light text-center">
          <tr>
              
          <th>N°</th>
            <th>MAC</th>
            <th>NOMBRE</th>
            <th>DESCRIPCION</th>
            <th> VER INFO</th>
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
                
                  <td>
                    <Link to={`/datos-sensores`}>
                  <button className="btn btn-primary btn-sm m-1">
                      <i className="bi bi-eye-fill"></i>
                    </button>
                    </Link>
                  </td>
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

    </div>
  );
}

export default Sensores;