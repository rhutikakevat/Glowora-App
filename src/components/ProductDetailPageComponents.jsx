import { useEffect, useState } from "react";
import { useProductContext } from "../context/Products.context";
import { toast } from "react-toastify";

export default function ProductDetailPageComponents() {
    const { renderRatingStars, handleAddToCart,
        productDetailsData, productDetailsloading,
        ProductDetailsError, handleQuantityChange, handleBuyNow, quantity,
        setQuantity
    } = useProductContext();

    const [isWishlisted, setIsWishlisted] = useState(false);
    const [wishlistLoading, setWishlistLoading] = useState(false);
    const [wishlistError, setWishlistError] = useState(null);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [wishlist, setWishlist] = useState([]);
    const [hydrated, setHydrated] = useState(false);

    useEffect(()=>{
        if(!productDetailsData?.data?.product?._id) return;

        const storedWishlistProduct = JSON.parse(localStorage.getItem('wishlist')) || [];
        const productId = String(productDetailsData?.data?.product?._id)

        setWishlist(storedWishlistProduct);
        setWishlistCount(storedWishlistProduct.length);

        if(productId){
            setIsWishlisted(storedWishlistProduct.includes(productId))
        }

        setHydrated(true)
    }, [productDetailsData?.data?.product?._id]);

    useEffect(()=>{
        if(hydrated){
            localStorage.setItem("wishlist", JSON.stringify(wishlist))
        }
    }, [wishlist,hydrated])

    const addToWishlist = async (productId) => {
        try {
            setWishlistLoading(true)

            const response = await fetch(`https://glowora-app-backend-api.vercel.app/api/wishlist/products`,{
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify({ product : productId }),
        })

        if(!response.ok){
            throw new Error("Failed to add the data")
        }else{
            const postedData = await response.json();

            if(postedData){
                toast.success("Product added to Wishlist ❤️")

                setIsWishlisted(true)
                setWishlistCount(preValue => preValue + 1)
                setWishlist((preValue)=>[...preValue,productId])
            }
        }
        } catch (error) {
            console.log("Error while posting the data: ",error);
            toast.error("Error while adding to wishlist")

            setWishlistError(error.message)
        } finally{
            setWishlistLoading(false)
        }
    }

    const removeFromWishlist = async (productId) => {
        try {
            const response = await fetch(`https://glowora-app-backend-api.vercel.app/api/wishlist/product/${productId}`,{
                method: "DELETE",
                mode:"cors"
            })

            if(!response.ok){
                throw new Error("Failed to remove the data")
            }else{
                const deletedData = await response.json();

                if(deletedData){
                    toast.success("Product removed from Wishlist 🗑️")

                    setIsWishlisted(false)
                    setWishlistCount(preValue => Math.max(preValue - 1, 0))
                    setWishlist((preValue)=>preValue.filter((id)=>id !== productId))
                }
            }
        } catch (error) {
            console.log("Error while removing from wishlist: ",error);
            toast.error("Error while removing from wishlist")
            setWishlistError(error.message);
        }finally{
            setWishlistLoading(false);
        }
    }
        
    const wishlistHandler = () => {
        if (!productDetailsData) return;
        
        const productId = productDetailsData.data.product._id;

        if (isWishlisted) {
        removeFromWishlist(productId);
        } else {
        addToWishlist(productId);
        }
    };
        
    return (
        <>
        <main className="container py-4">
            <h2 className="mb-4 mt-3 fw-bold" style={{ color: '#f11c58ff' }}>Product Details</h2>

            <div>
                {productDetailsloading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2 fw-semibold">Loading product details...</p>
                    </div>
                ) : (
                    <div>
                        {productDetailsData ? (
                            <div className="row gx-6">
                                <div className="col-md-5 mb-5 pe-md-4">
                                    <div className="card mb-3 position-relative shadow border-0">
                                        <img
                                            src={productDetailsData?.data?.product?.profileImage}
                                            alt={productDetailsData?.data?.product?.name}
                                            className="img-fluid p-3"
                                            style={{ 
                                                maxHeight: "400px", 
                                                objectFit: "contain",
                                                width: "100%",
                                            }}
                                        />

                                        <button className="btn position-absolute p-0"
                                                style={{
                                                    top:"15px",
                                                    right:"15px",
                                                    borderRadius:"50%",
                                                    width:"35px",
                                                    height:"35px",
                                                    display:"flex",
                                                    alignItems:"center",
                                                    justifyContent:"center"
                                                }}

                                                onClick={()=> wishlistHandler(productDetailsData?.data?.product?._id)}

                                                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                                        >
                                            <i className={`${isWishlisted ? 'fas' : 'far'} fa-heart`}
                                                style={{
                                                   color: isWishlisted ? '#f11c58ff' : '#525050ff',
                                                   fontSize: '1.22rem'
                                               }}
                                            >                                                
                                            </i>
                                        </button>

                                        {productDetailsData?.data?.product?.isFeatured && (
                                        <span className="badge bg-success mb-2 py-2 position-absolute"
                                        style={{
                                            fontFamily:"sans-serif",
                                            fontSize:"78%",
                                            top: "15px",
                                            left: "15px",
                                            backgroundColor: '#f11c58ff'
                                        }}
                                        >
                                            Featured</span>
                                        )}
                                    </div>

                                    <div className="d-grid gap-2">
                                        <button 
                                            onClick={handleBuyNow} 
                                            className="btn mt-3 fw-semibold fs-6 btn-sm"
                                            style={{
                                                backgroundColor: '#4452efff',
                                                color: 'white',
                                                borderRadius: '8px',
                                                padding: '10px'
                                            }}
                                        >
                                            Buy Now
                                        </button>
                                        <button 
                                            onClick={handleAddToCart} 
                                            className="btn btn-outline-danger mt-1 fw-semibold fs-6 btn-sm"
                                            style={{
                                                borderRadius: '8px',
                                                padding: '10px'
                                            }}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>

                                <div className="col-md-7 ps-md-4">
                                   <h3 className="mb-3 fw-bold">{productDetailsData?.data?.product?.name}</h3>
                                    <p className="text-muted mb-3">{productDetailsData?.data?.product?.details}</p>
                                    <p className="mb-2">
                                        <strong>Brand's Name:</strong> {productDetailsData?.data?.product?.brand}
                                    </p>
                                    <div className="mb-3">
                                        {renderRatingStars(productDetailsData?.data?.product?.ratings)}
                                        <span className="ms-2">({productDetailsData?.data?.product?.ratings} reviews)</span>
                                    </div>
                                    <h3 className="mb-3 py-2 fw-bold" style={{ color: '#f11c58ff' }}>
                                        MRP: ₹{productDetailsData?.data?.product?.price}</h3>

                                    <div className="mb-4">
                                        <strong className="me-3">Quantity:</strong>
                                        <div className="input-group mt-2" style={{ width: "135px" }}>
                                            <button
                                                className="btn btn-outline-dark"
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
                                                style={{
                                                    borderColor:"black",
                                                }}
                                            />
                                            <button
                                                className="btn btn-outline-dark"
                                                type="button"
                                                onClick={() => handleQuantityChange(1)}
                                                
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className={`badge ${productDetailsData?.data?.product?.stock !== 0 ? 'bg-success' : 'bg-danger'} py-2 mt-3 mb-2`}
                                            style={{
                                                backgroundColor: productDetailsData?.data?.product?.stock !== 0 ? '#f11c58ff' : '#dc3545'
                                            }}
                                        >
                                            {productDetailsData?.data?.product?.stock !== 0 ? 'In Stock' : 'Out of Stock'}
                                        </div>
                                        {productDetailsData?.data?.product?.stock !== 0 && (
                                            <span className="ms-2">(Only {productDetailsData?.data?.product?.stock} left!)</span>
                                        )}
                                    </div>

                                    <div className="py-2 mb-4">
                                        <h3 className="fw-bold" style={{ color: '#f11c58ff' }}>
                                            Reviews: ({productDetailsData?.data?.product?.reviews.length})
                                        </h3>
                                        <ul className="list-group mt-3" style={{width:"13.5cm"}}>
                                            {productDetailsData?.data?.product?.reviews.map((review, index) => (
                                                <li 
                                                    key={index} 
                                                    className="list-group-item border-0 shadow mb-4 rounded-3"
                                                    style={{
                                                        backgroundColor: '#ffe7eaff'
                                                    }}
                                                >
                                                    <div className="d-flex align-items-center mb-2">
                                                        <div className="text-muted">Review #{index + 1}</div>                                                                                                                                                
                                                    </div>
                                                    <span className="fst-italic fw-semibold">{review}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="card mb-4 border-0 shadow-sm">
                                        <div className="card-body">
                                            <h3 className="mb-4 fw-bold" style={{ color: '#f11c58ff' }}>Description: </h3>

                                            <ul className="list-unstyled">
                                                <li className="mb-2 py-2 border-bottom">
                                                    <strong>Product ID:</strong> {productDetailsData?.data?.product?._id}
                                                </li>
                                                <li className="mb-2 py-2 border-bottom">
                                                    <strong>Product's Category:</strong> {productDetailsData?.data?.product?.category}
                                                </li>
                                                <li className="mb-2 py-2 border-bottom">
                                                    <strong>Rating:</strong> {productDetailsData?.data?.product?.ratings} out of 5
                                                </li>
                                                <li className="mb-2 py-2 border-bottom">
                                                    <strong>Manufacturer:</strong> {productDetailsData?.data?.product?.description?.manufacturer}
                                                </li>
                                                <li className="mb-2 py-2 border-bottom">
                                                    <strong>Expiry Date:</strong> {productDetailsData?.data?.product?.description?.expiryDate}
                                                </li>
                                                <li className="mb-2 py-2 border-bottom">
                                                    <strong>Address:</strong> {productDetailsData?.data?.product?.description?.address}
                                                </li>
                                                <li className="py-2">
                                                    <strong>Country:</strong> {productDetailsData?.data?.product?.description?.country}
                                                </li>
                                            </ul>
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
        </main>
        </>
    )
}