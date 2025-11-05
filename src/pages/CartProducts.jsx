import CartProductsComponent from "../components/CartProductsComponent";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WishlistsContextProvider } from "../context/Wishlists.context";
import { ProductContextProvider } from "../context/Products.context";
import { CategoriesContextProvider } from "../context/Categories.context";
import { CartContextProvider } from "../context/Cart.context";

export default function CartProducts() {
  return (
    <>
      <CategoriesContextProvider>
        <ProductContextProvider>
          <WishlistsContextProvider>
            <CartContextProvider>
              <Header />

              <CartProductsComponent />

              <Footer />

              <ToastContainer position="top-right" autoClose={3000} />
            </CartContextProvider>
          </WishlistsContextProvider>
        </ProductContextProvider>
      </CategoriesContextProvider>
    </>
  );
}