import React, { useRef, useState } from "react"
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore"
import { useCart } from "../context/CartContext"

const Order = () => {
  const {products, clearCart} = useCart()
  const [errorMsg, setErrorMsg] = useState(null)
  const [orderId, setOrderId] = useState(null)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const inputName = useRef()
  const inputPhone = useRef()
  const inputEmail = useRef()
  const inputRepeatEmail = useRef()

  let uniqueProducts = []
  let total = 0

  products.forEach(p => {
    const foundProduct = uniqueProducts.find(prod => prod.id === p.id)
    total += Number(p.price)
    if(foundProduct) {
      foundProduct.count++
      foundProduct.total += Number(p.price)
    } else {
      uniqueProducts = [...uniqueProducts, {...p, count: 1, total: Number(p.price)}]
    }
  })

  const checkForm = () => {
    const name = inputName.current.value
    const phone = inputPhone.current.value
    const email = inputEmail.current.value
    const repeatEmail = inputRepeatEmail.current.value

    if(name !== '' && phone !== '' && email !== '' && repeatEmail !== '') {
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }

  const putOrder = () => {
    // Validar campos y los emails que sean iguales
    // ->
    setBtnDisabled(true)
    const name = inputName.current.value.trim()
    const phone = inputPhone.current.value.trim()
    const email = inputEmail.current.value.trim().toLowerCase()
    const repeatEmail = inputRepeatEmail.current.value.trim().toLowerCase()

    if(uniqueProducts.length === 0) {
      setErrorMsg('No hay productos seleccionado.')

    } else if(email !== repeatEmail) {
      setErrorMsg('Los Emails deben coincidir.')
    
    } else if(name === '') {
      setErrorMsg('El campo de Name es requerido.')
    
    } else if(phone === '') {
      setErrorMsg('El campo de Phone es requerido.')

    } else {
      setErrorMsg(null)

      // Armar objetos para enviar a Firebase

      const order = {
        buyer: {
          name: name,
          phone: phone,
          email: email
        },
        items: products,
        total: total,
        createdTimestamp: serverTimestamp()
      }

      const db = getFirestore()
      const ordersCollection = collection(db, 'orders')
      addDoc(ordersCollection, order).then( ({id}) => {
        // Mostrar el ID de la orden creada al Usuario
        clearCart()
        inputName.current.value = ''
        inputPhone.current.value = ''
        inputEmail.current.value = ''
        inputRepeatEmail.current.value = ''
        setOrderId(id)
      
      }).catch(e => {
        setErrorMsg(e)
        setBtnDisabled(false)
      })
    }
  }

  return (
    <div className="d-flex flex-column">
      <div className="card align-self-center pt-4 pb-4 ps-5 pe-5 mb-5">
        <h1 className="text-center">Orden</h1>
        <div className="text-center">
          <ul className="d-inline-block p-0">
            {uniqueProducts.map((item, i) => {
              return (
                <li key={i}>
                  {item.name} x({item.count}) total: ${item.total}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="text-center fw-bold">Total: ${total}</div>

        <div className="container mt-4">
          <div className="d-flex flex-column">
            <div className="align-self-center">
              <div>
                <div className="row mb-3">
                  <div className="col-6">
                    <div>Name:</div>
                    <div><input type='text' ref={inputName} onChange={checkForm} /></div>
                  </div>
                  <div className="col-6">
                    <div>Phone:</div>
                    <div><input type='text' ref={inputPhone} onChange={checkForm} /></div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <div>Email:</div>
                    <div><input type='text' placeholder="name@example.com" ref={inputEmail} onChange={checkForm} /></div>
                  </div>
                  <div className="col-6">
                    <div>Repeat Email:</div>
                    <div><input type='text' placeholder="name@example.com" ref={inputRepeatEmail} onChange={checkForm} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container text-center mt-4">
          <button type="button" className="btn btn-primary" disabled={btnDisabled} onClick={putOrder}>Hacer pedido</button>
        </div>

        <div className="error text-center">{errorMsg}</div>
        {orderId !== null && (
          <div className="mt-4 success text-center fs-4">
            Su número de Orden es<br/>
            <span className="fw-bold">{orderId}</span>
          </div>
        )}
      </div>
    </div>   
      

      
  )
}

export default Order