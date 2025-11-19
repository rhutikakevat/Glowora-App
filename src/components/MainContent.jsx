import { Link } from "react-router-dom";
import { useProductContext } from "../context/Products.context";
import ShippingLogo from "/shippingLogo.png";
import ReturnsLogo from "/Returns.png";
import AuthenticLogo from "/Authentic.png";
import CustomersLogo from "/Customers.png";
import Header from "./Header";
import Footer from "./Footer";
import { useCategoriesContext } from "../context/Categories.context";
import { useWishlistsContext } from "../context/Wishlists.context";
import { useCartContext } from "../context/Cart.context";

export default function MainContent() {
  const {
    productsLoading,
    productsError,
    renderRatingStars,
    filterFeaturedProducts,
    navigate,
    carouselImages,
  } = useProductContext();

  const { wishlistLoading, isWishlisted, wishlistError, wishlistHandler } =
    useWishlistsContext();

  const { categories, categoriesLoading, categoriesError } =
    useCategoriesContext();

  const { addToCart } = useCartContext();

  if (categoriesLoading || productsLoading) {
    return (
      <main
        className="container vh-100 d-flex 
      flex-column justify-content-center align-items-center text-center"
      >
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-4 fs-4 fw-semibold">Please wait, Loading...</p>
      </main>
    );
  }

  if (categoriesError || productsError) {
    return (
      <main className="container py-5 text-center">
        <div className="alert alert-danger">
          {categoriesError
            ? `Error loading categories: ${categoriesError.message}`
            : `Error loading products: ${productsError.message}`}
        </div>
      </main>
    );
  }

  return (
    <>
      <Header />

      <main className="container py-4">
        {/* Carousel Section */}

        <section className="mb-5 mt-3">
          {carouselImages?.length > 0 ? (
            <div
              id="mainCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="3000"
            >
              <div className="carousel-inner rounded-4">
                {carouselImages.map((img, index) => (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    key={index}
                  >
                    <img
                      src={img}
                      className="d-block w-100"
                      alt={`Promo ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#mainCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#mainCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          ) : (
            <div
              className="container vh-100 d-flex 
      flex-column justify-content-center align-items-center text-center"
            >
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </section>
        

        {/* Featured Categories Section */}

        <section className="py-4">
          <div className="text-center mb-4">
            <h3 className="fw-bold mb-3" style={{ color: "#f11c58ff" }}>
              Shop By Category
            </h3>
            <hr
              className="mx-auto"
              style={{ width: "100px", borderTop: "3px solid #f11c58ff" }}
            />
          </div>

          <div className="row g-3 justify-content-center mt-3">
            {categories?.data?.categories?.map((category) => (
              <div
                key={category._id}
                className="col-6 col-sm-6 col-md-4 col-lg-2 mb-3"
              >
                <Link
                  to={`/products?category=${category.name}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="card category-card h-100 border-0 shadow-sm">
                    <div className="ratio ratio-1x1">
                      <img
                        src={category.image}
                        className="card-img-top object-fit-cover p-2"
                        alt={category.name}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    
                    <div className="card-body text-center p-1">
                      <h6
                        className="card-title mb-0 fw-semibold"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {category.name}
                      </h6>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Shipping Info Section */}

        <section className="py-4 bg-light rounded-4 my-5">
          <div className="text-center mb-4">
            <h3 className="fw-bold mb-3" style={{ color: "#f11c58ff" }}>
              Why Choose Glowora?
            </h3>
            <hr
              className="mx-auto"
              style={{ width: "100px", borderTop: "3px solid #f11c58ff" }}
            />
          </div>

          <div className="row g-0">
            <div className="col-6 col-md-3 p-0">
              <div className="card h-100 border-0 bg-transparent m-0">
                <div className="card-body text-center">
                  <img
                    src={ShippingLogo}
                    alt="Free Shipping"
                    className="img-fluid mb-2"
                    style={{ height: "50px" }}
                  />
                  <h5
                    className="fw-semibold mb-2"
                    style={{ color: "#f11c58ff", fontSize: "1rem" }}
                  >
                    FREE SHIPPING
                  </h5>
                  <p className="mb-0 small">On orders above ₹20</p>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="card h-100 border-0 bg-transparent">
                <div className="card-body text-center">
                  <img
                    src={ReturnsLogo}
                    alt="Easy Returns"
                    className="img-fluid mb-2"
                    style={{ height: "50px" }}
                  />
                  <h5
                    className="fw-semibold mb-2"
                    style={{ color: "#f11c58ff", fontSize: "1rem" }}
                  >
                    EASY RETURNS
                  </h5>
                  <p className="mb-0 small">15-day return policy</p>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="card h-100 border-0 bg-transparent">
                <div className="card-body text-center">
                  <img
                    src={AuthenticLogo}
                    alt="100% Authentic"
                    className="img-fluid mb-2"
                    style={{ height: "50px" }}
                  />
                  <h5
                    className="fw-semibold mb-2"
                    style={{ color: "#f11c58ff", fontSize: "1rem" }}
                  >
                    100% AUTHENTIC
                  </h5>
                  <p className="mb-0 small">Products sourced directly</p>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="card h-100 border-0 bg-transparent">
                <div className="card-body text-center">
                  <img
                    src={CustomersLogo}
                    alt="Happy Customers"
                    className="img-fluid mb-2"
                    style={{ height: "50px" }}
                  />
                  <h5
                    className="fw-semibold mb-2"
                    style={{ color: "#f11c58ff", fontSize: "1rem" }}
                  >
                    1000+ CUSTOMERS
                  </h5>
                  <p className="mb-0 small">Happy customers with 4.7 ratings</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}

        <section className="py-4 mt-4">
          <div className="text-center mb-4">
            <h3 className="fw-bold mb-3" style={{ color: "#f11c58ff" }}>
              Featured Products
            </h3>
            <hr
              className="mx-auto"
              style={{ width: "100px", borderTop: "3px solid #f11c58ff" }}
            />
          </div>

          <div className="row g-3 mt-3">
            {filterFeaturedProducts.length > 0 ? (
              filterFeaturedProducts.map((product) => (
                <div key={product._id} className="col-6 col-md-4 col-lg-3">
                  <div className="card h-100 border-0 shadow-sm hover-shadow transition-all product-card">
                    <div className="position-relative">
                      <img
                        src={product.profileImage}
                        className="card-img-top object-fit-cover p-3"
                        alt={product.name}
                        onClick={(event) => {
                          event.preventDefault();
                          navigate(`/products/${product._id}`);
                        }}
                        style={{ objectFit: "contain" }}
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
                        disabled={wishlistLoading === product._id}
                        onClick={() => wishlistHandler(product?._id)}
                        aria-label={
                          isWishlisted(product?._id)
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                      >
                        {wishlistLoading === product._id ? (
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
                    <div className="card-body p-2 text-center">
                      <h6
                        onClick={() => {
                          navigate(`/products/${product._id}`);
                        }}
                        className="card-title fw-semibold mb-1"
                        style={{ fontSize: "0.85rem" }}
                      >
                        {product.name}
                      </h6>
                      <div className="small text-muted mb-1">
                        Brand: {product.brand}
                      </div>
                      <div
                        className={`badge ${
                          product.stock ? "bg-success" : "bg-danger"
                        } py-1 mb-1`}
                        style={{ fontSize: "0.7rem" }}
                      >
                        {product.stock ? "In Stock" : "Out of Stock"}
                      </div>
                      <div
                        className="fw-bold fs-5 mt-2 mb-2"
                        style={{ color: "#f11c58ff", fontSize: "0.95rem" }}
                      >
                        MRP: ₹{product.price}
                      </div>
                      <div className="mb-3">
                        {renderRatingStars(product.ratings)}{" "}
                        <span className="small">({product.ratings})</span>
                      </div>

                      <button
                        onClick={() => addToCart(product._id)}
                        className="btn text-light mb-2 fw-semibold"
                        style={{
                          backgroundColor: "#f11c58ff",
                          border: "none",
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">Products does not found!</p>
            )}
          </div>
        </section>

        <style>
          {`
          .product-card:hover {
            transform: scale(1.05);
            transition: transform 0.1s ease;
            cursor: pointer
          }   
            
           .category-card:hover {
              transform: scale(1.05);
              transition: transform 0.1s ease-in-out;
              box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
              cursor: pointer
            }
          `}
        </style>
      </main>

      <Footer />
    </>
  );
}
