import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ProductContextProvider} from "./context/Products.context.jsx";
import MainContent from "./components/MainContent.jsx";

export default function App() {  
  return (
    <ProductContextProvider>


      <MainContent />
      
      
    </ProductContextProvider>
  );
}