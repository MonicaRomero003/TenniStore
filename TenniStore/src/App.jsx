import { useState } from 'react'
import './App.css'
import MenuSuperior from './MenuSuperior.jsx'
import Inicio from './Inicio.jsx'
import Productos from './Productos.jsx'
import Carrito from './Carrito.jsx'
import Servicios from './Servicios.jsx'
import Sucursales from './Sucursales.jsx'
import Contacto from './Contacto.jsx'

function App() {
  const [vistaActual, setVistaActual] = useState('inicio')

  const renderVista = () => {
    switch (vistaActual) {
      case 'inicio':
        return <Inicio onNavigate={setVistaActual} />
      case 'productos':
        return <Productos />
      case 'carrito':
        return <Carrito />
      case 'servicios':
        return <Servicios />
      case 'sucursales':
        return <Sucursales />
      case 'contacto':
        return <Contacto />
      default:
        return <Inicio onNavigate={setVistaActual} />
    }
  }

  return (
    <div className="app-container">
      <MenuSuperior vistaActual={vistaActual} cambiarVista={setVistaActual} />
      <main className="app-content">
        {renderVista()}
      </main>
    </div>
  )
}

export default App
