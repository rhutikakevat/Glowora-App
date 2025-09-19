import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ProductsListing from './pages/ProductsListing.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import WishlistProducts from './pages/WishlistProducts.jsx'
import CartProducts from './pages/CartProducts.jsx'


const routes = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/products",
    element:<ProductsListing/>
  },
  {
    path:"/products/:productId",
    element:<ProductDetail/>
  },
  {
    path:"/wishlist",
    element:<WishlistProducts/>
  },
  {
    path:"/cart",
    element:<CartProducts/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
