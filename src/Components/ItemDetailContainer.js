import axios from "axios"
import { useEffect, useState  } from "react"
import { useParams } from "react-router-dom"
import "../assets/stylesheets/components/itemDetail.scss"

const ItemDetailContainer = (props) => {
  const urlParams = useParams()
  const [ItemData, setItemData] = useState(null)
  const [itemFound, setItemFound] = useState(true)
  
  useEffect(() => {
    const itemId = urlParams.id
    getItem(itemId)
  }, [urlParams])

  const getItem = async (itemId) => {
    const response = await axios.get('/data.json')
    const item = response.data.products.find((product) => product.id === itemId)
    if(item) {
      setItemData(item)
    } else {
      setItemFound(false)
    }
  }

  return (
    <div>
      {!itemFound && (
        <div>Item not found!</div>
      )}

      {itemFound && ItemData !== null && (

        <div className="container item-detail">
          <div className="row">
            <div className= "col-8 item-detail_image-container text-center">
              <img className="mt-5" alt="" src={ItemData.image}></img>
            </div>
            <div className= "col-4 card">
              <div className="fs-1 mt-3 fw-bold text-center">{ItemData.name}</div>
              <div className="mt-3 fs-5 fst-italic">
                <div dangerouslySetInnerHTML={{__html: ItemData.details}} />
              </div>
              <div className="mt-5 fs-2 fw-semibold text-center">${ItemData.price}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ItemDetailContainer