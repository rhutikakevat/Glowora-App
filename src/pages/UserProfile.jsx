import Header from "../components/Header";
import Footer from "../components/Footer";
import { ProductContextProvider } from "../context/Products.context";
import { CategoriesContextProvider } from "../context/Categories.context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WishlistsContextProvider } from "../context/Wishlists.context";
import { CartContextProvider } from "../context/Cart.context";
import UserProfileComponent from "../components/UserProfileComponent";
import { UsersProfileContextProvider } from "../context/User.context";
import { AddressesContextProvider } from "../context/Address.context";

export default function UserProfile() {
  return (
    <>
      <CategoriesContextProvider>
        <ProductContextProvider>
          <WishlistsContextProvider>
            <CartContextProvider>
              <UsersProfileContextProvider>
                <AddressesContextProvider>
                  <Header />

                  <UserProfileComponent />

                  <Footer />

                  <ToastContainer position="top-right" autoClose={3000} />
                </AddressesContextProvider>
              </UsersProfileContextProvider>
            </CartContextProvider>
          </WishlistsContextProvider>
        </ProductContextProvider>
      </CategoriesContextProvider>
    </>
  );
}
