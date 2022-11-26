import { Link } from "react-router-dom"
import "../assets/stylesheets/components/card.scss"

const CardProduct = (props) => {
  const {id, name, price, image} = props
  
  return (
    <div className="card card-hover">
      <Link to={`/item/${id}`} aria-current="page">
        <div className="card-image-container">
          <img alt="" src={`https://firebasestorage.googleapis.com/v0/b/garden-shop-6f80d.appspot.com/o/${image}?alt=media`} />
        </div>
        <div className="card-name">{name}</div>
        <div className="card-price">${price}</div>
      </Link>
    </div>
  )
}

export default CardProduct