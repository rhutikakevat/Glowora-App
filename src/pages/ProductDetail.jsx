import Header from "../components/Header"
import Footer from "../components/Footer"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductContextProvider } from "../context/Products.context";
import ProductDetailPageComponents from "../components/ProductDetailPageComponents";

export default function ProductDetail() {
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
    

                <Header />              

                    <ProductDetailPageComponents />              

                <Footer />

            </ProductContextProvider>
        </>
    )
}