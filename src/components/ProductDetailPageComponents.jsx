import { useCartContext } from "../context/Cart.context";
import { useProductContext } from "../context/Products.context";
import { useWishlistsContext } from "../context/Wishlists.context";

export default function ProductDetailPageComponents() {
  const {
    renderRatingStars,
    productDetailsData,
    productDetailsloading,
    ProductDetailsError,
    handleQuantityChange,
    quantity,
    setQuantity,
  } = useProductContext();

  const { wishlistLoading, isWishlisted, wishlistError, wishlistHandler } =
    useWishlistsContext();

  const { addToCart, handleBuyNow } = useCartContext();

  return (
    <>
      <main className="container py-4">
        <h2 className="mb-4 mt-3 fw-bold" style={{ color: "#f11c58ff" }}>
          Product Details
        </h2>

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

                      <button
                        className="btn position-absolute p-0"
                        style={{
                          top: "15px",
                          right: "15px",
                          borderRadius: "50%",
                          width: "35px",
                          height: "35px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        disabled={wishlistLoading}
                        onClick={() =>
                          wishlistHandler(
                            productDetailsData?.data?.product?._id
                          )
                        }
                        aria-label={
                          isWishlisted(productDetailsData?.data?.product?._id)
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                      >
                        {wishlistLoading ? (
                          <div
                            className="spinner-border spinner-border-sm text-danger"
                            role="status"
                          ></div>
                        ) : (
                          <i
                            className={`${
                              isWishlisted(
                                productDetailsData?.data?.product?._id
                              )
                                ? "fas"
                                : "far"
                            } fa-heart`}
                            style={{
                              color: isWishlisted(
                                productDetailsData?.data?.product?._id
                              )
                                ? "#f11c58ff"
                                : "#525050ff",
                              fontSize: "1.22rem",
                            }}
                          ></i>
                        )}
                      </button>

                      {wishlistError && (
                        <div className="alert alert-danger mt-2">
                          {wishlistError}
                        </div>
                      )}

                      {productDetailsData?.data?.product?.isFeatured && (
                        <span
                          className="badge bg-success mb-2 py-2 position-absolute"
                          style={{
                            fontFamily: "sans-serif",
                            fontSize: "78%",
                            top: "15px",
                            left: "15px",
                            backgroundColor: "#f11c58ff",
                          }}
                        >
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="d-grid gap-2">
                      <button
                        onClick={() =>
                          handleBuyNow(
                            productDetailsData?.data?.product?._id,
                            quantity
                          )
                        }
                        className="btn mt-3 fw-semibold fs-6 btn-sm"
                        style={{
                          backgroundColor: "#4452efff",
                          color: "white",
                          borderRadius: "8px",
                          padding: "10px",
                        }}
                      >
                        Buy Now
                      </button>

                      <button
                        onClick={() =>
                          addToCart(
                            productDetailsData?.data?.product?._id,
                            quantity
                          )
                        }
                        className="btn btn-outline-danger mt-1 fw-semibold fs-6 btn-sm"
                        style={{
                          borderRadius: "8px",
                          padding: "10px",
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="col-md-7 ps-md-4">
                    <h3 className="mb-3 fw-bold">
                      {productDetailsData?.data?.product?.name}
                    </h3>
                    <p className="text-muted mb-3">
                      {productDetailsData?.data?.product?.details}
                    </p>
                    <p className="mb-2">
                      <strong>Brand's Name:</strong>{" "}
                      {productDetailsData?.data?.product?.brand}
                    </p>
                    <div className="mb-3">
                      {renderRatingStars(
                        productDetailsData?.data?.product?.ratings
                      )}
                      <span className="ms-2">
                        ({productDetailsData?.data?.product?.ratings} reviews)
                      </span>
                    </div>
                    <h3
                      className="mb-3 py-2 fw-bold"
                      style={{ color: "#f11c58ff" }}
                    >
                      MRP: ₹{productDetailsData?.data?.product?.price}
                    </h3>

                    <div className="mb-4">
                      <strong className="me-3">Quantity:</strong>
                      <div
                        className="input-group mt-2"
                        style={{ width: "135px" }}
                      >
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
                          min={1}
                          max={productDetailsData?.data?.product?.stock}
                          onChange={(e) =>
                            setQuantity(parseInt(e.target.value) || 1)
                          }
                          style={{
                            borderColor: "black",
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
                      <div
                        className={`badge ${
                          productDetailsData?.data?.product?.stock !== 0
                            ? "bg-success"
                            : "bg-danger"
                        } py-2 mt-3 mb-2`}
                        style={{
                          backgroundColor:
                            productDetailsData?.data?.product?.stock !== 0
                              ? "#f11c58ff"
                              : "#dc3545",
                        }}
                      >
                        {productDetailsData?.data?.product?.stock !== 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </div>
                      {productDetailsData?.data?.product?.stock !== 0 && (
                        <span className="ms-2">
                          (Only {productDetailsData?.data?.product?.stock}{" "}
                          left!)
                        </span>
                      )}
                    </div>

                    <div className="py-2 mb-4">
                      <h3 className="fw-bold" style={{ color: "#f11c58ff" }}>
                        Reviews: (
                        {productDetailsData?.data?.product?.reviews.length})
                      </h3>
                      <ul className="list-group mt-3" style={{ width: "9cm" }}>
                        {productDetailsData?.data?.product?.reviews.map(
                          (review, index) => (
                            <li
                              key={index}
                              className="list-group-item border-0 shadow mb-4 rounded-3"
                              style={{
                                backgroundColor: "#ffe7eaff",
                              }}
                            >
                              <div className="d-flex align-items-center mb-2">
                                <div className="text-muted">
                                  Review #{index + 1}
                                </div>
                              </div>
                              <span className="fst-italic fw-semibold">
                                {review}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="card mb-4 border-0 shadow-sm">
                      <div className="card-body">
                        <h3
                          className="mb-4 fw-bold"
                          style={{ color: "#f11c58ff" }}
                        >
                          Description:{" "}
                        </h3>

                        <ul className="list-unstyled">
                          <li className="mb-2 py-2 border-bottom">
                            <strong>Product ID:</strong>{" "}
                            {productDetailsData?.data?.product?._id}
                          </li>
                          <li className="mb-2 py-2 border-bottom">
                            <strong>Product's Category:</strong>{" "}
                            {productDetailsData?.data?.product?.category?.name}
                          </li>
                          <li className="mb-2 py-2 border-bottom">
                            <strong>Rating:</strong>{" "}
                            {productDetailsData?.data?.product?.ratings} out of
                            5
                          </li>
                          <li className="mb-2 py-2 border-bottom">
                            <strong>Manufacturer:</strong>{" "}
                            {
                              productDetailsData?.data?.product?.description
                                ?.manufacturer
                            }
                          </li>
                          <li className="mb-2 py-2 border-bottom">
                            <strong>Expiry Date:</strong>{" "}
                            {
                              productDetailsData?.data?.product?.description
                                ?.expiryDate
                            }
                          </li>
                          <li className="mb-2 py-2 border-bottom">
                            <strong>Address:</strong>{" "}
                            {
                              productDetailsData?.data?.product?.description
                                ?.address
                            }
                          </li>
                          <li className="py-2">
                            <strong>Country:</strong>{" "}
                            {
                              productDetailsData?.data?.product?.description
                                ?.country
                            }
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="alert alert-danger">
                  An error occurred while fetching the product details.{" "}
                  {ProductDetailsError}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
