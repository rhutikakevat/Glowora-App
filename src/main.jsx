import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ProductsListing from './pages/ProductsListing.jsx'
import ProductDetail from './pages/ProductDetail.jsx'

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
    path:"/api/products/:productId",
    element:<ProductDetail/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
