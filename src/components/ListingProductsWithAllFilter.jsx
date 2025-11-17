import { useProductContext } from "../context/Products.context";
import Slider from "@mui/material/Slider";
import { FiFilter } from "react-icons/fi";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useCategoriesContext } from "../context/Categories.context";
import { useWishlistsContext } from "../context/Wishlists.context";
import { useCartContext } from "../context/Cart.context";

export default function ListingProductswithAllFilter() {
  const {
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
    showFilters,
    setShowFilters,
  } = useProductContext();

  const { selectedCategories, categories, handleCategoryChange } =
    useCategoriesContext();

  const { wishlistLoading, isWishlisted, wishlistError, wishlistHandler } =
    useWishlistsContext();

  const { addToCart } = useCartContext();

  const renderFilters = () => (
    <div className="card shadow-sm border-0 mt-2">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center pb-4 mb-4 border-bottom">
          <h4 className="m-0" style={{ color: "#f11c58ff" }}>
            Filters
          </h4>
          <button
            onClick={handlerClearAll}
            className="btn btn-sm btn-outline-danger"
            aria-label="Clear all filters"
          >
            Clear All
          </button>
        </div>

        {/* Price Filter */}

        <div className="mb-4">
          <h6 className="mb-3 fw-semibold">Price Range</h6>
          <Slider
            value={selectedPriceForFilter}
            onChange={handlerPriceFilter}
            aria-labelledby="price-slider"
            step={10}
            marks={[
              { value: 0, label: "All" },
              { value: 25, label: "₹25" },
              { value: 50, label: "₹50" },
              { value: 75, label: "₹75" },
              { value: 100, label: "₹100" },
              { value: 200, label: "₹50" },
            ]}
            min={0}
            max={100}
            valueLabelDisplay="auto"
            style={{
              color: "#f11c58ff",
            }}
          />
        </div>

        {/* Categories Filter */}

        <div className="mb-4">
          <h6 className="mb-3 fw-semibold">Categories</h6>
          <div className="list-group list-group-flush">
            {categories?.data?.categories.map((category) => (
              <div
                key={category._id}
                className="list-group-item border-0 px-0 py-1"
              >
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={category._id}
                    name="categories"
                    value={category.name}
                    onChange={handleCategoryChange}
                    checked={selectedCategories.includes(category.name)}
                    style={{
                      backgroundColor: selectedCategories.includes(
                        category.name
                      )
                        ? "#f11c58ff"
                        : "",
                    }}
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
          <h6 className="mb-3 fw-semibold">Customer Ratings</h6>
          <Slider
            value={selectedRating}
            onChange={handlerRatingChange}
            aria-labelledby="rating-slider"
            step={0.2}
            marks={[
              { value: 0, label: "All" },
              { value: 1, label: "1+" },
              { value: 2, label: "2+" },
              { value: 3, label: "3+" },
              { value: 4, label: "4+" },
              { value: 5, label: "5" },
            ]}
            min={0}
            max={5}
            valueLabelDisplay="auto"
            style={{
              color: "#f11c58ff",
            }}
          />
        </div>

        {/* Price Sort */}

        <div>
          <h6 className="mb-3 fw-semibold">Sort by Price</h6>
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
                  style={{
                    backgroundColor:
                      selectedPrice === "highToLow" ? "#f11c58ff" : "",
                  }}
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
                  style={{
                    backgroundColor:
                      selectedPrice === "lowToHigh" ? "#f11c58ff" : "",
                  }}
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
  );

  if (productsLoading) {
    return (
      <main
        className="container vh-100 d-flex 
                  flex-column justify-content-center align-items-center text-center"
      >
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-4 fs-4 fw-semibold">Please wait, Loading Products...</p>
      </main>
    );
  }

  if (productsError) {
    return (
      <main className="container py-5 text-center">
        <div className="alert alert-danger">
          An error occurred while loading categories: {productsError.message}
        </div>
      </main>
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
            Cosmetics & Beauty Products
          </h2>

          <hr
            className="mx-auto"
            style={{ borderTop: "1px solid #f11c58ff" }}
          />
        </div>

        <div>
          <div className="row">
            {/* Filters Section */}

            <div className="col-12 mb-3 d-md-none">
              <button
                className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  backgroundColor: "#f11c58ff",
                  color: "white",
                  borderRadius: "8px",
                  padding: "10px 16px",
                }}
              >
                <FiFilter size={17} />
                {showFilters ? "Hide Filters" : "Show Filters"}
                <i
                  className={`bi bi-chevron-${
                    showFilters ? "up" : "down"
                  } ms-2`}
                ></i>
              </button>

              {showFilters && <div className="mt-3">{renderFilters()}</div>}
            </div>

            {/* Desktop Filters */}

            <div className="col-lg-3 col-md-4 mb-4 d-none d-md-block">
              {renderFilters()}
            </div>

            {/* Products Listing */}

            <div className="col-lg-9 col-md-8 mt-4">
              <h3 className="mb-4 py-2 border-bottom">
                All Products ({displayedProducts.length})
              </h3>
              {displayedProducts.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                  {displayedProducts.map((product) => (
                    <div key={product._id} className="col">
                      <div className="card h-100 shadow-sm border-0">
                        <div className="position-relative">
                          <img
                            onClick={(event) => {
                              event.preventDefault();
                              navigate(`/products/${product._id}`);
                            }}
                            src={product.profileImage}
                            alt={product.name}
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

                        <div className="card-body d-flex flex-column">
                          <h5
                            onClick={(event) => {
                              event.preventDefault();
                              navigate(`/products/${product._id}`);
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
                            {product.name}
                          </h5>
                          <div className="mb-2" style={{ color: "#f11c58ff" }}>
                            <span className="fw-bold">
                              MRP: ₹{product.price}
                            </span>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <div className="me-2">
                              {renderRatingStars(product.ratings)}
                            </div>
                            <small className="text-muted">
                              ({product.ratings})
                            </small>
                          </div>

                          <button
                            onClick={() => addToCart(product._id)}
                            className="btn mt-auto text-light fw-semibold"
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
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <div className="alert alert-info">
                    No products match your filters.
                  </div>
                  <button
                    onClick={handlerClearAll}
                    className="btn text-white mt-3"
                    style={{ backgroundColor: "#f11c58ff" }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
