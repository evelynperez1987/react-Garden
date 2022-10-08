import { Link } from "react-router-dom"
import "../assets/stylesheets/components/card.scss"

const CardProduct = (props) => {
  const {id, name, price, image} = props
  
  return (
    <div className="card">
      <Link to={`/item/${id}`} aria-current="page">
        <div className="card-image-container">
          <img alt="" src={image}></img>
        </div>
        <div className="card-name">{name}</div>
        <div className="card-price">${price}</div>
      </Link>
    </div>
  )
}

export default CardProduct