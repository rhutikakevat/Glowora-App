import Header from "../components/Header"
import Footer from "../components/Footer"
import "react-toastify/dist/ReactToastify.css";
import { ProductContextProvider } from "../context/Products.context";
import ProductDetailPageComponents from "../components/ProductDetailPageComponents";
import { CategoriesContextProvider } from "../context/Categories.context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetail() {
    return (
        <>
            <CategoriesContextProvider>
                <ProductContextProvider> 

                    <Header />              

                    <ProductDetailPageComponents />              

                    <Footer />

                    <ToastContainer position="top-right" autoClose={3000}/>

                </ProductContextProvider>
            </CategoriesContextProvider>
        </>
    )
}