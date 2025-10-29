import Footer from "../components/Footer";
import Header from "../components/Header";
import "react-toastify/dist/ReactToastify.css";
import ListingProductswithAllFilter from "../components/ListingProductsWithAllFilter";
import { ProductContextProvider } from "../context/Products.context";
import { CategoriesContextProvider } from "../context/Categories.context";
import { WishlistsContextProvider } from "../context/Wishlists.context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContextProvider } from "../context/Cart.context";

export default function ProductsListing() {
  return (
    <>
      <CategoriesContextProvider>
        <ProductContextProvider>
          <WishlistsContextProvider>
            <CartContextProvider>
              <Header />

              <ListingProductswithAllFilter />

              <Footer />

              <ToastContainer position="top-right" autoClose={3000} />
            </CartContextProvider>
          </WishlistsContextProvider>
        </ProductContextProvider>
      </CategoriesContextProvider>
    </>
  );
}
