import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import GraficoSensor from '../GraficoSensor/GraficoSensor';

export default function VerSensores() {
  // Estado para almacenar los datos de los sensores
  const [datosSensor, setDatosSensores] = useState([]);

  // Simulación de carga de datos al montar el componente
  useEffect(() => {
    setDatosSensores([
      {
        id: 1,
        fecha: "17-03-2006",
        datos: "La temperatura estuvo a 30 grados"
      },
      {
        id: 2,
        fecha: "20-05-2010",
        datos: "La temperatura es de 20 grados"
      }
    ]);
  }, []);

  // Función para eliminar un sensor con confirmación de SweetAlert  
  const eliminarSensor = (id) => {
    Swal.fire({
      icon: 'error',
      title: '¿Estás seguro?',
      text: "¿Estás seguro de eliminar este sensor?",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "blue",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        const nuevoMap = new Map(datosSensor);
        console.log(nuevoMap);
        nuevoMap.delete(id);
        setDatosSensores([...nuevoMap.values()]); // Corregir el estado para que refleje la eliminación
      }
    });
  };

  return (
    <div>
      <div className="container mt-4">
        <h1 className="text-center">Sensor Techo</h1>
        
        <table className="table table-bordered mt-3">
          <thead className="bg-dark text-light text-center">
            <tr>
              <th>Fecha</th>
              <th>Datos</th>
            </tr>
          </thead>
          <tbody>
            {datosSensor.length > 0 ? (
              datosSensor.map((sensor, index) => (
                <tr key={index}>
                  <td className='fs-4'>{sensor.fecha}</td>
                  <td className='fs-4'>{sensor.datos}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">No hay datos</td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* Botones de acción */}
        <Link to={"/editar-sensor"}>
          <button type="button" className="btn btn-success">Editar</button>
        </Link>
        <button type="button" className="btn btn-danger" onClick={() => eliminarSensor(1)}>Eliminar</button>
        
        <GraficoSensor />
      </div>
    </div>
  );
}
