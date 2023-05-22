import React from 'react'
import styles from './CartItem.module.css'
const CartItem = (props) => {
  const price = `Rs.${props.price}`
  return (
    <li className={styles['cart-item']}>
      <img className={styles.image} src={props.img} alt={props.name} />
      <div>
        <h3>{props.name}</h3>
        <div className={styles.summary}>
          <span className={styles.price}>{price}</span>
          <span className={styles.quantity}>x {props.quantity}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  )
}

export default CartItem
