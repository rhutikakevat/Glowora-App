import { createContext, useContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate, useSearchParams, useParams } from "react-router";
import { useCategoriesContext } from "./Categories.context";

const ProductContext = createContext();

export const useProductContext = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      "useProductsContext must be used within a ProductsContextProvider"
    );
  }
  return context;
};

export const ProductContextProvider = ({ children }) => {
  const productApi = "https://glowora-app-backend-api.vercel.app/api/products";

  const { selectedCategories, setSelectedCategories } = useCategoriesContext();

  const {
    data: products,
    loading: productsLoading,
    error: productsError,
  } = useFetch(productApi);

  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedPriceForFilter, setSelectedPriceForFilter] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const { productId } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const [productDetailsData, setProductDetailsData] = useState(null);
  const [productDetailsloading, setProductDetailsLoading] = useState(true);
  const [ProductDetailsError, setProductDetailsError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  //Use in Home page

  const filterFeaturedProducts =
    products?.data?.products.filter((product) => product.isFeatured) || [];

  const carouselImages = [
    "https://cmsimages.ssbeauty.in/Makeup_multibrand_lifestyle1_HP_carousel_web_3x_a8bf2c5640.jpg",
    "https://cmsimages.ssbeauty.in/Luxuryskincare_top_carousel_web_1_5381678edb/Luxuryskincare_top_carousel_web_1_5381678edb.jpg",
    "https://cmsimages.ssbeauty.in/Fragrance_top_carousel_web_1_905ec49149/Fragrance_top_carousel_web_1_905ec49149.jpg",
    "https://cmsimages.ssbeauty.in/The_Ultimate_Luxe_Beauty_Edit_HP_carousel_web_3x_copy_0ca02429b7.jpg",
    "https://www.ssbeauty.in/_next/image?url=https:%2F%2Fcmsimages.ssbeauty.in%2Fsunscreen_Hp_topcarousel_desktop_2x_dfe160bbdc.jpg&w=1920&q=75",
  ];

  //Use in Listing Page

  const displayedProducts = (products?.data?.products || [])
    .filter((product) => {
      const filterCategory =
        selectedCategories.length === 0 ||
        selectedCategories?.includes(product.category?.name);

      const filterRating =
        selectedRating === 0 || product.ratings >= selectedRating;

      const filterPrice =
        selectedPriceForFilter === 0 || product.price >= selectedPriceForFilter;

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

  const handlerRatingChange = (event, newValueOfRating) => {
    setSelectedRating(newValueOfRating);
  };

  const handlerPriceFilter = (event, newValueOfPrice) => {
    setSelectedPriceForFilter(newValueOfPrice);
  };

  const handlerClearAll = () => {
    setSelectedCategories([]);
    setSelectedRating(0);
    setSelectedPrice("");
    setSelectedPriceForFilter(0);
    setSearchParams({});
  };

  const handlerPriceChage = (event) => {
    const { value } = event.target;

    setSelectedPrice(value);
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <StarIcon
            key={i}
            className="text-warning"
            style={{ fontSize: "18px" }}
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <StarIcon
            key={i}
            className="text-warning"
            style={{ fontSize: "18px" }}
          />
        );
      } else {
        stars.push(
          <StarBorderIcon
            key={i}
            className="text-warning"
            style={{ fontSize: "18px" }}
          />
        );
      }
    }
    return stars;
  };

  //Use in Product Details Page

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://glowora-app-backend-api.vercel.app/api/products/${productId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const productDetailsData = await response.json();

        if (productDetailsData) {
          setProductDetailsData(productDetailsData);
          setProductDetailsError(null);
        }
      } catch (error) {
        console.log("Error occurred while fetching the data: ", error);
        setProductDetailsError(error.message);
      } finally {
        setProductDetailsLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (
      newQuantity > 0 &&
      newQuantity <= (productDetailsData?.data?.product?.stock || 10)
    ) {
      setQuantity(newQuantity);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        productsLoading,
        productsError,
        handlerClearAll,
        handlerPriceChage,
        handlerRatingChange,
        displayedProducts,
        renderRatingStars,
        selectedRating,
        selectedPrice,
        selectedPriceForFilter,
        handlerPriceFilter,
        navigate,
        productDetailsData,
        productDetailsloading,
        ProductDetailsError,
        handleQuantityChange,
        quantity,
        setQuantity,
        filterFeaturedProducts,
        carouselImages,
        searchParams,
        showFilters,
        setShowFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
