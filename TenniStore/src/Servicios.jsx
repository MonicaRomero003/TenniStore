import './Servicios.css'

const servicios = [
  {
    title: 'Personalizacion',
    detail: 'Balance, peso y ajuste a tu estilo.',
  },
  {
    title: 'Prueba de equipo',
    detail: 'Agenda una sesion para probar tu equipo.',
  },
  {
    title: 'Proteccion total',
    detail: 'Garantia extendida y mantenimiento.',
  },
]

function Servicios() {
  return (
    <section className="pagina">
      <div className="cabecera-pagina">
        <p className="texto-pequeno">Servicios</p>
        <h1>Te acompanamos en cada entrenamiento</h1>
        <p className="texto-apagado">Soluciones pensadas para mejorar tu rendimiento.</p>
      </div>

      <div className="cuadricula">
        {servicios.map((item) => (
          <article key={item.title} className="tarjeta">
            <h3>{item.title}</h3>
            <p className="texto-apagado">{item.detail}</p>
            <button className="mini">Agendar</button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Servicios
