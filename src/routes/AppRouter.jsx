import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../App.css'
import Login from '../pages/Login/Login'
import Menu from '../pages/Admin/Menu/Menu'
import AgregarSensor from "../pages/Admin/Sensores/AgregarSensor/Agregar"
import EditarSensor from "../pages/Admin/Sensores/EditarSensor/Editar"
import AgregarFinca from "../pages/Admin/Finca/CrearFincas/Agregar"
import InicioAdmin from '../pages/SuperAdmin/inicio/inicio';

import Registro from '../pages/Admin/Registrar/Registro';
import EditarFinca from '../pages/Admin/Finca/EditarFinca/editar'
import MenuAlterno from '../pages/VistAlterno/Menu/Menu';

import ActivarSensores from '../pages/SuperAdmin/Sensores/activarSensores';
// import GraficoSensor from './pages/Sensores/GraficoSensor/GraficoSensor';



function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu-admin" element={<Menu />} />
        <Route path="/agregar-sensor" element={<AgregarSensor/>}/>
        <Route path="/editar-sensor" element={<EditarSensor/>}/>
        <Route path="/agregar-finca" element={<AgregarFinca/>}/>
        <Route path="/inicio-SuperAdmin" element={<InicioAdmin/>}/>

        <Route path='/registro-trabajador' element={<Registro/>}/>
        <Route path='/editar-finca' element={<EditarFinca/>}/>
        <Route path='/menu-alterno' element={<MenuAlterno/>}/>

        <Route path="/sensores-SuperAdmin" element={<ActivarSensores/>}/>
        {/* <Route path='/sensores-grafica' element={<GraficoSensor />}/> */}


      </Routes>
    </Router>
  )
}

export default App
