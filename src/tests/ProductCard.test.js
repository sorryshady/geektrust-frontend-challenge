import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { SnackbarProvider } from 'notistack'
import { CartContext } from '../store/CartContext'
import ProductCard from '../components/Products/ProductCard/ProductCard'
import { getByRole } from '@testing-library/dom'

describe('ProductCard', () => {
  it('should render ProductCard component correctly', () => {
    const item = {
      id: '1',
      imageURL: 'image-url',
      name: 'Product Name',
      price: 10,
      quantity: 5,
    }

    const { getByText, getByAltText } = render(
      <SnackbarProvider>
        <CartContext.Provider value={{ state: {}, dispatch: jest.fn() }}>
          <ProductCard item={item} />
        </CartContext.Provider>
      </SnackbarProvider>
    )

    expect(getByAltText('Product Name')).toBeInTheDocument()
    expect(getByText('Product Name')).toBeInTheDocument()
    expect(getByText('Rs. 10')).toBeInTheDocument()
    expect(getByText('Add to Cart')).toBeInTheDocument()
  })

  it('should display the ProductItemForm when "Add to Cart" button is clicked', () => {
    const item = {
      id: '1',
      imageURL: 'image-url',
      name: 'Product Name',
      price: 10,
      quantity: 5,
    }

    const { getByText, getByTestId } = render(
      <SnackbarProvider>
        <CartContext.Provider value={{ state: {}, dispatch: jest.fn() }}>
          <ProductCard item={item} />
        </CartContext.Provider>
      </SnackbarProvider>
    )

    const addToCartButton = getByText('Add to Cart')
    screen.debug()

    fireEvent.click(addToCartButton)

    const plusButton = getByRole(document.body, 'button', { name: '+' })
    const minusButton = getByRole(document.body, 'button', { name: '-' })

    expect(plusButton).toBeInTheDocument()
    expect(minusButton).toBeInTheDocument()
  })
})
