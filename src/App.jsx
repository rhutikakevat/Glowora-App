import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ProductContextProvider} from "./context/Products.context.jsx";
import MainContent from "./components/MainContent.jsx";
import { CategoriesContextProvider } from "./context/Categories.context.jsx";


export default function App() {  
  return (
   <>
    <CategoriesContextProvider>
      <ProductContextProvider>
      
        <MainContent />     
      
      </ProductContextProvider>
    </CategoriesContextProvider>
    
   </>
  );
}