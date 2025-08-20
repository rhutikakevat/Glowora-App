import Header from "../components/Header"
import Footer from "../components/Footer"
import "react-toastify/dist/ReactToastify.css";
import { ProductContextProvider } from "../context/Products.context";
import ProductDetailPageComponents from "../components/ProductDetailPageComponents";
import { CategoriesContextProvider } from "../context/Categories.context";

export default function ProductDetail() {
    return (
        <>
            <CategoriesContextProvider>
                <ProductContextProvider> 

                    <Header />              

                    <ProductDetailPageComponents />              

                    <Footer />

                </ProductContextProvider>
            </CategoriesContextProvider>
        </>
    )
}