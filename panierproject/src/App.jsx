import { useState } from 'react'
import CartProvider from './context/CartProvider'
import ProductList from './ProductList'
import Cart from './components/Cart'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='app'>
      <CartProvider>
        <div className='product-list'>
      <ProductList />
      </div>
      <div className='cart'>
      <Cart />
      </div>
      </CartProvider>
      </div>
    </>
  )
}

export default App
