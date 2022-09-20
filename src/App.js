import ItemListContainer from "./Components/ItemListContainer"
import NavBar from "./Components/NavBar"

const greetings = '¡Bienvenidos a mi tienda!'
const brandName = 'MyGarden'

function App() {
  return (
    <div className="App">
      <NavBar brandName={brandName} />
      <ItemListContainer greetings={greetings} />
    </div>
  )
}

export default App
