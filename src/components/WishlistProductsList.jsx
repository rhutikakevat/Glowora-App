import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useProductContext } from "../context/Products.context";
import { useNavigate } from "react-router-dom";

export default function WishlistProductsList() {
    const { renderRatingStars } = useProductContext();
    const navigate = useNavigate();

    const [wishlistProduct, setWishlistProduct] = useState([]);
    const [wishlistError, setWishlistError] = useState(null);
    const [wishlistLoading, setWishlistLoading] = useState(false);

    // Fetch Wishlist Products
    useEffect(() => {
       const fetchWishlistProductDetails = async () => {
            setWishlistLoading(true);

            try {
                const response = await fetch(
                    `https://glowora-app-backend-api.vercel.app/api/wishlist/products`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const wishlistProductDetailsData = await response.json();

               if(wishlistProductDetailsData){
                setWishlistProduct(wishlistProductDetailsData?.data || []);
                setWishlistError(null);
               }
            } catch (error) {
                console.error("Error occurred while fetching the data: ", error);
                setWishlistError(error.message);
            } finally {
                setWishlistLoading(false);
            }
        };

       fetchWishlistProductDetails();
    }, []);


    // Remove Item from Wishlist
    const handleRemoveFromWishlist = async (productId) => {
        try {
            const response = await fetch(
                `https://glowora-app-backend-api.vercel.app/api/wishlist/product/${productId}`,
                { method: "DELETE" }
            );

            if (!response.ok) {
                throw new Error(`Failed to remove item: ${response.status}`);
            }

            setWishlistProduct((prev) =>
                prev.filter((item) => item._id !== productId)
            );
        } catch (error) {
            console.error("Error removing Product from wishlist:", error);
        }
    };

    //Add Item to Cart (increase quantity if already there)
    const handleAddToCart = async (productId) => {
        try {
            const response = await fetch(
                `https://glowora-app-backend-api.vercel.app/api/cart`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ productId, quantity: 1 })
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to add to cart: ${response.status}`);
            }

            alert("Item added to cart!");
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    // Loading message 
    if (wishlistLoading) {
        return (
            <main className="container vh-100 d-flex flex-column justify-content-center align-items-center text-center">
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-4 fs-4 fw-semibold">Please wait, Loading...</p>
            </main>
        );
    }

    // Error Handling
    if (wishlistError) {
        return (
            <main className="container py-5 text-center">
                <div className="alert alert-danger">
                    An error occurred while loading wishlist products: {wishlistError}
                </div>
            </main>
        );
    }

    return (
        <>
            <Header />
            <main className="container py-4">
                {wishlistProduct.length > 0 ? (
                    <div className="row">
                        {wishlistProduct.map((product) => (
                            <div key={product._id} className="col-4">
                                <div className="card h-100 shadow-sm border-0">
                                    <div>
                                        <img
                                            onClick={() => navigate(`/api/products/${product._id}`)}
                                            src={product.profileImage}
                                            alt={product.name}
                                            className="card-img-top p-2"
                                            style={{
                                                height: "200px",
                                                objectFit: "contain",
                                                cursor: "pointer",
                                                borderBottom: '1px solid #f5f5f5'
                                            }}
                                        />
                                    </div>

                                    <div className="card-body d-flex flex-column">
                                        <h5
                                            onClick={() => navigate(`/api/products/${product._id}`)}
                                            style={{
                                                cursor: "pointer",
                                                fontSize: '1rem',
                                                minHeight: '30px',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            }}
                                            className="card-title"
                                        >
                                            {product.name}
                                        </h5>
                                        <div className="mb-2" style={{ color: "#f11c58ff" }}>
                                            <span className="fw-bold">MRP: ₹{product.price}</span>
                                        </div>
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="me-2">
                                                {renderRatingStars(product.ratings)}
                                            </div>
                                            <small className="text-muted">({product.ratings})</small>
                                        </div>

                                        {/* Add to Cart */}
                                        <button
                                            onClick={() => handleAddToCart(product._id)}
                                            className="btn mt-auto text-light fw-semibold mb-2"
                                            style={{
                                                backgroundColor: "#f11c58ff",
                                                border: 'none',
                                                padding: '8px',
                                                borderRadius: '8px'
                                            }}
                                        >
                                            Add to Cart
                                        </button>

                                        {/* Remove from Wishlist */}
                                        <button
                                            onClick={() => handleRemoveFromWishlist(product._id)}
                                            className="btn btn-outline-danger fw-semibold"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-5">
                        <div className="alert alert-info">
                            Your Wishlist is empty!
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}
