import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"

const CartWidget = () => {

  const {products} = useCart() 

  return (
    <Link to="/cart" type="button" className="btn btn-light">
      <i className="bi bi-cart3"></i>
      <span>{products.length}</span>
    </Link>
  )
}

export default CartWidget