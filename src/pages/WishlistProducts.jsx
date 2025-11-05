import Header from "../components/Header";
import Footer from "../components/Footer";
import { ProductContextProvider } from "../context/Products.context";
import WishlistsProductsComponents from "../components/WishlistsProductsComponents";
import { CategoriesContextProvider } from "../context/Categories.context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WishlistsContextProvider } from "../context/Wishlists.context";
import { CartContextProvider } from "../context/Cart.context";

export default function ProductDetail() {
  return (
    <>
      <CategoriesContextProvider>
        <ProductContextProvider>
          <WishlistsContextProvider>
            <CartContextProvider>
              <Header />

              <WishlistsProductsComponents />

              <Footer />

              <ToastContainer position="top-right" autoClose={3000} />
            </CartContextProvider>
          </WishlistsContextProvider>
        </ProductContextProvider>
      </CategoriesContextProvider>
    </>
  );
}