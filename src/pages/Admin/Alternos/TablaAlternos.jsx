//Importacion de Dependencias
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';
import { data, useParams } from "react-router"
import {  Link } from 'react-router-dom';
//Importa los metodos de services/apiUsuarios
import { getUsuarios, insertarUsuario, actualizarUsuario, eliminarUsuario, getUsuarioByIdRol } from "../../../services/Usuarios/ApiUsuarios";
import { acctionSucessful } from "../../../components/alertSuccesful";

import BotonAtras from "../../../components/BotonAtras";
  

const Inicio = () => {
  const { id } = useParams();

  // Estado local del componente
  const [usuarios, setUsuarios] = useState([]); // Arreglo de usuarios obtenidos de la Base de Datos
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: "", telefono: "", correo: "", clave: "", id_rol: "" });
  const [editarUsuario, setEditarUsuario] = useState({ id: "", nombre: "", telefono: "", correo: "", clave: "", id_rol: "" });

  // DATOS DE PRUEBA
  useEffect(() => {
    getUsuarioByIdRol(id)
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error: ', error))
  }, []);

  const handleChange = (e) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  const handleChangeEditar = (e) => {
    setEditarUsuario({ ...editarUsuario, [e.target.name]: e.target.value });
  };

  const validarCampos = (usuario) => {
    return usuario.nombre && usuario.telefono && usuario.correo && usuario.clave;
  };

  const handleInsertar = async (e) => {
    e.preventDefault();
    
    // Validar que los campos no estén vacíos
    if (!validarCampos(nuevoUsuario)) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, llena todos los campos antes de enviar.',
      });
      return;
    }

    const nuevo = {
      nombre: nuevoUsuario.nombre,
      telefono: nuevoUsuario.telefono,
      correo: nuevoUsuario.correo,
      clave: nuevoUsuario.clave,
      id_rol: Number(3),
      id_finca: Number(id),
    };

    try {
      const data = await insertarUsuario(nuevo);
      setUsuarios(usuarios ? [...usuarios, data] : [data]);
      setNuevoUsuario({ nombre: "", telefono: "", correo: "", clave: "", id_rol: "" });
      acctionSucessful.fire({
        icon: "success",
        title: "Usuario agregado correctamente"
      });

      // Cerrar el modal manualmente
      const modalElement = document.getElementById('modalInsertar');
      const modal = new bootstrap.Modal(modalElement);
      modal.hide(); // Cierra el modal
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleEditar = async (e) => {
    e.preventDefault();

    if (!validarCampos(editarUsuario)) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, llena todos los campos antes de editar.',
      });
      return;
    }

    try {
      await actualizarUsuario(editarUsuario.id, editarUsuario);
      setUsuarios(usuarios.map(u => u.id === editarUsuario.id ? editarUsuario : u));

      acctionSucessful.fire({
        icon: "success",
        title: "Usuario editado correctamente"
      });
    } catch (error) {
      console.error(error);
    }
  };

  const cargarDatosEdicion = (usuario) => {
    setEditarUsuario(usuario);
  };

  const HandlEliminarUsuario = (id) => {
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
            title: "Usuario eliminado correctamente"
          });
        } catch (error) {
          console.error("Error eliminando usuario:", error);
        }
      }
    });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">ALTERNOS REGISTRADOS</h1>

    <BotonAtras /> 

      <table className="table table-bordered mt-3">
        <thead className="bg-dark text-light text-center">
          <tr>
            <th>N°</th>
            <th>NOMBRE</th>
            <th>TELEFONO</th>
            <th>CORREO</th>
            <th>EDITAR</th>
            <th>ELIMINAR</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(usuarios) && usuarios.length > 0 ? (
            usuarios.map((usuario, index) => (
              <tr key={usuario.id}>
                <td>{index + 1}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.correo}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm m-1"
                    data-bs-toggle="modal"
                    data-bs-target="#modalEditar"
                    onClick={() => cargarDatosEdicion(usuario)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm m-1"
                    onClick={() => HandlEliminarUsuario(usuario.id)}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
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

      <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalInsertar">INSERTAR</button>

      {/* MODAL INSERTAR USUARIO */}
      <div className="modal fade" id="modalInsertar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">INSERTAR ALTERNO</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleInsertar}>
                <label className="form-label">NOMBRE</label>
                <input 
                  className="form-control" 
                  type="text" 
                  name="nombre" 
                  value={nuevoUsuario.nombre} 
                  onChange={handleChange} 
                />
                <label className="form-label">TELEFONO</label>
                <input 
                  className="form-control" 
                  type="text" 
                  name="telefono" 
                  value={nuevoUsuario.telefono} 
                  onChange={handleChange} 
                />
                <label className="form-label">CORREO</label>
                <input 
                  className="form-control" 
                  type="text" 
                  name="correo" 
                  value={nuevoUsuario.correo} 
                  onChange={handleChange} 
                />
                <label className="form-label">CLAVE</label>
                <input 
                  className="form-control" 
                  type="text" 
                  name="clave" 
                  value={nuevoUsuario.clave} 
                  onChange={handleChange} 
                />
                <div className="mt-3">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    data-bs-dismiss="modal" 
                  
                  >
                    CERRAR
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary ms-2"
                    data-bs-dismiss="modal" 
                    disabled={!validarCampos(nuevoUsuario)} // Deshabilitar si los campos están vacíos
                  >
                    INSERTAR
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL EDITAR */}
      <div className="modal fade" id="modalEditar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">EDITAR ALTERNO</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditar}>
                <label className="form-label">ID</label>
                <input className="form-control" type="text" name="id" value={editarUsuario.id} disabled />
                <label className="form-label">NOMBRE</label>
                <input className="form-control" type="text" name="nombre" value={editarUsuario.nombre} onChange={handleChangeEditar} />
                <label className="form-label">TELEFONO</label>
                <input className="form-control" type="text" name="telefono" value={editarUsuario.telefono} onChange={handleChangeEditar} />
                <label className="form-label">CORREO</label>
                <input className="form-control" type="text" name="correo" value={editarUsuario.correo} onChange={handleChangeEditar} />
                <label className="form-label">CLAVE</label>
                <input className="form-control" type="text" name="clave" value={editarUsuario.clave} onChange={handleChangeEditar} />
                <div className="mt-3">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >CERRAR</button>
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" disabled={!validarCampos(editarUsuario)}>EDITAR</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Inicio