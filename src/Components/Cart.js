import React from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

const Cart = () => {
  const {products, clearCart} = useCart()

  let uniqueProducts = []
  
  products.forEach(p => {
    const foundProduct = uniqueProducts.find(prod => prod.id === p.id)
    if(foundProduct) {
      foundProduct.count++
    } else {
      uniqueProducts = [...uniqueProducts, {...p, count: 1}]
    }
  })

  const clearHandler = () => {
    clearCart()
  }

  return (
    <div className="d-flex flex-column">
      <div className="align-self-center pt-4 pb-4 ps-5 pe-5 mb-5">
        <h1 className="text-center">Productos</h1>
        <ul>
          {uniqueProducts.map((p, i) =>
            <li key={i}>{p.name} (x{p.count}) = ${p.price * p.count}</li>
          )}
        </ul>
        <Link type="button" className="btn btn-primary me-2" to="/order">Crear Orden</Link>
        <button type="button" className="btn btn-danger" onClick={clearHandler}>Limpiar Carrito</button>
      </div>
    </div>
  )
}
export default Cart