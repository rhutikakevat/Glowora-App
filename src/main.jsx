import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ProductsListing from "./pages/ProductsListing.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import WishlistProducts from "./pages/WishlistProducts.jsx";
import CartProducts from "./pages/CartProducts.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Checkout from "./pages/Checkout.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Orders from "./pages/Orders.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products",
    element: <ProductsListing />,
  },
  {
    path: "/products/:productId",
    element: <ProductDetail />,
  },
  {
    path: "/wishlist",
    element: <WishlistProducts />,
  },
  {
    path: "/cart",
    element: <CartProducts />,
  },
  {
    path: "/profile",
    element: <UserProfile />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/placeOrder",
    element: <PlaceOrder />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
