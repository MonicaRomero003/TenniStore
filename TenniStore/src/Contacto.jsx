import './Contacto.css'

function Contacto() {
  return (
    <section className="pagina">
      <div className="cabecera-pagina">
        <p className="texto-pequeno">Contacto</p>
        <h1>Hablemos de tu proximo objetivo</h1>
        <p className="texto-apagado">Respuesta en menos de 24 horas.</p>
      </div>

      <form className="formulario">
        <label>
          Nombre
          <input type="text" placeholder="Tu nombre" />
        </label>
        <label>
          Correo
          <input type="email" placeholder="tu@correo.com" />
        </label>
        <label>
          Mensaje
          <textarea rows="5" placeholder="Cuentanos que necesitas" />
        </label>
        <button className="boton-primario" type="button">Enviar</button>
      </form>
    </section>
  )
}

export default Contacto
