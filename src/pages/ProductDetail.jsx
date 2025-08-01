import Header from "../components/Header"
import Footer from "../components/Footer"
import { ProductContextProvider } from "../context/Products.context";
import ProductDetailPageComponents from "../components/ProductDetailPageComponents";

export default function ProductDetail() {
    return (
        <>
            <ProductContextProvider>
                <Header />              

                    <ProductDetailPageComponents />              

                <Footer />

            </ProductContextProvider>
        </>
    )
}