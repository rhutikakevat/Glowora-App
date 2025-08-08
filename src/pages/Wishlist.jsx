import WishlistProductsList from "../components/WishlistProductsList";
import { ProductContextProvider } from "../context/Products.context";

export default function WishlistProducts(){


    return (
        <>
         <ProductContextProvider>

            <WishlistProductsList/>

         </ProductContextProvider>
        </>
    )
}