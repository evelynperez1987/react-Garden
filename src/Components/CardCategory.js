import { Link } from "react-router-dom"
import "../assets/stylesheets/components/card.scss"

const CardCategory = (props) => {
  const {name, slug, image} = props
  
  return (
    <div className="card">
      <Link to={`/category/${slug}`} aria-current="page">
        <div className="card-image-container">
          <img alt="" src={image}></img>
        </div>
        <div className="card-name">{name}</div>
      </Link>
    </div>
  )
}

export default CardCategory