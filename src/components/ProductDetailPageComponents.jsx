import { useProductContext } from "../context/Products.context";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function ProductDetailPageComponents() {
    const { renderRatingStars,handleAddToCart,wishlistItems,
        handleAddToWishlist,productDetailsData,productDetailsloading,
        ProductDetailsError,handleQuantityChange,handleBuyNow,quantity
    } = useProductContext();
    
    
    return (
        <>
            <h2 className="mb-5 mt-3">Product Details</h2>

            <div>
                {productDetailsloading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Loading product details...</p>
                    </div>
                ) : (
                    <div>
                        {productDetailsData ? (
                            <div className="row">
                                <div className="col-md-5 mb-5">
                                    <div className="card mb-3 position-relative">
                                        <img
                                            src={productDetailsData?.data?.product?.profileImage}
                                            alt={productDetailsData?.data?.product?.name}
                                            className="img-fluid p-3"
                                            style={{ maxHeight: "400px", objectFit: "contain",width:"100%" }}
                                        />

                                        {productDetailsData?.data?.product?.isFeatured && (
                                        <span className="badge bg-success mb-2 py-2 position-absolute"
                                        style={{fontFamily:"sans-serif",fontSize:"85%"}}
                                        >
                                            Featured</span>
                                        )}

                                        <button 
                                         onClick={() => handleAddToWishlist(productDetailsData?.data?.product?._id)}
                                         className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle"
                                         style={{height:"47px"}}
                                         aria-label={wishlistItems.includes(productDetailsData?.data?.product?._id) ? "Remove from wishlist" : "Add to wishlist"}
                                        >
                                            {wishlistItems
                                            .includes(productDetailsData?.data?.product?._id) ?
                                                <FavoriteIcon className="text-danger" /> :
                                                <FavoriteBorderIcon />
                                            }
                                        </button>
                                    </div>

                                    <div className="d-grid gap-2">
                                        <button onClick={handleBuyNow} className="btn btn-primary mt-3 fw-semibold fs-6 btn-sm">Buy Now</button>
                                        <button onClick={handleAddToCart} className="btn btn-outline-danger mt-1 fw-semibold fs-6 btn-sm">Add to Cart</button>
                                    </div>
                                </div>

                                <div className="col-md-7">
                                    <div className="ms-5">
                                    <h3 className="mb-3">{productDetailsData?.data?.product?.name}</h3>
                                    <p className="text-muted mb-3">{productDetailsData?.data?.product?.details}</p>
                                    <p className="mb-2">
                                        <strong>Brand's Name:</strong> {productDetailsData?.data?.product?.brand}
                                    </p>
                                    <div className="mb-3">
                                        {renderRatingStars(productDetailsData?.data?.product?.ratings)}
                                        <span className="ms-2">({productDetailsData?.data?.product?.ratings} reviews)</span>
                                    </div>
                                    <h2 className="mb-4 fw-bold">₹{productDetailsData?.data?.product?.price}</h2>

                                    <div className="mb-4">
                                        <strong className="me-3">Quantity:</strong>
                                        <div className="input-group mt-2" style={{ width: "135px" }}>
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={() => handleQuantityChange(-1)}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                className="form-control text-center"
                                                value={quantity}
                                                min="1"
                                                max={productDetailsData?.data?.product?.stock}
                                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                            />
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={() => handleQuantityChange(1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className={`badge ${productDetailsData?.data?.product?.stock !== 0 ? 'bg-success' : 'bg-danger'} py-2 mt-3 mb-2`}>
                                            {productDetailsData?.data?.product?.stock !== 0 ? 'In Stock' : 'Out of Stock'}
                                        </div>
                                        {productDetailsData?.data?.product?.stock !== 0 && (
                                            <span className="ms-2">(Only {productDetailsData?.data?.product?.stock} left!)</span>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <h5>Reviews: ({productDetailsData?.data?.product?.reviews.length})</h5>
                                        <ul className="list-group">
                                            {productDetailsData?.data?.product?.reviews.map((review, index) => (
                                                <li key={index} className="list-group-item">{review}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <h3 className="mb-3 mt-2">Description: </h3>

                                            <ul className="list-unstyled">
                                                <li className="mb-2">
                                                    <strong>Manufacturer:</strong> {productDetailsData?.data?.product?.description?.manufacturer}
                                                </li>
                                                <li className="mb-2">
                                                    <strong>Expiry Date:</strong> {productDetailsData?.data?.product?.description?.expiryDate}
                                                </li>
                                                <li className="mb-2">
                                                    <strong>Address:</strong> {productDetailsData?.data?.product?.description?.address}
                                                </li>
                                                <li>
                                                    <strong>Country:</strong> {productDetailsData?.data?.product?.description?.country}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="alert alert-danger">
                                An error occurred while fetching the product details. {ProductDetailsError}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
