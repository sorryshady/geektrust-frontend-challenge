import React, { useContext, useState } from 'react'
import styles from './Cart.module.css'
import { CartContext } from '../../store/CartContext'
import CartItem from './CartItem/CartItem'
import { useSnackbar } from 'notistack'
import { ProductsContext } from '../../store/ProductsContext'
import { Link } from 'react-router-dom'
const Cart = () => {
  const { state, dispatch } = useContext(CartContext)
  const { stateProduct, dispatchProduct } = useContext(ProductsContext)
  const { enqueueSnackbar } = useSnackbar()

  //mocking placing an order
  const handleOrderClick = () => {
    enqueueSnackbar(`Placed Order`, { variant: 'success' })
    dispatch({ type: 'ORDER_PLACED' })
  }
  //removing item from cart(passing id)
  const cartItemRemoveHandler = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  }

  //adding item to cart. We are also checking to see if available quantity is greater than quantity wanted by user.
  //Only if the condition staisies are we dispatching action
  const cartItemAddHandler = (item) => {
    const updatedQuantity = item.quantity + 1
    //finding itemindex in productsList which contains all the products
    const currentProductIndex = stateProduct.productList.findIndex(
      (product) => item.id === product.id
    )
    //finding the item in the productsList so that we can access available quantity
    const currentProduct = stateProduct.productList[currentProductIndex]
    //doing the check
    if (updatedQuantity > currentProduct.quantity + 1) {
      enqueueSnackbar(`Invalid amount. Only ${item.quantity} available`, {
        variant: 'warning',
      })
    } else {
      //dispatching payload
      item = { ...item, quantity: 1 }
      dispatch({ type: 'ADD_TO_CART', payload: item })
    }
  }

  const cartItems = (
    <ul className={styles['cart-items']}>
      {/**mapping through the cart to display each individual item */}
      {state.cart.map((item) => (
        <CartItem
          key={item.id}
          img={item.imageURL}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          onRemove={() => cartItemRemoveHandler(item.id)}
          onAdd={() => cartItemAddHandler(item)}
        />
      ))}
    </ul>
  )
  return (
    <div className={styles['shopping-container']}>
      <p className={styles.heading}>Shopping Cart</p>
      {cartItems}
      {state.cart.length > 0 ? (
        <>
          <div className={styles.total}>
            <span>Total Amount</span>
            <span>Rs.{state.cartTotal}</span>
          </div>
          <div className={styles.actions}>
            <button className={styles.button} onClick={handleOrderClick}>
              Order
            </button>
          </div>
        </>
      ) : (
        <div className={styles['no-items']}>
          No items in Cart. Continue shopping{' '}
          <Link to='/'>
            <button className={styles['nav-button']}>here</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Cart
