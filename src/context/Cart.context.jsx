import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }

  return context;
};

export const CartContextProvider = ({ children }) => {
  const [cartError, setCartError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await fetch(
          "https://glowora-app-backend-api.vercel.app/api/cart/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }

        const data = await response.json();

        if (data) {
          setCart(Array.isArray(data.data) ? data.data : []);
        }
      } catch (error) {
        console.log("Error while fetching cart data", error);

        setCartError(error.message);
      }
    };

    loadCart();
  }, []);

  const addToCart = async (productId) => {
    try {
      const existedProduct = cart.find(
        (item) => productId === item.productId._id
      );

      if (existedProduct) {
        const response = await fetch(
          `https://glowora-app-backend-api.vercel.app/api/cart/product/${existedProduct._id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity: 1 }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update cart data");
        }
        const updatedData = await response.json();

        toast.success("Product quantity updated in cart");

        setCart((preValue) =>
          preValue.map((item) =>
            item._id === existedProduct._id
              ? { ...item, quantity: updatedData.data.quantity }
              : item
          )
        );
      } else {
        const response = await fetch(
          "https://glowora-app-backend-api.vercel.app/api/cart/products",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add cart data");
        } else {
          const postedCartData = await response.json();

          if (postedCartData) {
            setCart((preValue) => [...preValue, postedCartData.data]);
            toast.success("Product's data added to cart :)");
          }
        }
      }
    } catch (error) {
      console.log("Error while posting cart data: ", error);
      toast.error("Error while added data to cart");

      setCartError(error.message);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(
        `https://glowora-app-backend-api.vercel.app/api/cart/${productId}`,
        {
          method: "DELETE",
          mode: "cors",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove the cart data");
      } else {
        const deletedData = await response.json();

        if (deletedData) {
          setCart((preValue) =>
            preValue.filter((product) => product._id !== productId)
          );
          toast.success("Product removed from Cart 🗑️");
        }
      }
    } catch (error) {
      console.log("Error while removing from Cart: ", error);

      toast.error("Error while removing from Cart");

      setCartError(error.message);
    }
  };

  const cartCount = cart?.data?.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartError,
        cartCount,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
