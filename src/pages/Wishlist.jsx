import Footer from "../components/Footer";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WishlistProductsList from "../components/WishlistProductsList";
import { ProductContextProvider } from "../context/Products.context";

export default function WishlistProducts(){


    return (
        <>
         <ProductContextProvider>

            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            

            <Header/>

            <WishlistProductsList/>

            <Footer/>

         </ProductContextProvider>
        </>
    )
}