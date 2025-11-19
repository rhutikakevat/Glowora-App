import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutUsComponent from "../components/AboutUsComponent";
import { CategoriesContextProvider } from "../context/Categories.context";
import { ProductContextProvider } from "../context/Products.context";
import { CartContextProvider } from "../context/Cart.context";
import { WishlistsContextProvider } from "../context/Wishlists.context";

export default function AboutPage() {
  return (
    <>
      <CategoriesContextProvider>
        <ProductContextProvider>
          <WishlistsContextProvider>
            <CartContextProvider>
              <Header />

              <AboutUsComponent />

              <Footer />
            </CartContextProvider>
          </WishlistsContextProvider>
        </ProductContextProvider>
      </CategoriesContextProvider>
    </>
  );
}
