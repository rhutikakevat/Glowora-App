import Footer from "../components/Footer";
import Header from "../components/Header";
import "react-toastify/dist/ReactToastify.css";
import ListingProductswithAllFilter from "../components/ListingProductsWithAllFilter";
import { ProductContextProvider } from "../context/Products.context";
import { CategoriesContextProvider } from "../context/Categories.context";

export default function ProductsListing() {
    return (
        <>
            <CategoriesContextProvider>
                <ProductContextProvider>    
                  
                    <Header/>   
                            
                    <ListingProductswithAllFilter />  
                    
                    <Footer/>
                    
                </ProductContextProvider>
            </CategoriesContextProvider>
        </>
    );
}