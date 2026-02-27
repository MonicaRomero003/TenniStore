import './MenuSuperior.css'

function MenuSuperior({ vistaActual, cambiarVista }) {
  const handleClick = (vista) => {
    cambiarVista(vista)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="menu">
      <div className="menu-brand" onClick={() => handleClick('inicio')} style={{ cursor: 'pointer' }}>
        <span className="menu-dot" />
        TenniStore
      </div>
      <div className="menu-links">
        <button
          className={vistaActual === 'inicio' ? 'active' : ''}
          onClick={() => handleClick('inicio')}
        >
          Inicio
        </button>
        <button
          className={vistaActual === 'productos' ? 'active' : ''}
          onClick={() => handleClick('productos')}
        >
          Productos
        </button>
        <button
          className={vistaActual === 'carrito' ? 'active' : ''}
          onClick={() => handleClick('carrito')}
        >
          Carrito
        </button>
        <button
          className={vistaActual === 'servicios' ? 'active' : ''}
          onClick={() => handleClick('servicios')}
        >
          Servicios
        </button>
        <button
          className={vistaActual === 'sucursales' ? 'active' : ''}
          onClick={() => handleClick('sucursales')}
        >
          Sucursales
        </button>
        <button
          className={vistaActual === 'contacto' ? 'active' : ''}
          onClick={() => handleClick('contacto')}
        >
          Contacto
        </button>
      </div>
      <button className="menu-cta" onClick={() => handleClick('productos')}>Entrar</button>
    </nav>
  )
}

export default MenuSuperior
