import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";


function activarSensores() {
    const [sensores, setSensores] = useState([])
    const [check, setCheck ] = useState(false)


     // DATOS DE PRUEBA
      useEffect(() => {
        setSensores([
            { mac:"", nombre:"sensor del patio", descripcion: "este sensor se ubica en el patio para tomar la humedad de la tierra", estado:true},
          { mac:"", nombre:"sensor techo", descripcion: "este sensor se ubica en el techo para tomar la temperatura", estado:true}
        ]);
      }, []);

      //VERIFICAR SI EL CHECKBOX ESTA PRESIONADO O NO.
      const handleSwitch = (event) => {
        setCheck(event.target.checked)
      }

      const oprimir = (e, a) =>{
        if(e){
            console.log()
        }
      }

  return (
    <div className="container mt-4">
        activarSensores
      <h1 className="text-center">SENSORES REGISTRADOS</h1>

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
          {sensores.length > 0 ? (
            sensores.map((sensores, index) => (
              <tr key={sensores.id}>
                <td>{index + 1}</td>
                <td>{sensores.nombre}</td>
                <td>{sensores.descripcion}</td>
                
                <td className="d-flex justify-content-center align-items-center">
                <div className="form-check form-switch">
                 <input className="form-check-input " type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={handleSwitch} /> 
                 
                    </div>

                  
                </td>
              </tr>
              
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No hay datos</td>
            </tr>
          )}
        </tbody>
      </table>
      {/*<button onClick={() => console.log(check)}>Obtener Valor</button>*/}
      
      <div className="modal fade" id="modalEditar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">EDITAR LIBRO</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={""}>
                <label className="form-label">ID</label>
                <input className="form-control" type="text" name="id"  disabled />

                <label className="form-label">NOMBRE</label>
                <input className="form-control" type="text" name="nombre" required />

                <label className="form-label">telefono</label>
                <input className="form-control" type="text" name="telefono" required />

                <label className="form-label">CORREO</label>
                <input className="form-control" type="text" name="correo" required />

                <label className="form-label">CONTRASEÑA</label>
                <input className="form-control" type="text" name="contrasena" required />


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
