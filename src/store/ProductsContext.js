import React, { createContext, useReducer } from 'react'

const initialState = {
  productList: [],
}

const productsReducer = (state, action) => {
  if (action.type === 'SET_PRODUCT_LIST') {
    return {
      ...state,
      productList: action.payload,
    }
  }
  return initialState
}

export const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {
  const [stateProduct, dispatchProduct] = useReducer(
    productsReducer,
    initialState
  )

  return (
    <ProductsContext.Provider value={{ stateProduct, dispatchProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}
export default ProductsProvider
