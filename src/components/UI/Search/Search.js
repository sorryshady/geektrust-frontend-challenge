import React from 'react'
import styles from './Search.module.css'
const Search = (props) => {
  return (
    <div id='search' className={styles.input}>
      <input
        type='text'
        placeholder='Search...'
        value={props.value}
        onChange={props.onChange}
      />
      <button className={styles.button} onClick={props.onClick}>
        Search
      </button>
    </div>
  )
}

export default Search
