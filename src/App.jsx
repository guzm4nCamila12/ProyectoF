import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './components/Login/Login'
import Menu from './components/VistAdmin/Menu/Menu'
import AgregarSensor from "./components/Sensores/Agregar"
import EditarSensor from "./components/Sensores/Editar"
import AgregarFinca from "./components/Fincas/CrearFincas/Agregar"
import VerFincas from "./components/Fincas/VerFincas/VerFincas"
import InicioAdmin from './components/VistAdmin/inicio/inicio';
import Registro from './components/VistAdmin/Registrar/Registro';
import EditarFinca from './components/Fincas/EditarFinca.jsx/editar'
import MenuAlterno from './components/VistAlterno/Menu/Menu';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/agregar-sensor" element={<AgregarSensor/>}/>
        <Route path="/editar-sensor" element={<EditarSensor/>}/>
        <Route path="/agregar-finca" element={<AgregarFinca/>}/>
        <Route path="/ver-fincas" element={<VerFincas/>}/>
        <Route path="/inicio-admin" element={<InicioAdmin/>}/>
        <Route path='/registro-trabajador' element={<Registro/>}/>
        <Route path='/editar-finca' element={<EditarFinca/>}/>
        <Route path='/menu-alterno' element={<MenuAlterno/>}/>
      </Routes>
    </Router>
  )
}

export default App
