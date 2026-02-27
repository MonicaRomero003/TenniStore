import { useEffect, useState } from 'react'
import './Inicio.css'

const svgPlaceholder = (label, bg) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="520" viewBox="0 0 700 520">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${bg}" />
        <stop offset="1" stop-color="#f5f2e8" />
      </linearGradient>
    </defs>
    <rect width="700" height="520" fill="url(#g)" />
    <circle cx="520" cy="130" r="90" fill="#0b0b0b" opacity="0.08" />
    <circle cx="140" cy="390" r="120" fill="#0b0b0b" opacity="0.08" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-family="Arial, Helvetica, sans-serif" font-size="42" fill="#111111">
      ${label}
    </text>
  </svg>`

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const highlights = [
  { title: 'Envios 24/48', detail: 'Cobertura nacional y seguimiento en tiempo real.' },
  { title: 'Ajuste Perfecto', detail: 'Guia de tallas con recomendacion por tipo de actividad.' },
  { title: 'Stock Vivo', detail: 'Inventario actualizado cada 10 minutos.' },
]

const reviews = [
  {
    name: 'Alejandra R.',
    text: 'El ajuste fue rapido y senti mas control desde el primer entrenamiento.',
  },
  {
    name: 'Luis F.',
    text: 'Me gusto el filtro por tipo de actividad, encontre justo lo que buscaba.',
  },
  {
    name: 'Marco C.',
    text: 'Entrega puntual y el equipo tiene una calidad brutal.',
  },
]

const productoDestacados = [
  {
    id: 'jersey-multicolor',
    title: 'Jersey Multicolor Pro',
    price: 899,
    image: 'https://static.vecteezy.com/system/resources/thumbnails/051/043/910/small/a-colorful-shirt-or-long-sleeve-jersey-with-a-multicolored-texture-design-isolated-on-a-transparent-background-png.png',
    category: 'Ropa'
  },
  {
    id: 'nike-energy',
    title: 'Nike Energy Jersey',
    price: 1299,
    image: 'https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto/98ca00bf-3184-4a51-b008-2157172b65b0/M+NK+DF+T90+ENERGY+JSY+5.png',
    category: 'Ropa'
  },
  {
    id: 'conjunto-tactico',
    title: 'Conjunto Táctico Sport',
    price: 1599,
    image: 'https://www.fenixfitmexico.com/cdn/shop/files/MILITAR2_d33a2361-f8bf-42b8-ab79-bb7c9a4825af.png?v=1722539897&width=1100',
    category: 'Ropa'
  },
  {
    id: 'buzos-premium',
    title: 'Buzos Premium Training',
    price: 1799,
    image: 'https://www.ostu.com/on/demandware.static/-/Sites-storefront_catalog_ostu/default/dw5a352540/images/filters/carrusel-ropa-deportiva-hombre-buzos.webp',
    category: 'Ropa'
  },
]

const accesos = [
  {
    title: 'Productos',
    detail: 'Equipo deportivo y accesorios listos para competir.',
    vista: 'productos',
    image: svgPlaceholder('Productos', '#e5f2d6'),
  },
  {
    title: 'Carrito',
    detail: 'Revisa tus productos y finaliza tu compra.',
    vista: 'carrito',
    image: svgPlaceholder('Carrito', '#f2dcc8'),
  },
  {
    title: 'Servicios',
    detail: 'Personalizacion, pruebas y garantias extendidas.',
    vista: 'servicios',
    image: svgPlaceholder('Servicios', '#dfeef5'),
  },
  {
    title: 'Sucursales',
    detail: 'Visitanos y agenda tu asesoria personalizada.',
    vista: 'sucursales',
    image: svgPlaceholder('Sucursales', '#f5e2ea'),
  },
  {
    title: 'Contacto',
    detail: 'Asesoria directa y soporte a tu compra.',
    vista: 'contacto',
    image: svgPlaceholder('Contacto', '#f0ece4'),
  },
]

function Inicio({ onNavigate }) {
  const [weather, setWeather] = useState({
    status: 'loading',
    data: null,
    error: null,
  })

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
    const city = 'Xicotepec de Juarez, Puebla, MX'

    if (!apiKey) {
      setWeather({
        status: 'error',
        data: null,
        error: 'Falta la API key de OpenWeather.'
      })
      return
    }

    const fetchWeather = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&lang=es&appid=${apiKey}`
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error('No se pudo obtener el clima.')
        }

        const data = await response.json()
        setWeather({ status: 'success', data, error: null })
      } catch (error) {
        setWeather({
          status: 'error',
          data: null,
          error: error instanceof Error ? error.message : 'Error inesperado.'
        })
      }
    }

    fetchWeather()
  }, [])

  const weatherContent = () => {
    if (weather.status === 'loading') {
      return <p className="weather-status">Cargando clima...</p>
    }

    if (weather.status === 'error') {
      return <p className="weather-status">{weather.error}</p>
    }

    const { data } = weather
    const icon = data?.weather?.[0]?.icon
    const description = data?.weather?.[0]?.description
    const temperature = Math.round(data?.main?.temp)
    const feelsLike = Math.round(data?.main?.feels_like)
    const humidity = data?.main?.humidity
    const wind = Math.round(data?.wind?.speed)
    const time = new Date((data?.dt ?? 0) * 1000).toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit'
    })

    return (
      <>
        <div className="weather-info">
          <p className="eyebrow">Clima en Xicotepec de Juarez</p>
          <h2>{temperature}°C</h2>
          <p className="weather-desc">{description} · Sensacion {feelsLike}°C</p>
          <div className="weather-chips">
            <span>Humedad {humidity}%</span>
            <span>Viento {wind} m/s</span>
            <span>Actualizado {time}</span>
          </div>
        </div>
        <div className="weather-visual">
          {icon && (
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={description}
            />
          )}
        </div>
      </>
    )
  }

  return (
    <div className="tienda">
      <header className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Tienda especializada en alto rendimiento</p>
            <h1>Equipa tu entrenamiento con precision y estilo.</h1>
            <p className="lead">
              Seleccion curada de equipo deportivo, calzado y accesorios con datos de
              stock en vivo y recomendaciones por tipo de actividad.
            </p>
            <div className="hero-actions">
              <button className="primary" onClick={() => onNavigate('productos')}>Comprar ahora</button>
              <button className="ghost" onClick={() => onNavigate('carrito')}>Ver carrito</button>
            </div>
            <div className="hero-highlights">
              {highlights.map((item) => (
                <div key={item.title} className="highlight">
                  <h4>{item.title}</h4>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-image" />
            <div className="hero-meta">
              <div>
                <h3>Kit Performance</h3>
                <p>Equipo completo + bolsa + accesorios personalizados.</p>
              </div>
              <button className="mini">Ver kit</button>
            </div>
          </div>
        </div>
      </header>

      <section className="weather-banner">
        {weatherContent()}
      </section>

      <section className="section productos-destacados">
        <div className="section-head">
          <div>
            <p className="eyebrow">Lo más vendido</p>
            <h2>Equípate con lo mejor</h2>
          </div>
          <button className="ghost" onClick={() => onNavigate('productos')}>Ver todo</button>
        </div>

        <div className="productos-grid">
          {productoDestacados.map((item) => (
            <article key={item.id} className="producto-card">
              <div className="producto-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="producto-info">
                <h3>{item.title}</h3>
                <p className="precio">${item.price}</p>
                <button className="mini">Ver detalles</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="lifestyle-banner">
        <div className="lifestyle-content">
          <div className="lifestyle-text">
            <p className="eyebrow">Lifestyle</p>
            <h2>Entrena con estilo</h2>
            <p className="lead">
              Colecciones diseñadas para el desempeño máximo y comodidad total.
            </p>
            <button className="primary" onClick={() => onNavigate('productos')}>Ver productos</button>
          </div>
          <div className="lifestyle-image-wrap">
            <div className="lifestyle-platform"></div>
            <img 
              src="https://st5.depositphotos.com/13132310/83065/p/450/depositphotos_830654252-stock-photo-young-slim-athletic-girl-sportswear.png" 
              alt="Atleta en entrenamiento"
              className="lifestyle-model"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Explora</p>
            <h2>Accesos rapidos a cada seccion</h2>
          </div>
        </div>

        <div className="acceso-grid">
          {accesos.map((item) => (
            <article key={item.title} className="acceso-card" onClick={() => onNavigate(item.vista)}>
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p className="muted">{item.detail}</p>
                <button className="mini">Ir ahora</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section reviews">

        <div>
          <p className="eyebrow">Comunidad</p>
          <h2>Jugadores reales, resultados reales.</h2>
        </div>
        <div className="review-grid">
          {reviews.map((review) => (
            <article key={review.name} className="review">
              <p>"{review.text}"</p>
              <span className="muted">{review.name}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="cta">
        <div>
          <h2>Recibe lanzamientos y ofertas privadas.</h2>
          <p className="muted">
            Suscribete y recibe una guia de entrenamiento gratis.
          </p>
        </div>
        <form className="cta-form">
          <input type="email" placeholder="tu correo" />
          <button className="primary" type="button">Suscribirme</button>
        </form>
      </section>

      <footer className="footer">
        <div>
          <h3>TenniStore</h3>
          <p className="muted">La tienda de equipo para atletas exigentes.</p>
        </div>
        <div className="footer-links">
          <button onClick={() => onNavigate('productos')}>Productos</button>
          <button onClick={() => onNavigate('carrito')}>Carrito</button>
          <button onClick={() => onNavigate('servicios')}>Servicios</button>
        </div>
      </footer>
    </div>
  )
}

export default Inicio
