import { useEffect, useState  } from "react"
import { useParams } from "react-router-dom"
import CardProduct from "./CardProduct"

const ItemListContainer = (props) => {
  const { categories, products, loading } = props

  const urlParams = useParams()
  const [itemsData, setItemsData] = useState(null)
  const [itemsFound, setItemsFound] = useState(null)

  useEffect(() => {
    if(!loading && products !== null) {
      const categorySlug = urlParams.slug
      getItems(categorySlug)
    }
    // eslint-disable-next-line
  }, [urlParams, loading, products])

  const getItems = (categorySlug) => {
    let items = products
    
    if(categorySlug) {
      const category = categories.find(c => c.slug === categorySlug)
      
      if(category) {
        items = products.filter(product => product.categoryId === category.id)
      }
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
      {loading && (
        <div>loading...</div>
      )}

      {!loading && itemsFound === false && (
        <div className="text-center pt-3">No items to show!</div>
      )}

      {!loading && itemsFound && (
        <div className="container">
          <div className="row">
            {itemsData.map((item, i) => {
              return (
                <div className="col-3" key={`product-${i}`}>
                  <CardProduct id={item.id} name={item.name} price={item.price} image={item.image} />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
export default ItemListContainer