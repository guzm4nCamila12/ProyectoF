import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './components/Login/Login'
import Menu from './components/Menu/Menu'
import AgregarSensor from "./components/Sensores/Agregar"
import EditarSensor from "./components/Sensores/Editar"
import AgregarFinca from "./components/Fincas/Agregar"

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
      </Routes>
    </Router>
  )
}

export default App
