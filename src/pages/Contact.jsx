import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactComponent from "../components/ContactComponent";
import { CategoriesContextProvider } from "../context/Categories.context";
import { ProductContextProvider } from "../context/Products.context";
import { CartContextProvider } from "../context/Cart.context";
import { WishlistsContextProvider } from "../context/Wishlists.context";

export default function ContactPage() {
  return (
    <>
      <CategoriesContextProvider>
        <ProductContextProvider>
          <WishlistsContextProvider>
            <CartContextProvider>
              <Header />

              <ContactComponent/>

              <Footer />
            </CartContextProvider>
          </WishlistsContextProvider>
        </ProductContextProvider>
      </CategoriesContextProvider>
    </>
  );
}
