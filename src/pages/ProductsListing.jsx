import ListingProductswithAllFilter from "../components/ListingProductsWithAllFilter";
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