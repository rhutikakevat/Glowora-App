import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router'
import './index.css'
import App from './App.jsx'
import ProductsListing from './pages/ProductsListing.jsx'

const routes = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/products/:productName",
    element:<ProductsListing/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
