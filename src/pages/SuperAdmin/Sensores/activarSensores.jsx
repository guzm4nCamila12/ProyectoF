import React from "react";  // Importación de React
import "bootstrap/dist/css/bootstrap.min.css";  
import "bootstrap/dist/js/bootstrap.bundle.min.js";  
import "bootstrap-icons/font/bootstrap-icons.css";  
import { useState, useEffect } from "react";  // Importación de hooks de React

function activarSensores() {
  // Estado para almacenar la lista de sensores
  const [sensores, setSensores] = useState([]);
  
  // Estado para controlar si el checkbox está activado o no
  const [check, setCheck] = useState(false);

  // Datos de prueba para simular los sensores
  useEffect(() => {
    setSensores([
      { mac: "", nombre: "sensor del patio", descripcion: "este sensor se ubica en el patio para tomar la humedad de la tierra", estado: true },
      { mac: "", nombre: "sensor techo", descripcion: "este sensor se ubica en el techo para tomar la temperatura", estado: true }
    ]);
  }, []);  

  // Función que maneja el cambio del estado del checkbox (activar/desactivar)
  const handleSwitch = (event) => {
    setCheck(event.target.checked);  // Actualiza el estado 'check' con el valor del checkbox
  };

  // Función llamada al oprimir un botón
  const oprimir = (e, a) => {
    if (e) {
      console.log();  // Aquí podrías agregar una lógica para realizar una acción cuando el checkbox esté activado
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">(nombre de la finca)</h1>
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
          {sensores.length > 0 ? (
            sensores.map((sensor, index) => (
              <tr key={index}>
                <td>{index + 1}</td> 
                <td>{sensor.nombre}</td> 
                <td>{sensor.descripcion}</td>  
                <td className="d-flex justify-content-center align-items-center">
                  {/* Checkbox para activar o desactivar el sensor */}
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      onChange={handleSwitch}  // Controla el cambio del estado del checkbox
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No hay datos</td>  {/* Mensaje si no hay sensores registrados */}
            </tr>
          )}
        </tbody>
      </table>

      <div className="modal fade" id="modalEditar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">EDITAR LIBRO</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={""}>
                {/* Formulario para editar un libro */}
                <label className="form-label">ID</label>
                <input className="form-control" type="text" name="id" disabled />

                <label className="form-label">NOMBRE</label>
                <input className="form-control" type="text" name="nombre" required />

                <label className="form-label">TELÉFONO</label>
                <input className="form-control" type="text" name="telefono" required />

                <label className="form-label">CORREO</label>
                <input className="form-control" type="email" name="correo" required />

                <label className="form-label">CONTRASEÑA</label>
                <input className="form-control" type="password" name="contrasena" required />

                {/* Botones de acción para cerrar el modal o editar */}
                <div className="mt-3">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CERRAR</button>
                  <button type="submit" className="btn btn-primary ms-2">EDITAR</button>
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
