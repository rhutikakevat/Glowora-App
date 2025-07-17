import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ProductContextProvider} from "./context/Products.context.jsx";
import MainContent from "./components/MainContent.jsx";

export default function App() {  
  return (
    <ProductContextProvider>

      <Header />

      <MainContent />
      
      <Footer />

    </ProductContextProvider>
  );
}