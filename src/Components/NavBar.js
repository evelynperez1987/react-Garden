import { Link } from "react-router-dom"
import CartWidget from "./CartWidget"

const NavBar = (props) => {
  const { brandName, categories } = props
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">{brandName}</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <Link to="/" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categorías
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {categories.map((category, i) => {
                  const { title, slug } = category
                  return (
                    <li key={i}><Link to={`/category/${slug}`} className="dropdown-item">{title}</Link></li>
                  )
                })}
              </ul>
            </li>
          </ul>
        </div>

        <CartWidget />
      </div>
    </nav>
  )
}

export default NavBar