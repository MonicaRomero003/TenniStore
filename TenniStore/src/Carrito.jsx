import { useState, useEffect } from 'react'
import './Carrito.css'

const categoriasMap = {
  'Clothes': 'Ropa',
  'Electronics': 'Accesorios',
  'Furniture': 'Equipamiento',
  'Shoes': 'Calzado',
  'Others': 'Otros'
}

function Carrito() {
  const [carrito, setCarrito] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=5')
      .then(res => res.json())
      .then(data => {
        // Simular que estos productos están en el carrito con cantidades aleatorias
        const productosCarrito = data.map(producto => ({
          id: producto.id,
          title: producto.title,
          price: producto.price,
          cantidad: Math.floor(Math.random() * 3) + 1, // cantidad entre 1 y 3
          images: producto.images,
          category: categoriasMap[producto.category?.name] || 'Deporte'
        }))
        setCarrito(productosCarrito)
        setCargando(false)
      })
      .catch(() => {
        setCargando(false)
      })
  }, [])

  const totalPrecio = carrito.reduce((sum, item) => sum + (item.price * item.cantidad), 0)

  if (cargando) {
    return (
      <section className="pagina">
        <div className="cabecera-pagina">
          <p className="texto-pequeno">Carrito de compras</p>
          <h1>Cargando productos...</h1>
        </div>
      </section>
    )
  }

  return (
    <section className="pagina">
      <div className="cabecera-pagina">
        <p className="texto-pequeno">Carrito de compras</p>
        <h1>Revisa tu pedido</h1>
        <p className="texto-apagado">Vista de ejemplo de productos en el carrito.</p>
      </div>

      <div className="layout-carrito">
        <div className="items-carrito">
          {carrito.map((item) => (
            <article key={item.id} className="item-carrito">
              <div className="imagen-item">
                <img 
                  src={item.images?.[0] || 'https://via.placeholder.com/150/e5f2d6/111111?text=Producto'} 
                  alt={item.title}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://via.placeholder.com/150/e5f2d6/111111?text=Producto'
                  }}
                />
              </div>
              <div className="info-item">
                <h3>{item.title}</h3>
                <p className="texto-apagado">{item.category}</p>
              </div>
              <div className="cantidad-item">
                <span className="numero-cantidad">{item.cantidad}</span>
              </div>
              <div className="precio-item">
                <p className="precio-unitario">${item.price}</p>
                <p className="precio-total">${(item.price * item.cantidad).toFixed(2)}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="resumen-carrito">
          <h3>Resumen del pedido</h3>
          <div className="linea-resumen">
            <span>Subtotal</span>
            <span>${totalPrecio.toFixed(2)}</span>
          </div>
          <div className="linea-resumen">
            <span>Envío</span>
            <span>Gratis</span>
          </div>
          <div className="linea-resumen">
            <span>Impuestos</span>
            <span>${(totalPrecio * 0.16).toFixed(2)}</span>
          </div>
          <hr />
          <div className="total-resumen">
            <span>Total</span>
            <span>${(totalPrecio * 1.16).toFixed(2)}</span>
          </div>
          <button className="boton-primario boton-finalizar">Finalizar compra</button>
          <p className="nota-simulacion">*Esta es una simulación visual con datos de la API</p>
        </div>
      </div>
    </section>
  )
}

export default Carrito
