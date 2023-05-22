import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Header from './components/Layout/Header/Header'
import CartProvider from './store/CartContext'
import ProductsProvider from './store/ProductsContext'
function App() {
  return (
    <Router>
      <CartProvider>
        <ProductsProvider>
          <div className='app'>
            <Header />
            <div className='main-container'>
              <Routes>
                {/*Route for product page/main page*/}
                <Route path='/' element={<Products />} />
                {/*Route for cart page*/}
                <Route path='/cart' element={<Cart />} />
              </Routes>
            </div>
          </div>
        </ProductsProvider>
      </CartProvider>
    </Router>
  )
}

export default App
