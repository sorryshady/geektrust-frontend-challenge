import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from '../components/Layout/Header/Header'
import { CartContext } from '../store/CartContext'

describe('Header', () => {
  it('should render Header component correctly', () => {
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
      },
    }

    const { getByText } = render(
      <CartContext.Provider value={cartContextValue}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </CartContext.Provider>
    )

    expect(getByText('TeeRex Store')).toBeInTheDocument()
    expect(getByText('Products')).toBeInTheDocument()
    expect(getByText('Cart (1)')).toBeInTheDocument()
  })

  it('should highlight Products button when on the products page', () => {
    const cartContextValue = {
      state: {
        cart: [],
      },
    }

    const { getByText } = render(
      <CartContext.Provider value={cartContextValue}>
        <MemoryRouter initialEntries={['/']}>
          <Header />
        </MemoryRouter>
      </CartContext.Provider>
    )

    expect(getByText('Products')).toHaveClass('hover-button')
  })

  it('should highlight Cart button when on the cart page', () => {
    const cartContextValue = {
      state: {
        cart: [],
      },
    }

    const { getByText } = render(
      <CartContext.Provider value={cartContextValue}>
        <MemoryRouter initialEntries={['/cart']}>
          <Header />
        </MemoryRouter>
      </CartContext.Provider>
    )

    expect(getByText('Cart (0)')).toHaveClass('hover-button')
  })
})
