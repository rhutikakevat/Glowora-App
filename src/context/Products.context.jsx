import { createContext, useContext } from "react";
import useFetch from "../useFetch";

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductContextProvider = ({ children }) => {
  const productApi = "https://glowora-app-backend-api.vercel.app/api/products";
  const categoryApi = "https://glowora-app-backend-api.vercel.app/api/categories";

  const { 
    data: products, 
    loading: productsLoading, 
    error: productsError 
  } = useFetch(productApi);

  const { 
    data: categories, 
    loading: categoriesLoading, 
    error: categoriesError 
  } = useFetch(categoryApi);

  
  return (
    <ProductContext.Provider value={
      {
        products, productsLoading, productsError,
        categories,categoriesError,categoriesLoading
      }
    }>
      {children}
    </ProductContext.Provider>
  );
};