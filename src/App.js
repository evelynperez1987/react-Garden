import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import {collection, getDocs, getFirestore} from "firebase/firestore"
import ItemDetailContainer from "./Components/ItemDetailContainer"
import ItemListContainer from "./Components/ItemListContainer"
import NavBar from "./Components/NavBar"
import "./assets/stylesheets/general.scss"
import { CardContextProvider } from "./context/CartContext"
import Cart from "./Components/Cart"
import Order from "./Components/Order"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.min.js'

const brandName = 'MyGarden'

const App = () => {

  const [categories, setCategories] = useState([])
  const [items, setItems] = useState(null)
  const [queryData, setQueryData] = useState(true)

  useEffect(() => {
    if(queryData) {
      getCategories()
      getItems()

      setQueryData(false)
    }
  }, [queryData])

  const getCategories = () =>  {
    const db = getFirestore()
    const docsRef = collection(db, 'categories')
    getDocs(docsRef).then(snapshot => {
      const data = snapshot.docs.map(e => ({id: e.id, ...e.data()}))
      setCategories(data)
    })
  }

  const getItems = () =>  {
    const db = getFirestore()
    const docsRef = collection(db, 'items')
    getDocs(docsRef).then(snapshot => {
      const data = snapshot.docs.map(e => ({id: e.id, ...e.data()}))
      setItems(data)
    })
  }

  return (
    <CardContextProvider>
      <BrowserRouter>
        <NavBar brandName={brandName} categories={categories} />
        <Routes>
          <Route exact path="/" element={
            <ItemListContainer categories={categories} products={items} loading={items === null} />
          } />
          
          <Route exact path="/category/:slug" element={
            <ItemListContainer categories={categories} products={items} loading={items === null} />
          } />
          
          <Route exact path="/item/:id" element={
            <ItemDetailContainer items={items} loading={items === null} />
          } />
          
          <Route exact path="/cart" element={
            <Cart />
          } />
          
          <Route exact path="/order" element={
            <Order />
          } />
        </Routes>
      </BrowserRouter>
    </CardContextProvider>
  )
}

export default App
