import { useProductContext } from "../context/Products.context";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useWishlistsContext } from "../context/Wishlists.context";
import { useCartContext } from "../context/Cart.context";

export default function WishlistProducts() {
  const { renderRatingStars, navigate } = useProductContext();

  const {
    wishlistLoading,
    wishlist,
    isWishlisted,
    wishlistError,
    wishlistHandler,
  } = useWishlistsContext();

  const { addToCart } = useCartContext();

  if (wishlistLoading) {
    return (
      <>
        <main
          className="container vh-100 d-flex 
                    flex-column justify-content-center align-items-center text-center"
        >
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-4 fs-4 fw-semibold">Loading your wishlist...</p>
        </main>
      </>
    );
  }

  if (wishlistError) {
    return (
      <>
        <main className="container py-5 text-center">
          <div className="alert alert-danger">
            An error occurred while loading your wishlist
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="container py-4 mb-5">
        <div className="py-2 mb-3">
          <h2
            className="text-center text-md-start"
            style={{ color: "#f11c58ff" }}
          >
            My Wishlist
          </h2>
          <hr
            className="mx-auto"
            style={{ borderTop: "1px solid #f11c58ff" }}
          />
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <h3 className="mb-4 py-2 border-bottom">
              Wishlisted Products ({wishlist?.length || 0})
            </h3>

            {wishlist && wishlist?.length > 0 ? (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {wishlist?.map((product) => (
                  <div key={product?._id} className="col">
                    <div className="card h-100 shadow-sm border-0">
                      <div className="position-relative">
                        <img
                          onClick={(event) => {
                            event.preventDefault();
                            navigate(`/products/${product?._id}`);
                          }}
                          src={product?.profileImage}
                          alt={product?.name}
                          className="card-img-top p-2"
                          style={{
                            height: "200px",
                            objectFit: "contain",
                            cursor: "pointer",
                            borderBottom: "1px solid #f5f5f5",
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
                          disabled={wishlistLoading === product?._id}
                          onClick={() => {
                            wishlistHandler(product?._id);
                          }}
                          aria-label={
                            isWishlisted(product?._id)
                              ? "Remove from wishlist"
                              : "Add to wishlist"
                          }
                        >
                          {wishlistLoading === product?._id ? (
                            <div
                              className="spinner-border spinner-border-sm text-danger"
                              role="status"
                            ></div>
                          ) : (
                            <i
                              className={`${
                                isWishlisted(product?._id) ? "fas" : "far"
                              } fa-heart`}
                              style={{
                                color: isWishlisted(product?._id)
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
                      </div>

                      <div className="card-body d-flex flex-column">
                        <h5
                          onClick={(event) => {
                            event.preventDefault();
                            navigate(`/products/${product?._id}`);
                          }}
                          style={{
                            cursor: "pointer",
                            fontSize: "1rem",
                            minHeight: "30px",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                          className="card-title"
                        >
                          {product?.name}
                        </h5>
                        <div className="mb-2" style={{ color: "#f11c58ff" }}>
                          <span className="fw-bold">
                            MRP: ₹{product?.price}
                          </span>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                          <div className="me-2">
                            {renderRatingStars(product?.ratings)}
                          </div>
                          <small className="text-muted">
                            ({product?.ratings})
                          </small>
                        </div>

                        <div className="d-flex gap-2 mt-auto">
                          <button
                            onClick={() => addToCart(product?._id)}
                            className="btn text-light fw-semibold flex-grow-1"
                            style={{
                              backgroundColor: "#f11c58ff",
                              border: "none",
                              padding: "8px",
                              borderRadius: "8px",
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <div className="alert alert-info">
                  Your wishlist is empty.
                  <br />
                  Start adding products in your wishlist!
                </div>
                <button
                  onClick={() => navigate("/products")}
                  className="btn text-white mt-3"
                  style={{ backgroundColor: "#f11c58ff" }}
                >
                  Browse Products
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
