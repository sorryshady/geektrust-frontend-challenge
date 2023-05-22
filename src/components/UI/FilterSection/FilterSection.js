import React from 'react'
import styles from './FilterSection.module.css'
import Card from '../Card/Card'

const FilterSection = (props) => {
  return (
    <Card>
      <div className={styles['filter-section']}>
        <div className={styles.filter}>
          <label htmlFor='gender'>Gender: </label>
          <select
            id='gender'
            value={props.filterGender}
            onChange={props.onFilterGenderChange}
          >
            <option value=''>All</option>
            <option value='Men'>Men</option>
            <option value='Women'>Women</option>
          </select>
        </div>
        <div className={styles.filter}>
          <label htmlFor='color'>Color: </label>
          <select
            id='color'
            value={props.filterColor}
            onChange={props.onFilterColorChange}
          >
            <option value=''>All</option>
            <option value='Red'>Red</option>
            <option value='Blue'>Blue</option>
            <option value='Green'>Green</option>
          </select>
        </div>
        <div className={styles.filter}>
          <label htmlFor='price-range'>Price Range: </label>
          <select
            id='price-range'
            value={props.filterPriceRange}
            onChange={props.onFilterPriceRangeChange}
          >
            <option value=''>All</option>
            <option value='0-250'>Rs 0 - Rs 250</option>
            <option value='251-450'>Rs 251 - Rs 450</option>
            <option value='451-1000'>Rs 451 - Rs 1000</option>
          </select>
        </div>
        <div className={styles.filter}>
          <label htmlFor='type'>Type: </label>
          <select
            id='type'
            value={props.filterType}
            onChange={props.onFilterTypeChange}
          >
            <option value=''>All</option>
            <option value='Polo'>Polo</option>
            <option value='Hoodie'>Hoodie</option>
            <option value='Basic'>Basic</option>
          </select>
        </div>
      </div>
    </Card>
  )
}

export default FilterSection
