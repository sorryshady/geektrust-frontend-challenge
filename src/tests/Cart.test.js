import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { CartContext } from '../store/CartContext'
import { ProductsContext } from '../store/ProductsContext'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter as Router } from 'react-router-dom'
import Cart from '../components/Cart/Cart'

describe('Cart', () => {
  it('should render Cart component correctly', () => {
    // Mock CartContext and ProductsContext values
    const cartContextValue = {
      state: {
        cart: [
          {
            id: '1',
            imageURL: 'image-url',
            name: 'Product Name',
            price: 10,
            quantity: 2,
          },
        ],
        cartTotal: 20,
      },
      dispatch: jest.fn(),
    }
    const productsContextValue = {
      stateProduct: {
        productList: [
          {
            id: '1',
            imageURL: 'image-url',
            name: 'Product Name',
            price: 10,
            quantity: 2,
          },
        ],
      },
      dispatchProduct: jest.fn(),
    }

    // Render the component within the necessary context providers
    const { getByText, getByAltText } = render(
      <CartContext.Provider value={cartContextValue}>
        <ProductsContext.Provider value={productsContextValue}>
          <SnackbarProvider>
            <Router>
              <Cart />
            </Router>
          </SnackbarProvider>
        </ProductsContext.Provider>
      </CartContext.Provider>,
      { debug: true } // Enable debug option
    )

    // Assertions
    expect(getByText('Shopping Cart')).toBeInTheDocument()
    expect(getByAltText('Product Name')).toBeInTheDocument()
    expect(getByText('Product Name')).toBeInTheDocument()
    expect(getByText('Rs.20')).toBeInTheDocument()
    expect(getByText('x 2')).toBeInTheDocument()
    expect(getByText('Total Amount')).toBeInTheDocument()
    expect(getByText('Rs.20')).toBeInTheDocument()
    expect(getByText('Order')).toBeInTheDocument()
  })
  it('should call cartItemRemoveHandler when remove button is clicked', () => {
    // Mock CartContext and ProductsContext values
    const cartContextValue = {
      state: {
        cart: [
          {
            id: '1',
            imageURL: 'image-url',
            name: 'Product Name',
            price: 10,
            quantity: 2,
          },
        ],
        cartTotal: 20,
      },
      dispatch: jest.fn(),
    }
    const productsContextValue = {
      stateProduct: {
        productList: [
          {
            id: '1',
            quantity: 5,
          },
        ],
      },
      dispatchProduct: jest.fn(),
    }

    // Render the component within the necessary context providers
    const { getByText } = render(
      <CartContext.Provider value={cartContextValue}>
        <ProductsContext.Provider value={productsContextValue}>
          <SnackbarProvider>
            <Router>
              <Cart />
            </Router>
          </SnackbarProvider>
        </ProductsContext.Provider>
      </CartContext.Provider>,
      { debug: true } // Enable debug option
    )

    // Trigger the remove button click event
    fireEvent.click(getByText('−'))

    // Assertion
    expect(cartContextValue.dispatch).toHaveBeenCalledTimes(1)
    expect(cartContextValue.dispatch).toHaveBeenCalledWith({
      type: 'REMOVE_FROM_CART',
      payload: '1',
    })
  })

  it('should call cartItemAddHandler when add button is clicked', () => {
    // Mock CartContext and ProductsContext values
    const cartContextValue = {
      state: {
        cart: [
          {
            id: '1',
            imageURL: 'image-url',
            name: 'Product Name',
            price: 10,
            quantity: 2,
          },
        ],
        cartTotal: 20,
      },
      dispatch: jest.fn(),
    }
    const productsContextValue = {
      stateProduct: {
        productList: [
          {
            id: '1',
            quantity: 5,
          },
        ],
      },
      dispatchProduct: jest.fn(),
    }

    // Render the component within the necessary context providers
    const { getByText } = render(
      <CartContext.Provider value={cartContextValue}>
        <ProductsContext.Provider value={productsContextValue}>
          <SnackbarProvider>
            <Router>
              <Cart />
            </Router>
          </SnackbarProvider>
        </ProductsContext.Provider>
      </CartContext.Provider>,
      { debug: true } // Enable debug option
    )

    // Trigger the add button click event
    fireEvent.click(getByText('+'))

    // Assertion
    expect(cartContextValue.dispatch).toHaveBeenCalledTimes(1)
    expect(cartContextValue.dispatch).toHaveBeenCalledWith({
      type: 'ADD_TO_CART',
      payload: {
        id: '1',
        imageURL: 'image-url',
        name: 'Product Name',
        price: 10,
        quantity: 1,
      },
    })
  })

  it('should display "No items in Cart" message when cart is empty', () => {
    // Mock CartContext and ProductsContext values
    const cartContextValue = {
      state: {
        cart: [],
        cartTotal: 0,
      },
      dispatch: jest.fn(),
    }
    const productsContextValue = {
      stateProduct: {
        productList: [],
      },
      dispatchProduct: jest.fn(),
    }

    // Render the component within the necessary context providers
    const { getByText } = render(
      <CartContext.Provider value={cartContextValue}>
        <ProductsContext.Provider value={productsContextValue}>
          <SnackbarProvider>
            <Router>
              <Cart />
            </Router>
          </SnackbarProvider>
        </ProductsContext.Provider>
      </CartContext.Provider>,
      { debug: true } // Enable debug option
    )

    // Assertion
    expect(getByText('No items in Cart. Continue shopping')).toBeInTheDocument()
  })
})
