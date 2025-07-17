import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ProductContextProvider, useProductContext } from "../context/Products.context";
import Slider from "@mui/material/Slider";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function ListingProductswithAllFilter() {
    const { products, categories, productsLoading, productsError } = useProductContext();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedRating, setSelectedRating] = useState(0);
    const [selectedPrice, setSelectedPrice] = useState("");

    const displayedProducts = (products?.data?.products || [])
        .filter((product) => {
            const filterCategory = selectedCategories.length === 0 ||
                selectedCategories.includes(product.category?.name)

            const filterRating = selectedRating === 0 || product.ratings >= selectedRating;

            return filterCategory && filterRating;
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

    const handlerClearAll = () => {
        setSelectedCategories([])
        setSelectedRating(0)
        setSelectedPrice("")
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
    };

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
        }
        return stars;
    };

    return (
        <main className="container py-4">
            <h2 className="py-2 mb-4 text-center text-md-start">Cosmetics & Beauty Products</h2>
            <div>
                {productsError ? (
                    <div className="alert alert-danger text-center">
                        An error occurred while loading categories: {productsError.message}
                    </div>
                ) : productsLoading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Loading products...</p>
                    </div>
                ) : (
                    <div className="row">
                        {/* Filters Sidebar */}
                        <div className="col-lg-3 col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-3 pb-2">
                                        <h4 className="m-0">Filters</h4>             
                                        <button 
                                            onClick={handlerClearAll}
                                            className="btn btn-sm btn-outline-danger"
                                            aria-label="Clear all filters"
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                    
                                    {/* Categories Filter */}
                                    <div className="mb-4">
                                        <h6 className="mb-3">Categories</h6>
                                        <div className="list-group list-group-flush">
                                            {categories?.data?.categories.map((category) => (
                                                <div key={category._id} className="list-group-item border-0 px-0 py-1">
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={category._id}
                                                            name="categories"
                                                            value={category.name}
                                                            onChange={handleCategoryChange}
                                                            checked={selectedCategories.includes(category.name)}
                                                        />
                                                        <label className="form-check-label" htmlFor={category._id}>
                                                            {category.name}
                                                        </label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Ratings Filter */}
                                    <div className="mb-4">
                                        <h6 className="mb-3">Ratings</h6>
                                        <Slider 
                                            value={selectedRating}
                                            onChange={handlerRatingChange}
                                            aria-labelledby="rating-slider"
                                            step={0.2}
                                            marks={[
                                                { value: 0, label: "All" },
                                                { value: 1, label: "1" },
                                                { value: 2, label: "2" },
                                                { value: 3, label: "3" },
                                                { value: 4, label: "4" },
                                                { value: 5, label: "5" }
                                            ]}
                                            min={0}
                                            max={5}
                                            valueLabelDisplay="auto"
                                        />
                                    </div>

                                    {/* Price Sort */}
                                    <div>
                                        <h6 className="mb-3">Sort by Price</h6>
                                        <div className="list-group list-group-flush">
                                            <div className="list-group-item border-0 px-0 py-1">
                                                <div className="form-check">
                                                    <input 
                                                        className="form-check-input"
                                                        type="radio" 
                                                        id="highToLow"
                                                        value="highToLow" 
                                                        name="priceSort"
                                                        onChange={handlerPriceChage}
                                                        checked={selectedPrice === "highToLow"}
                                                    />
                                                    <label className="form-check-label" htmlFor="highToLow">
                                                        High to Low
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="list-group-item border-0 px-0 py-1">
                                                <div className="form-check">
                                                    <input 
                                                        className="form-check-input"
                                                        type="radio" 
                                                        id="lowToHigh"
                                                        value="lowToHigh" 
                                                        name="priceSort"
                                                        onChange={handlerPriceChage}
                                                        checked={selectedPrice === "lowToHigh"}
                                                    />
                                                    <label className="form-check-label" htmlFor="lowToHigh">
                                                        Low to High
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Products Listing */}
                        <div className="col-lg-9 col-md-8">
                            {displayedProducts.length > 0 ? (
                                <div className="row row-cols-1 ms-5 row-cols-sm-2 row-cols-md-3 g-4">
                                    {displayedProducts.map((product) => (
                                        <div key={product._id} className="col">
                                            <div className="card h-100 shadow-sm">
                                                <div className="position-relative">
                                                    <img
                                                        src={product.profileImage}
                                                        alt={product.name}
                                                        className="card-img-top p-3"
                                                        style={{ height: "200px", objectFit: "contain" }}
                                                    />
                                                    <button
                                                        onClick={() => handleAddToWishlist(product._id)}
                                                        className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle"
                                                        aria-label={wishlistItems.includes(product._id) ? "Remove from wishlist" : "Add to wishlist"}
                                                    >
                                                        {wishlistItems.includes(product._id) ?
                                                            <FavoriteIcon className="text-danger" /> :
                                                            <FavoriteBorderIcon />
                                                        }
                                                    </button>
                                                </div>
                                                <div className="card-body d-flex flex-column">
                                                    <h5 className="card-title">{product.name}</h5>
                                                    <div className="mb-2" style={{color:"#e54e78ff"}}>
                                                        <span className="fw-bold">₹{product.price}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-3">
                                                        <div className="me-2">
                                                            {renderRatingStars(product.ratings)}
                                                        </div>
                                                        <small className="text-muted">({product.ratings})</small>
                                                    </div>
                                                    <button
                                                        onClick={() => handleAddToCart(product._id)}
                                                        className="btn mt-auto text-light fw-semibold"
                                                        style={{backgroundColor:"#f11c58ff"}}
                                                    >
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <div className="alert alert-info">
                                        No products found matching your filters.
                                    </div>
                                    <button 
                                        onClick={handlerClearAll}
                                        className="btn btn-primary mt-3"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default function ProductsListing() {
    return (
        <>
            <ProductContextProvider>
                <Header />
                <ListingProductswithAllFilter />
                <Footer />
            </ProductContextProvider>
        </>
    );
}