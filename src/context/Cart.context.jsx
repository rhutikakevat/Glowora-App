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
  const [cartLoading, setCartLoading] = useState(null);
  const [cartError, setCartError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        setCartLoading(true);

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
      } finally {
        setCartLoading(false);
      }
    };

    loadCart();
  }, []);

  const addToCart = async (productId) => {
    try {
      setCartLoading(true);

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

        setCart((preValue) =>
          preValue.map((item) =>
            item._id === existedProduct._id
              ? { ...item, quantity: updatedData.data.quantity }
              : item
          )
        );
        toast.success("Product quantity updated in cart");
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
    } finally {
      setCartLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setCartLoading(productId);

      const response = await fetch(
        `https://glowora-app-backend-api.vercel.app/api/cart/${productId}`,
        {
          method: "DELETE",
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
    } finally {
      setCartLoading(null);
    }
  };

  const handleQuantityChangeCart = async (cartProductId, changeQuantity) => {
    try {
      const cartItem = cart.find((item) => item._id === cartProductId);

      const newQuantity = cartItem.quantity + changeQuantity;

      if (newQuantity <= 0) {
        await removeFromCart(cartProductId);
        return;
      }

      setCartLoading(cartProductId);

      const response = await fetch(
        `https://glowora-app-backend-api.vercel.app/api/cart/product/${cartProductId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: changeQuantity }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      const updatedCartData = await response.json();

      if (updatedCartData) {
        setCart((preValue) =>
          preValue.map((item) =>
            item._id === cartProductId
              ? { ...item, quantity: updatedCartData.data.quantity }
              : item
          )
        );
        toast.success(
          `Cart Quantity ${
            changeQuantity === 1 ? "increasing" : "decresing"
          } successfully!`
        );
      }
    } catch (error) {
      console.log("Error while updating the cart quantity", error);
      toast.error("An Error occurred while updating quantity in cart");
      setCartError(error.message);
    } finally {
      setCartLoading(null);
    }
  };

  const cartCount = cart?.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartError,
        cartCount,
        addToCart,
        removeFromCart,
        cartLoading,
        handleQuantityChangeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
