import React from 'react'
import styles from './ScrollToTop.module.css'

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button className={styles['scroll-button']} onClick={scrollToTop}>
      <i className='fa-solid fa-angle-up'></i>
    </button>
  )
}

export default ScrollToTop
