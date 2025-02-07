import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../App.css'
import Login from '../pages/Login/Login'

import Menu from '../pages/VistAdmin/Menu/Menu'
import AgregarSensor from "../pages/Sensores/Agregar"
import EditarSensor from "../pages/Sensores/Editar"
import AgregarFinca from "../pages/Fincas/CrearFincas/Agregar"
import VerFincas from "../pages/Fincas/VerFincas/VerFincas"
import InicioAdmin from '../pages/VistAdmin/inicio/inicio';

import Registro from '../pages/VistAdmin/Registrar/Registro';
import EditarFinca from '../pages/Fincas/EditarFinca.jsx/editar'
import MenuAlterno from '../pages/VistAlterno/Menu/Menu';

import ActivarSensores from '../pages/VistAdmin/activarSensores';
import GraficoSensor from '../pages/Sensores/GraficoSensor/GraficoSensor';



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

        <Route path="/sensores-admin" element={<ActivarSensores/>}/>
        <Route path='/sensores-grafica' element={<GraficoSensor />}/> 


      </Routes>
    </Router>
  )
}

export default App
