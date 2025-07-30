import { createContext, useContext } from "react";
import useFetch from "../useFetch";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router"

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

   
    const [wishlistItems, setWishlistItems] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedRating, setSelectedRating] = useState(0);
    const [selectedPrice, setSelectedPrice] = useState("");
    const [selectedPriceForFilter, setSelectedPriceForFilter] = useState(0);  


    const { productId } = useParams();

    const [productDetailsData, setProductDetailsData] = useState(null);
    const [productDetailsloading, setProductDetailsLoading] = useState(true);
    const [ProductDetailsError, setProductDetailsError] = useState(null);
    const [quantity, setQuantity] = useState(1);

   // Listing Page  
   
    const displayedProducts = (products?.data?.products || [])
        .filter((product) => {
            const filterCategory = selectedCategories.length === 0 ||
                selectedCategories?.includes(product.category?.name)

            const filterRating = selectedRating === 0 || product.ratings >= selectedRating;

            const filterPrice = selectedPriceForFilter === 0 || product.price >=selectedPriceForFilter;

            return filterCategory && filterRating && filterPrice;
        })
        .sort((a, b) => {
            if (selectedPrice === "highToLow") {
                return b.price - a.price;
            } else if (selectedPrice === "lowToHigh") {
                return a.price - b.price;
            }
            return 0;
        });

    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            setSelectedCategories(prev => [...prev, value]);
        } else {
            setSelectedCategories(prev => prev.filter(category => category !== value));
        }
    };

    const handlerRatingChange = (event, newValueOfRating) => {
        setSelectedRating(newValueOfRating);
    }

    const handlerPriceFilter = (event,newValueOfPrice) =>{
        setSelectedPriceForFilter(newValueOfPrice);
     }

    const handlerClearAll = () => {
        setSelectedCategories([])
        setSelectedRating(0)
        setSelectedPrice("")
        setSelectedPriceForFilter(0)
    }

    const handlerPriceChage = (event) => {
        const { value } = event.target;
        setSelectedPrice(value);
    }

    const handleAddToCart = (productId) => {
        console.log("Add to cart:", productId);
        // Logic imcomplete
    };

    const handleAddToWishlist = (productId) => {
        if (wishlistItems.includes(productId)) {
            setWishlistItems(wishlistItems.filter(id => id !== productId));
        } else {
            setWishlistItems([...wishlistItems, productId]);
        }
        // logic understanding
    };

    const navigate = useNavigate();

    const renderRatingStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<StarIcon key={i} className="text-warning" style={{ fontSize: '18px' }} />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<StarIcon key={i} className="text-warning" style={{ fontSize: '18px' }} />);
            } else {
                stars.push(<StarBorderIcon key={i} className="text-warning" style={{ fontSize: '18px' }} />);
            }

            // logic learn
        }
        return stars;
    };

    // Product Details Page 

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`https://glowora-app-backend-api.vercel.app/api/products/${productId}`)

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const productDetailsData = await response.json();

                if (productDetailsData) {
                    setProductDetailsData(productDetailsData);
                    setProductDetailsError(null)
                }
            } catch (error) {
                console.log("Error occurred while fetching the data: ", error);
                setProductDetailsError(error.message);
            } finally {
                setProductDetailsLoading(false);
            }
        }

        if (productId) {
            fetchProductDetails()
        }
    }, [productId])

    const handleQuantityChange = (value) => {
        const newQuantity = quantity + value;
        if (newQuantity > 0 && newQuantity <= (productDetailsData?.data?.product?.stock || 10)) {
            setQuantity(newQuantity);
        }
    }

    const handleBuyNow = () => {
        // write logic
    }


  return (
    <ProductContext.Provider value={
      {
        products, productsLoading, productsError,
        categories,categoriesError,categoriesLoading,
        handleAddToCart,handleAddToWishlist,handleCategoryChange,handlerClearAll,
        handlerPriceChage,handlerRatingChange,displayedProducts,renderRatingStars,
        selectedRating,selectedPrice,selectedCategories,wishlistItems,selectedPriceForFilter,
        handlerPriceFilter,navigate,productDetailsData,productDetailsloading,
        ProductDetailsError,handleQuantityChange,handleBuyNow,quantity
    }
    }>
      {children}
    </ProductContext.Provider>
  );
};