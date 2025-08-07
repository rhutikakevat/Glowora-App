import ListingProductswithAllFilter from "../components/ListingProductsWithAllFilter";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ProductContextProvider } from "../context/Products.context";

export default function ProductsListing() {
    return (
        <>
            <ProductContextProvider>
                

                <ListingProductswithAllFilter />

    
                
            </ProductContextProvider>
        </>
    );
}