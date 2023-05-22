import React from 'react'
import styles from './ProductCardForm.module.css'
const ProductItemForm = ({ id, onClick, count }) => {
  const removeHandler = () => {
    if (count === 1) {
      return
    } else {
      onClick((prevCount) => prevCount - 1)
    }
  }
  const addHandler = () => {
    onClick((prevCount) => prevCount + 1)
  }
  return (
    <div id={`product_${id}`} className={styles.form}>
      <button
        type='button'
        className={styles.actionButton}
        onClick={removeHandler}
      >
        -
      </button>
      <div className={styles.count}>{count}</div>
      <button
        type='button'
        className={styles.actionButton}
        onClick={addHandler}
      >
        +
      </button>
    </div>
  )
}

export default ProductItemForm
