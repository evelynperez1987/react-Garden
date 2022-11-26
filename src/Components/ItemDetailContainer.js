import { useEffect, useState  } from "react"
import { useParams } from "react-router-dom"
import "../assets/stylesheets/components/itemDetail.scss"
import { useCart } from "../context/CartContext"

const ItemDetailContainer = (props) => {
  const {items, loading} = props

  const urlParams = useParams()
  const [itemData, setItemData] = useState(null)
  const [itemFound, setItemFound] = useState(null)
  const [countOnCart, setCountOnCart] = useState(0)

  const {products, addToCart} = useCart()
  
  useEffect(() => {
    if(!loading && items !== null) {
      const itemId = urlParams.id
      getItem(itemId)
    }

    // eslint-disable-next-line
  }, [urlParams, loading, items])

  const getItem = (itemId) => {
    const item = items.find(p => p.id === itemId)

    if(item) {
      setItemData(item)
      setItemFound(true)
      let count = 0
  
      products.forEach(p => {
        if(p.id === item.id) {
          count++
        }
      })

      if(count > 0) {
        setCountOnCart(count)
      }
    } else {
      setItemFound(false)
    }
  }

  const addHandler = () => {
    addToCart(itemData)
    setCountOnCart(countOnCart + 1)
  }

  return (
    <div>
      {loading && (
        <div>loading...</div>
      )}
      
      {!loading && itemFound === false && (
        <div>Item not found!</div>
      )}
      
      {!loading && itemFound && itemData !== null && (
        <div className="container item-detail">
          <div className="row">
            <div className= "col-8 item-detail_image-container text-center">
              <img className="mt-5" alt="" src={`https://firebasestorage.googleapis.com/v0/b/garden-shop-6f80d.appspot.com/o/${itemData.image}?alt=media`}></img>
            </div>
            <div className= "col-4 card">
              <div className="fs-1 mt-3 fw-bold text-center">{itemData.name}</div>
              <div className="mt-3 fs-5 fst-italic">
                <div dangerouslySetInnerHTML={{__html: itemData.details}} />
              </div>
              <div className="mt-5 fs-2 fw-semibold text-center">${itemData.price}</div>
            </div>
          </div>
          <div>
            <button type="button" className="btn btn-primary" onClick={addHandler}>Agregar a carrito</button>
            &nbsp;(Cantidad en el Carrito: {countOnCart})
          </div>
        </div>
      )}

    </div>
  )
}

export default ItemDetailContainer