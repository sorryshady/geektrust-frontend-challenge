import React, { useContext, useEffect, useState } from 'react'
import styles from './Products.module.css'
import FilterSection from '../UI/FilterSection/FilterSection'
import { useSnackbar } from 'notistack'
import axios from 'axios'
import ProductCard from './ProductCard/ProductCard'
import Search from '../UI/Search/Search'
import ScrollToTop from '../UI/ScrollToTop/ScrollToTop'
import { ProductsContext } from '../../store/ProductsContext'

const Products = () => {
  const [catalogue, setCatalogue] = useState([])
  const [initialCatalogue, setInitialCatalogue] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterGender, setFilterGender] = useState('')
  const [filterColor, setFilterColor] = useState('')
  const [filterPriceRange, setFilterPriceRange] = useState('')
  const [filterType, setFilterType] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  const { stateProduct, dispatchProduct } = useContext(ProductsContext)

  useEffect(() => {
    fetchCatalogue()
  }, [])

  //fetching data via API call and intialising catalogue and intialCatalogue with the response.data
  const fetchCatalogue = async () => {
    try {
      const response = await axios.get(
        'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json'
      )
      const responseData = response.data || []
      setInitialCatalogue(responseData)
      setCatalogue(responseData)
      dispatchProduct({ type: 'SET_PRODUCT_LIST', payload: response.data })
      setLoading(false)
    } catch (error) {
      console.error('Error fetching catalogue:', error)
      enqueueSnackbar(`Failed to load data`, { variant: 'error' })
      setLoading(false)
    }
  }

  //updating search query
  const handleSearchChange = (event) => {
    const query = event.target.value
    setSearchQuery(query)

    if (query === '') {
      setCatalogue(initialCatalogue)
    }
  }

  //firing search functionality when search button is clicked
  const handleSearchButtonClick = () => {
    const searchKeywords = searchQuery.toLowerCase().split(' ')

    const filteredItems = catalogue.filter((item) => {
      const itemKeywords =
        `${item.name} ${item.color} ${item.type}`.toLowerCase()
      const hasSearchKeywords = searchKeywords.every((keyword) =>
        itemKeywords.includes(keyword)
      )
      return hasSearchKeywords
    })

    setCatalogue(filteredItems)
  }

  const handleFilterGenderChange = (event) => {
    setFilterGender(event.target.value)
  }

  const handleFilterColorChange = (event) => {
    setFilterColor(event.target.value)
  }

  const handleFilterPriceRangeChange = (event) => {
    setFilterPriceRange(event.target.value)
  }

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value)
  }

  //filtering existing catalogue based on filters applied
  const filterCatalogue = (item) => {
    const isGenderMatch = filterGender === '' || item.gender === filterGender
    const isPriceRangeMatch =
      filterPriceRange === '' || isPriceInRange(item.price, filterPriceRange)
    const isTypeMatch = filterType === '' || item.type === filterType
    const isColorMatch =
      filterColor === '' ||
      (item.color && item.color.toLowerCase() === filterColor.toLowerCase())

    return isGenderMatch && isPriceRangeMatch && isTypeMatch && isColorMatch
  }

  const isPriceInRange = (price, priceRange) => {
    const [minPrice, maxPrice] = priceRange.split('-').map(Number)
    return price >= minPrice && price <= maxPrice
  }

  const filteredCatalogue = catalogue.filter(filterCatalogue)

  return (
    <div className={styles['products-container']}>
      {/**This is for desktop/big screens */}
      <div className={styles['filter-container']}>
        <FilterSection
          filterGender={filterGender}
          filterColor={filterColor}
          filterPriceRange={filterPriceRange}
          filterType={filterType}
          onFilterGenderChange={handleFilterGenderChange}
          onFilterColorChange={handleFilterColorChange}
          onFilterPriceRangeChange={handleFilterPriceRangeChange}
          onFilterTypeChange={handleFilterTypeChange}
        />
      </div>
      <div className={styles['search-product-container']}>
        <div className={styles['search-bar']}>
          <Search
            value={searchQuery}
            onChange={handleSearchChange}
            onClick={handleSearchButtonClick}
          />
        </div>
        {/**This is fro mobile/small screens */}
        <div className={styles.mobile}>
          <FilterSection
            filterGender={filterGender}
            filterColor={filterColor}
            filterPriceRange={filterPriceRange}
            filterType={filterType}
            onFilterGenderChange={handleFilterGenderChange}
            onFilterColorChange={handleFilterColorChange}
            onFilterPriceRangeChange={handleFilterPriceRangeChange}
            onFilterTypeChange={handleFilterTypeChange}
          />
        </div>
        <div className={styles['catalogue-container']}>
          {loading ? (
            <div>Loading....</div>
          ) : (
            filteredCatalogue.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))
          )}
        </div>
        <ScrollToTop />
      </div>
    </div>
  )
}

export default Products
