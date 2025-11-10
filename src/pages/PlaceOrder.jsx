import CheckoutComponent from "../components/CheckoutComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ProductContextProvider } from "../context/Products.context";
import { CategoriesContextProvider } from "../context/Categories.context";
import { WishlistsContextProvider } from "../context/Wishlists.context";
import { CartContextProvider } from "../context/Cart.context";
import PlaceOrderComponent from "../components/PlaceOrderComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PlaceOrder() {
  return (
    <>
      <CategoriesContextProvider>
        <ProductContextProvider>
          <WishlistsContextProvider>
            <CartContextProvider>
              <Header />

              <PlaceOrderComponent />

              <Footer />

              <ToastContainer position="top-right" autoClose={3000} />
            </CartContextProvider>
          </WishlistsContextProvider>
        </ProductContextProvider>
      </CategoriesContextProvider>
    </>
  );
}
