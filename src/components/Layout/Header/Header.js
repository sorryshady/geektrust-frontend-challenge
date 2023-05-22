import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'
import { CartContext } from '../../../store/CartContext'

const Header = () => {
  const location = useLocation()
  const { state } = useContext(CartContext)

  //below two consts are used to apply styling
  const isProductsPage = location.pathname === '/'
  const isCartPage = location.pathname === '/cart'

  const { cart } = state

  return (
    <header id='header' className={styles['header-container']}>
      <div className={styles.logo}>
        <Link className={styles.link} to='/'>
          TeeRex Store
        </Link>
      </div>
      <div className={styles['nav-buttons']}>
        <Link className={styles.link} to='/'>
          <button
            className={`${styles.button} ${
              isProductsPage ? styles['hover-button'] : ''
            } ${styles['hide-products']}`}
          >
            Products
          </button>
        </Link>
        <Link className={styles.link} to='/cart'>
          <button
            className={`${styles.button} ${
              isCartPage ? styles['hover-button'] : ''
            }`}
          >
            Cart ({cart.length})
          </button>
        </Link>
      </div>
    </header>
  )
}

export default Header
