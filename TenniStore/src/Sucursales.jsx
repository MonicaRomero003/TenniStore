import './Sucursales.css'

const sucursales = [
  {
    name: 'TenniStore Polanco',
    address: 'Av. Campo Marte 110, CDMX',
    schedule: 'Lun-Sab 10:00-20:00',
  },
  {
    name: 'TenniStore Andares',
    address: 'Av. Patria 2085, Guadalajara',
    schedule: 'Lun-Dom 11:00-20:00',
  },
  {
    name: 'TenniStore Valle',
    address: 'Calz. del Valle 305, Monterrey',
    schedule: 'Lun-Sab 10:00-19:00',
  },
]

function Sucursales() {
  return (
    <section className="pagina">
      <div className="cabecera-pagina">
        <p className="texto-pequeno">Sucursales</p>
        <h1>Visita nuestras tiendas especializadas</h1>
        <p className="texto-apagado">Agenda tu asesoria en la tienda mas cercana.</p>
      </div>

      <div className="cuadricula">
        {sucursales.map((item) => (
          <article key={item.name} className="tarjeta">
            <h3>{item.name}</h3>
            <p className="texto-apagado">{item.address}</p>
            <span className="etiqueta">{item.schedule}</span>
            <button className="mini">Reservar cita</button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Sucursales
