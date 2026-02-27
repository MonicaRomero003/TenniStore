import { useState, useEffect } from 'react'
import './Colecciones.css'

function Colecciones() {
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/categories')
      .then(res => res.json())
      .then(data => {
        setCategorias(data.slice(0, 6))
        setCargando(false)
      })
      .catch(() => {
        setCargando(false)
      })
  }, [])

  const coleccionesMap = {
    'Clothes': { 
      name: 'Terra Clay', 
      desc: 'Traccion suave y control en arcilla.',
      color: '#d4a574'
    },
    'Electronics': { 
      name: 'Court Tech', 
      desc: 'Accesorios inteligentes para tu juego.',
      color: '#7ba3d4'
    },
    'Furniture': { 
      name: 'Pro Series', 
      desc: 'Linea profesional para competencias.',
      color: '#a8d47b'
    },
    'Shoes': { 
      name: 'Speed Court', 
      desc: 'Velocidad y estabilidad en cada paso.',
      color: '#d47b8e'
    },
    'Others': { 
      name: 'Tennis Essentials', 
      desc: 'Todo lo necesario para tu entrenamiento.',
      color: '#c4b5a0'
    }
  }

  const createPlaceholder = (text, color) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs>
        <linearGradient id="g-${text}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${color}" />
          <stop offset="1" stop-color="#f5f2e8" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#g-${text})" />
      <circle cx="450" cy="100" r="80" fill="#0b0b0b" opacity="0.06" />
      <circle cx="120" cy="320" r="100" fill="#0b0b0b" opacity="0.06" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="32" font-weight="600" fill="#111111">
        ${text}
      </text>
    </svg>`
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
  }

  if (cargando) {
    return (
      <section className="page">
        <div className="page-head">
          <p className="eyebrow">Colecciones</p>
          <h1>Cargando colecciones...</h1>
        </div>
      </section>
    )
  }

  return (
    <section className="page">
      <div className="page-head">
        <p className="eyebrow">Colecciones</p>
        <h1>Lineas pensadas por superficie</h1>
        <p className="muted">Encuentra la mezcla ideal entre agarre y velocidad.</p>
      </div>

      <div className="grid-colecciones">
        {categorias
          .filter(item => coleccionesMap[item.name])
          .map((item) => {
          const coleccion = coleccionesMap[item.name]
          return (
            <article key={item.id} className="card-coleccion">
              <img 
                src={createPlaceholder(coleccion.name, coleccion.color)} 
                alt={coleccion.name}
              />
              <div className="card-body">
                <h3>{coleccion.name}</h3>
                <p className="muted">{coleccion.desc}</p>
                <button className="mini">Ver detalles</button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Colecciones
