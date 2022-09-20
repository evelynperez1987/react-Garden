const ItemListContainer = (props) => {
  const { greetings } = props

  return (
    <div className="text-center fs-1 py-3">{greetings}</div>
  )
}
export default ItemListContainer