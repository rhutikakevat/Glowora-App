import CheckoutComponent from "../components/CheckoutComponent";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ProductContextProvider } from "../context/Products.context";
import { CategoriesContextProvider } from "../context/Categories.context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WishlistsContextProvider } from "../context/Wishlists.context";
import { CartContextProvider } from "../context/Cart.context";
import { UsersProfileContextProvider } from "../context/User.context";
import { AddressesContextProvider } from "../context/Address.context";
import { OrderProvider } from "../context/Order.context";

export default function Checkout() {
  return (
    <>
      <CategoriesContextProvider>
        <ProductContextProvider>
          <WishlistsContextProvider>
            <CartContextProvider>
              <UsersProfileContextProvider>
                <AddressesContextProvider>
                  <OrderProvider>
                    <Header />

                    <CheckoutComponent />

                    <Footer />

                    <ToastContainer position="top-right" autoClose={3000} />
                  </OrderProvider>
                </AddressesContextProvider>
              </UsersProfileContextProvider>
            </CartContextProvider>
          </WishlistsContextProvider>
        </ProductContextProvider>
      </CategoriesContextProvider>
    </>
  );
}
