import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCartContext = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCartContext must be used within a CartContextProvider');
    }

    return context;
}

export const CartContextProvider = ({children}) => {
    
    const [cartLoading, setCartLoading] = useState(null);
    const [cartError, setCartError] = useState(null);
    const [cart, setCart] = useState([]);
    const [hydrated, setHydrated] = useState(false);
    const [cartQuantity, setCartQuantity] = useState(0);

    useEffect(()=>{
        const loadCart = async ()=>{
            try {
                setCartLoading(true);

                const response = await fetch(
                    "https://glowora-app-backend-api.vercel.app/api/cart/products"
                );

                if(!response.ok){
                    throw new Error("Failed to fetch cart data")
                }

                const data = await response.json();

                if(data){
                    setCart(data);
            
            }
            } catch (error) {
                console.log("Error while fetching cart data", error);

                setCartError(error);
            } finally{
                setCartLoading(false)
            }
        }

        loadCart()
    },[])


       
    return (
        <CartContext.Provider value={{
            cart, cartLoading, cartError, cartQuantity
        }}>
            {children}
        </CartContext.Provider>
    )
} 