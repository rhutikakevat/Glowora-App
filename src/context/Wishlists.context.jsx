import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const WishlistsContext = createContext();

export const useWishlistsContext = () => {
  const context = useContext(WishlistsContext);

  if (!context) {
    throw new Error(
      "useWishlistsContext must be used within a WishlistsContextProvider"
    );
  }

  return context;
};

export const WishlistsContextProvider = ({ children }) => {
  const [wishlistLoading, setWishlistLoading] = useState(null);
  const [wishlistError, setWishlistError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        setWishlistLoading(true);

        const response = await fetch(
          "https://glowora-app-backend-api.vercel.app/api/wishlist/products"
        );

        if (!response.ok) throw new Error("Failed to fetch wishlist");

        const data = await response.json();

        const products = data?.data?.map((item) => item.product) || [];

        setWishlist(products);

        localStorage.setItem("wishlist", JSON.stringify(products));
      } catch (error) {
        console.error("Error loading wishlist:", error);

        setWishlistError(error.message);

        const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(stored);
      } finally {
        setWishlistLoading(false);
        setHydrated(true);
      }
    };

    loadWishlist();
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, hydrated]);

  const addToWishlist = async (productId) => {
    try {
      setWishlistLoading(productId);

      const response = await fetch(
        `https://glowora-app-backend-api.vercel.app/api/wishlist/products`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product: productId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add the data");
      } else {
        const postedData = await response.json();

        if (postedData) {
          setWishlist((preValue) => [...preValue, postedData.data.product]);
          toast.success("Product added to Wishlist ❤️");
        }
      }
    } catch (error) {
      console.log("Error while posting the data: ", error);
      toast.error("Error while adding to wishlist");

      setWishlistError(error.message);
    } finally {
      setWishlistLoading(null);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      setWishlistLoading(productId);

      const response = await fetch(
        `https://glowora-app-backend-api.vercel.app/api/wishlist/product/${productId}`,
        {
          method: "DELETE",
          mode: "cors",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove the data");
      } else {
        const deletedData = await response.json();

        if (deletedData) {
          setWishlist((preValue) =>
            preValue.filter((product) => product._id !== productId)
          );
          toast.success("Product removed from Wishlist 🗑️");
        }
      }
    } catch (error) {
      console.log("Error while removing from wishlist: ", error);

      toast.error("Error while removing from wishlist");

      setWishlistError(error.message);
    } finally {
      setWishlistLoading(null);
    }
  };

  const wishlistCount = wishlist.length;

  const isWishlisted = (productId) => {
    return wishlist.some(
      (product) => String(product._id) === String(productId)
    );
  };

  const wishlistHandler = async (productId) => {
    if (!productId) return;

    if (isWishlisted(productId)) {
      setWishlist((preValue) =>
        preValue.filter((product) => product._id !== productId)
      );
      await removeFromWishlist(productId);
    } else {
      setWishlist((preValue) => [...preValue, { _id: productId }]);
      await addToWishlist(productId);
    }
  };

  return (
    <WishlistsContext.Provider
      value={{
        wishlistLoading,
        isWishlisted,
        wishlistError,
        wishlist,
        wishlistCount,
        wishlistHandler,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistsContext.Provider>
  );
};