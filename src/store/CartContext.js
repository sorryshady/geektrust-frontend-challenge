import React, { createContext, useReducer } from 'react'

const initialState = {
  cart: [],
  cartTotal: 0,
}
const cartReducer = (state, action) => {
  if (action.type === 'ADD_TO_CART') {
    const newItem = action.payload
    const updatedCartTotal = state.cartTotal + newItem.price * newItem.quantity
    const existingCartItemIndex = state.cart.findIndex(
      (item) => item.id === newItem.id
    )
    const existingCartItem = state.cart[existingCartItemIndex]
    let updatedItems
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + newItem.quantity,
      }
      console.log(updatedItem)
      updatedItems = [...state.cart]
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      updatedItems = state.cart.concat(newItem)
    }
    return {
      cart: updatedItems,
      cartTotal: updatedCartTotal,
    }
  }
  if (action.type === 'REMOVE_FROM_CART') {
    const newItem = action.payload
    const existingCartItemIndex = state.cart.findIndex(
      (item) => item.id === newItem
    )
    const existingCartItem = state.cart[existingCartItemIndex]
    const updatedCartTotal = state.cartTotal - existingCartItem.price
    let updatedItems
    if (existingCartItem.quantity === 1) {
      updatedItems = state.cart.filter((item) => item.id !== newItem)
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      }
      updatedItems = [...state.cart]
      updatedItems[existingCartItemIndex] = updatedItem
    }
    return { cart: updatedItems, cartTotal: updatedCartTotal }
  }
  if (action.type === 'ORDER_PLACED') {
    return initialState
  }
  return initialState
}

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}
export default CartProvider
