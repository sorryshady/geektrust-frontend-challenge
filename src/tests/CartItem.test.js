import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CartItem from '../components/Cart/CartItem/CartItem'
describe('CartItem', () => {
  it('should render CartItem component correctly', () => {
    // Mock props
    const props = {
      img: 'image-url',
      name: 'Product Name',
      price: 10,
      quantity: 2,
      onRemove: jest.fn(),
      onAdd: jest.fn(),
    }

    // Render the component
    const { getByText, getByAltText } = render(<CartItem {...props} />)

    // Assertions
    expect(getByAltText('Product Name')).toBeInTheDocument()
    expect(getByText('Product Name')).toBeInTheDocument()
    expect(getByText('Rs.10')).toBeInTheDocument()
    expect(getByText('x 2')).toBeInTheDocument()
  })

  it('should call onRemove callback when remove button is clicked', () => {
    // Mock props
    const props = {
      img: 'image-url',
      name: 'Product Name',
      price: 10,
      quantity: 2,
      onRemove: jest.fn(),
      onAdd: jest.fn(),
    }

    // Render the component
    const { getByText } = render(<CartItem {...props} />)

    // Trigger the remove button click event
    fireEvent.click(getByText('−'))

    // Assertion
    expect(props.onRemove).toHaveBeenCalledTimes(1)
  })

  it('should call onAdd callback when add button is clicked', () => {
    // Mock props
    const props = {
      img: 'image-url',
      name: 'Product Name',
      price: 10,
      quantity: 2,
      onRemove: jest.fn(),
      onAdd: jest.fn(),
    }

    // Render the component
    const { getByText } = render(<CartItem {...props} />)

    // Trigger the add button click event
    fireEvent.click(getByText('+'))

    // Assertion
    expect(props.onAdd).toHaveBeenCalledTimes(1)
  })
})
