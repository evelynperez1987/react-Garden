import axios from "axios"
import { useEffect, useState  } from "react"
import { useParams } from "react-router-dom"
import CardProduct from "./CardProduct"

const ItemListContainer = (props) => {
  const { products } = props

  const urlParams = useParams()
  const [ItemsData, setItemsData] = useState([])
  const [itemsFound, setItemsFound] = useState(true)

  useEffect(() => {
    const categorySlug = urlParams.slug
    getItems(categorySlug)
  }, [urlParams])

  const getItems = (categorySlug) => {
    let items = products
    
    if(categorySlug) {
      items = products.filter((product) => product.categorySlug === categorySlug)
    }

    if(items.length > 0) {
      setItemsData(items)
      setItemsFound(true)
    } else {
      setItemsFound(false)
    }
  }

  return (
    <div className="pb-5">
      {!itemsFound && (
        <div className="text-center pt-3">No items to show!</div>
      )}

      <div className="container">
        <div className="row">
          {itemsFound && ItemsData.map((item, i) => {
            return (
              <div className="col-3" key={`product-${i}`}>
                <CardProduct id={item.id} name={item.name} price={item.price} image={item.image} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default ItemListContainer