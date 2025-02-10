import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';
import {  Link } from 'react-router-dom';
import { getUsuarios, insertarUsuario, actualizarUsuario, eliminarUsuario } from "../../../services/Api";
import { acctionSucessful } from "../../../components/alertSuccesful";

  
const Inicio = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: "", telefono: "", correo: "", clave: "", id_rol: "" });
  const [editarUsuario, setEditarUsuario] = useState({ id: "", nombre: "", telefono: "", correo: "", clave: "", id_rol: ""});
  
  
 
  

  // DATOS DE PRUEBA
  useEffect(() => {

    getUsuarios()
    .then(data => setUsuarios(data))
    .catch(error => console.error('Error: ',error))


    
  }, []);

  // Manejo de cambios en los formularios
  const handleChange = (e) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };




  // INSERTAR USUARIO
  const handleInsertar = async (e) => {

    e.preventDefault();
    const nuevo = { 
        nombre: nuevoUsuario.nombre, 
        telefono: nuevoUsuario.telefono, 
        correo: nuevoUsuario.correo, 
        clave: nuevoUsuario.clave, 
        id_rol: Number(nuevoUsuario.id_rol) 
    };
    try {
      const data = await insertarUsuario(
        nuevo
      );
      if (data) {
        setUsuarios([...usuarios, data]);
        setNuevoUsuario({ nombre: "", telefono: "", correo: "", clave: "", id_rol: "" });

        acctionSucessful.fire({
          icon: "success",
          title: "Usuario agregado correctamete"
        });

      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  

};


  // EDITAR USUARIO
  const handleEditar = async (e) => {
    e.preventDefault();
    try{
      actualizarUsuario(editarUsuario.id,editarUsuario)
      setUsuarios(usuarios.map(u => u.id === editarUsuario.id ? editarUsuario : u));
      acctionSucessful.fire({
        icon: "success",
        title: "Usuario editado correctamete"
      });

    }catch(error){
      console.error(error)
    }



};

const handleChangeEditar = (e) => {
    setEditarUsuario({ ...editarUsuario, [e.target.name]: e.target.value });

};





  //CARGAR DATOS EN MODAL DE EDICION
  const cargarDatosEdicion = (usuario) => {
    setEditarUsuario(usuario);
  };

  const verUsuario = (id) => {
    <Link to={`/subastar/${idAnimal}`}>
                                        <button className={styles.buttonInicioCrud}>
                                            Iniciar Subasta
                                        </button>
                                    </Link>
  }

  //ELIMINAR UN SUSUARIO
  const HandlEliminarUsuario = (id) =>{
    Swal.fire({
      icon: 'error',
      title: '¿Estas seguro?',
      text: "¿Estas seguro de eliminar este usuario?",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "blue",
      confirmButtonText: "si, eliminar ",
      cancelButtonText: "cancelar "
  }).then((result) => {
    if(result.isConfirmed){

        try{
          eliminarUsuario(id)
          setUsuarios(usuarios.filter(usuario => usuario.id !== id));
          acctionSucessful.fire({
            icon: "success",
            title: "Usuario eliminado correctamete"
          });
          

        }catch{
          console.error("Error eliminando usuario:", error);
        }
    }
  })
  }



  


  return (
    <div className="container mt-4">
      <h1 className="text-center">USUARIOS REGISTRADOS</h1>

      <table className="table table-bordered mt-3">
        <thead className="bg-dark text-light text-center">
          <tr>
            <th>N°</th>
            <th>NOMBRE</th>
            <th>TELEFONO</th>
            <th>CORREO</th>
            <th>CONTRASEÑA</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario, index) => (
              <tr key={usuario.id}>
                <td>{index + 1}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.clave}</td>
                <td>
                <button
                    className="btn btn-warning btn-sm m-1"
                    data-bs-toggle="modal"
                    data-bs-target="#modalEditar"
                    onClick={() => cargarDatosEdicion(usuario)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm m-2"
                    onClick={() => HandlEliminarUsuario(usuario.id)}
                  >
                    Eliminar
                  </button>

                  <Link to={`/lista-fincas/${usuario.id}`}>
                    <button className="btn btn-primary btn-sm m-1">
                      <i className="bi bi-eye-fill"></i>
                    </button>
                  </Link>

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

      {/* BOTON DE INSERTAR USUARIO*/}
      <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalInsertar">
        INSERTAR
      </button>

      {/* MODAL INSERTAR USURIO*/}
      <div className="modal fade" id="modalInsertar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">INSERTAR USUARIO</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleInsertar}>
                <label className="form-label">NOMBRE</label>
                <input className="form-control" type="text" name="nombre" value={nuevoUsuario.nombre} onChange={handleChange} required />

                <label className="form-label">TELEFONO</label>
                <input className="form-control" type="text" name="telefono" value={nuevoUsuario.telefono} onChange={handleChange} required />

                <label className="form-label">CORREO</label>
                <input className="form-control" type="text" name="correo" value={nuevoUsuario.correo} onChange={handleChange} required />

                <label className="form-label">CLAVE</label>
                <input className="form-control" type="text" name="clave" value={nuevoUsuario.clave} onChange={handleChange} required />

                <label className="form-label">ID ROL</label>
                <input className="form-control" type="text" name="id_rol" value={nuevoUsuario.id_rol} onChange={handleChange} required />


                <div className="mt-3">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CERRAR</button>
                  <button type="submit" className="btn btn-primary ms-2" data-bs-dismiss="modal">INSERTAR</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL EDITAR*/}
      <div className="modal fade" id="modalEditar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">EDITAR LIBRO</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditar}>
                <label className="form-label">ID</label>
                <input className="form-control" type="text" name="id" value={editarUsuario.id} disabled />

                <label className="form-label">NOMBRE</label>
                <input className="form-control" type="text" name="nombre" value={editarUsuario.nombre} onChange={handleChangeEditar} required />

                <label className="form-label">telefono</label>
                <input className="form-control" type="text" name="telefono" value={editarUsuario.telefono} onChange={handleChangeEditar} required />

                <label className="form-label">CORREO</label>
                <input className="form-control" type="text" name="correo" value={editarUsuario.correo} onChange={handleChangeEditar} required />

                <label className="form-label">CLAVE</label>
                <input className="form-control" type="text" name="clave" value={editarUsuario.clave} onChange={handleChangeEditar} required />


                <div className="mt-3">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CERRAR</button>
                  <button type="submit" className="btn btn-primary ms-2" data-bs-dismiss="modal">EDITAR</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      



    </div>
  );
};

export default Inicio;