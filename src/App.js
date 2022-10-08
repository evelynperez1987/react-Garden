import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useEffect, useState  } from "react"
import axios from "axios"
import ItemDetailContainer from "./Components/ItemDetailContainer"
import ItemListContainer from "./Components/ItemListContainer"
import NavBar from "./Components/NavBar"
import "./assets/stylesheets/general.scss"
import CategoryListContainer from "./Components/CategoryListContainer"

const brandName = 'MyGarden'

const App = () => {

  const [data, setData] = useState({"categories":[], "products": []})
  const [queryData, setQueryData] = useState(true)

  useEffect(() => {
    if(queryData) {
      getData()
      setQueryData(false)
    }
  }, [queryData])

  const getData = async () => {
    console.log('Query Data')
    const response = await axios.get('/data.json')
    const data = response.data
    setData(data)
  }

  return (
    <BrowserRouter>
      <NavBar brandName={brandName} categories={data.categories} />
      <Routes>
        <Route exact path="/" element={<ItemListContainer products={data.products} />} />
        <Route exact path="/category/:slug" element={<ItemListContainer products={data.products} />} />
        <Route exact path="/item/:id" element={<ItemDetailContainer />} />
        {
          // Esto lo dejo comentado para utilizarlo más adelante
          /*<Route exact path="/" element={<CategoryListContainer categories={data.categories} />} />*/
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App
