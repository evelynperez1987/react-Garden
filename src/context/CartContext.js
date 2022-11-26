import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CartContext = createContext({
  products: [],
  addToCart: () => {},
  clearCart: () => {}
})

const useCart = () => {
  return useContext(CartContext)
}

const CardContextProvider = ({children}) => {
  const [products, setProducts] = useLocalStorage('products', [])
  
  const addToCart = (product) => {
    setProducts([...products, {...product}])
  }

  const clearCart = () => {
    setProducts([])
  }

  const context = {
    products: products,
    addToCart: addToCart,
    clearCart: clearCart
  }

  return (
    <CartContext.Provider value={context}>
      {children}
    </CartContext.Provider>
  ) 
}

export {useCart, CardContextProvider}