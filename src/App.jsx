import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ProductContextProvider} from "./context/Products.context.jsx";
import MainContent from "./components/MainContent.jsx";
import { ToastContainer } from "react-toastify";

export default function App() {  
  return (
   <>
   <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    />
    
    <ProductContextProvider>
      
      <MainContent />     
      
    </ProductContextProvider>

    
   </>
  );
}