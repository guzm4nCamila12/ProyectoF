import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router"

export default function ListaFincas() {
  const { id } = useParams();
  // Estado para almacenar la lista de fincas
  const [fincas, setFincas] = useState([]);
  const [Usuario, setUsuario] = useState({ nombre: "", telefono: "", correo: "", clave: "", id_rol: "" });

  // Simulación de carga de datos al montar el componente
  useEffect(() => {

    fetch(`http://localhost:3000/usuarios/${id}`)
    .then(response => response.json())
    .then(data => {

      setUsuario(Usuario, data)
      console.log(Usuario)
    })


    setFincas([
      { nombre: "Finca Las Lomas" },
      { nombre: "Finca Los Olivos" }
    ]);
  }, []);

  return (
    <div>
      <div className="container mt-4">
        <h1 className="text-center">{id}</h1>
        
        <table className="table table-bordered mt-3">
        <thead className="bg-dark text-light text-center">
            <tr>
              <th>Fincas</th>
              <th>Accion 1</th>
              <th>Accion 2</th>
            </tr>
          </thead>
          <tbody>
            {/* Si hay fincas, las mostramos; de lo contrario, mostramos un mensaje de que no hay datos */}
            {fincas.length > 0 ? (
              fincas.map((finca, index) => (
                <tr key={index}>
                  <td className='fs-4'>{finca.nombre}</td>
                  <td>
                    <button type="button" className="btn btn-warning">
                      <i className="bi bi-person-fill"></i>
                    </button>
                  </td>
                  <td>
                    <Link to={"/sensores-SuperAdmin"}>
                      <button type="button" className="btn btn-primary">
                        <i className="bi bi-app-indicator"></i>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No hay datos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

