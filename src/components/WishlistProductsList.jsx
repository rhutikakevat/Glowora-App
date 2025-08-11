import Header from "./Header";
import Footer from "./Footer";
import { useProductContext } from "../context/Products.context";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function WishlistProductsList() {
    const { renderRatingStars, wishlistItems, handleAddToCart,navigate,
         wishlistLoading, wishlistError, handleRemoveFromWishlist

      } = useProductContext();

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
                        <div className="col-lg-9 col-md-8 mt-4">
                            <h3 className="mb-4 py-2 border-bottom">All Wishlist Products {" "}({wishlistItems.length})</h3>
                            {wishlistItems.length > 0 ? (
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                                    {wishlistItems.map((product) => (
                                        <div key={product?._id} className="col">
                                            <div className="card h-100 shadow-sm border-0">
                                                <div className="position-relative">
                                                    <img  
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            navigate(`/products/${product?._id}`)
                                                        }} 
                                                        src={product?.product?.profileImage}
                                                        alt={product?.product?.name}
                                                        className="card-img-top p-2"
                                                        style={{ 
                                                            height: "200px", 
                                                            objectFit: "contain",
                                                            cursor: "pointer",
                                                            borderBottom: '1px solid #f5f5f5'
                                                        }}
                                                    />

                                                    <button
                                                        onClick={()=>handleRemoveFromWishlist(product?._id)}
                                                        className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle"
                                                        style={{
                                                            height: "40px",
                                                            width: "40px",
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'  
                                                        }}
                                                        aria-label={wishlistItems.some((item)=>item?.product?._id === product?.product?._id) ? "Remove from wishlist" : "Add to wishlist"}
                                                    >
                                                        {wishlistItems.some(item => item?.product?._id === product?.product?._id) ?
                                                            <FavoriteIcon className="text-danger" /> :
                                                            <FavoriteBorderIcon />
                                                        }
                                                    </button>
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
                                                        {product.product?.name}
                                                    </h5>
                                                    <div className="mb-2" style={{color:"#f11c58ff"}}>
                                                        <span className="fw-bold">MRP: ₹{product?.product?.price}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center mb-3">
                                                        <div className="me-2">
                                                            {renderRatingStars(product?.product?.ratings)}
                                                        </div>
                                                        <small className="text-muted">({product?.product?.ratings})</small>
                                                    </div>
                                                    
                                                    <button
                                                        onClick={()=>handleAddToCart(product._id)}
                                                        className="btn mt-auto text-light fw-semibold"
                                                        style={{
                                                            backgroundColor: "#f11c58ff",
                                                            border: 'none',
                                                            padding: '8px',
                                                            borderRadius: '8px'
                                                        }}
                                                    >
                                                        Add to Cart
                                                    </button>

                                                    <button
                                                        onClick={() => handleRemoveFromWishlist(product._id)}
                                                        className="btn mt-auto text-light fw-semibold"
                                                        style={{
                                                            backgroundColor: "#f11c58ff",
                                                            border: 'none',
                                                            padding: '8px',
                                                            borderRadius: '8px'
                                                        }}
                                                    >
                                                        Remove from Wishlist
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
                        </div>
            </main>
            <Footer />
        </>
    );
}
