import React, { useContext, useState } from 'react'
import styles from './ProductCard.module.css'
import Card from '../../UI/Card/Card'
import { useSnackbar } from 'notistack'
import ProductItemForm from '../../UI/ProductCardForm/ProductCardForm'
import { CartContext } from '../../../store/CartContext'
const ProductCard = ({ item }) => {
  const [clicked, setClicked] = useState(false)
  const [count, setCount] = useState(1)
  const { enqueueSnackbar } = useSnackbar()
  const { state, dispatch } = useContext(CartContext)

  const clickHandler = (e) => {
    if (clicked) {
      setClicked(false)
      submitHandler(e)
    } else {
      setClicked(true)
    }
  }

  //dispacth action for adding product to cart but making sure that user required quantity is less than available quantity
  const submitHandler = (e) => {
    e.preventDefault()
    if (count > item.quantity) {
      enqueueSnackbar(
        `Cant add ${count} nos. Only ${item.quantity} available.`,
        {
          variant: 'warning',
        }
      )
    } else {
      const newItem = { ...item, quantity: count }
      dispatch({ type: 'ADD_TO_CART', payload: newItem })
    }
    setCount(1)
  }

  return (
    <div className={styles['product-card']}>
      <Card>
        <img src={item.imageURL} alt={item.name} className={styles.image} />
        <p className={styles.name}>{item.name}</p>
        <p className={styles.price}>{`Rs. ${item.price}`}</p>
        {/**When add to cart is clicked quantity selector shows on screen with which we can select quantity required */}
        {clicked && (
          <ProductItemForm id={item.id} onClick={setCount} count={count} />
        )}
        <button className={styles['add-to-cart-button']} onClick={clickHandler}>
          Add to Cart
        </button>
      </Card>
    </div>
  )
}

export default ProductCard
