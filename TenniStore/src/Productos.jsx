import { useState, useEffect } from 'react'
import './Productos.css'

const categoriasMap = {
  'Clothes': 'Ropa',
  'Electronics': 'Accesorios',
  'Furniture': 'Equipamiento',
  'Shoes': 'Calzado',
  'Others': 'Otros'
}

function Productos() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [filtroActivo, setFiltroActivo] = useState('Todo')

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=20')
      .then(res => res.json())
      .then(data => {
        setProductos(data)
        setCargando(false)
      })
      .catch(err => {
        setError(err.message)
        setCargando(false)
      })
  }, [])

  const productosFiltrados = filtroActivo === 'Todo' 
    ? productos 
    : productos.filter(p => {
        const cat = categoriasMap[p.category?.name] || 'Otros'
        return cat === filtroActivo
      })

  if (cargando) {
    return (
      <section className="pagina">
        <div className="cabecera-pagina">
          <p className="texto-pequeno">Catalogo</p>
          <h1>Cargando productos...</h1>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="pagina">
        <div className="cabecera-pagina">
          <p className="texto-pequeno">Error</p>
          <h1>No se pudieron cargar los productos</h1>
          <p className="texto-apagado">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="pagina">
      <div className="cabecera-pagina">
        <p className="texto-pequeno">Catalogo</p>
        <h1>Productos de alto rendimiento</h1>
        <p className="texto-apagado">Selecciona el equipo ideal para tu ritmo de juego.</p>
      </div>

      <div className="fila-filtros">
        <button 
          className={filtroActivo === 'Todo' ? 'filtro activo' : 'filtro'}
          onClick={() => setFiltroActivo('Todo')}
        >
          Todo
        </button>
        <button 
          className={filtroActivo === 'Equipamiento' ? 'filtro activo' : 'filtro'}
          onClick={() => setFiltroActivo('Equipamiento')}
        >
          Equipamiento
        </button>
        <button 
          className={filtroActivo === 'Calzado' ? 'filtro activo' : 'filtro'}
          onClick={() => setFiltroActivo('Calzado')}
        >
          Calzado
        </button>
        <button 
          className={filtroActivo === 'Accesorios' ? 'filtro activo' : 'filtro'}
          onClick={() => setFiltroActivo('Accesorios')}
        >
          Accesorios
        </button>
      </div>

      <div className="cuadricula">
        {productosFiltrados.map((item) => (
          <article key={item.id} className="tarjeta">
            <img 
              src={item.images?.[0] || item.category?.image || 'https://via.placeholder.com/400x300/e5f2d6/111111?text=Producto'} 
              alt={item.title} 
              onError={(e) => {
                e.target.onerror = null
                e.target.src = 'https://via.placeholder.com/400x300/e5f2d6/111111?text=' + encodeURIComponent(item.title)
              }}
            />
            <div className="cuerpo-tarjeta">
              <h3>{item.title}</h3>
              <p className="texto-apagado">{categoriasMap[item.category?.name] || 'Deporte'}</p>
              <div className="fila-tarjeta">
                <strong>${item.price}</strong>
                <button className="mini">Ver más</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Productos
