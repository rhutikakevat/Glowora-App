import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ProductContextProvider} from "./context/Products.context.jsx";
import MainContent from "./components/MainContent.jsx";
import { CategoriesContextProvider } from "./context/Categories.context.jsx";
import { WishlistsContextProvider } from "./context/Wishlists.context.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {  
  return (
   <>
    <CategoriesContextProvider>
      <ProductContextProvider>
        <WishlistsContextProvider>
      
          <MainContent />     
      
          <ToastContainer position="top-right" autoClose={3000}/>

        </WishlistsContextProvider>
      </ProductContextProvider>
    </CategoriesContextProvider>
    
   </>
  );
}