import Header from "../components/Header"
import Footer from "../components/Footer"
import "react-toastify/dist/ReactToastify.css";
import { ProductContextProvider } from "../context/Products.context";
import WishlistsProductsComponents from "../components/WishlistsProductsComponents"
import { CategoriesContextProvider } from "../context/Categories.context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WishlistsContextProvider } from "../context/Wishlists.Context";

export default function ProductDetail() {
    return (
        <>          
            <CategoriesContextProvider>
                <ProductContextProvider> 
                    <WishlistsContextProvider>                   

                            <Header />              

                            <WishlistsProductsComponents/>          

                            <Footer />

                            <ToastContainer position="top-right" autoClose={3000}/>

                    </WishlistsContextProvider> 
                </ProductContextProvider>
            </CategoriesContextProvider>
           
        </>
    )
}