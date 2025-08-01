import { Link } from "react-router-dom";
import { useProductContext } from "../context/Products.context";
import ShippingLogo from "/shippingLogo.png";
import ReturnsLogo from "/Returns.png";
import AuthenticLogo from "/Authentic.png";
import CustomersLogo from "/Customers.png";

export default function MainContent() {
  const {
    categories,
    categoriesLoading,
    categoriesError,
    products,
    productsLoading,
    productsError,
    renderRatingStars,
    filterFeaturedProducts, carouselImages
  } = useProductContext();  

  return (
    <main className="container py-4">

      {/* Carousel Section */}

      <section className="mb-5 mt-3">
        <div id="mainCarousel" className="carousel slide" 
        data-bs-ride="carousel">
          <div className="carousel-inner rounded-4">
            {carouselImages.map((img, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                <img 
                  src={img} 
                  className="d-block w-100" 
                  alt={`Promo ${index + 1}`}
                  style={{ height: '350px', objectFit: 'cover' }}
                 
                />
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>


      {/* Featured Categories Section */}
      
      <section className="py-4">
        <div className="text-center mb-4">
          <h3 className="fw-bold mb-3" style={{ color: '#f11c58ff' }}>Shop By Category</h3>
          <hr className="mx-auto" style={{ width: '100px', borderTop: '3px solid #f11c58ff' }} />
        </div>

        {categoriesError ? (
          <div className="alert alert-danger text-center">
            An error occurred while loading categories: {categoriesError.message}
          </div>
        ) : categoriesLoading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading categories...</p>
          </div>
        ) : (
          <div className="row g-3 justify-content-center mt-3">
            {categories?.data?.categories?.map((category) => (
              <div 
                key={category._id} 
                className="col-4 col-sm-3 col-md-2"
              >
                <Link
                  to={`/products?category=${category.name}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                    <div className="ratio ratio-1x1">
                      <img
                        src={category.image}
                        className="card-img-top object-fit-cover p-2"
                        alt={category.name}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div className="card-body text-center p-1">
                      <h6 className="card-title mb-0 fw-semibold" style={{ fontSize: '0.8rem' }}>
                        {category.name}
                      </h6>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>


      {/* Shipping Info Section */}

      <section className="py-4 bg-light rounded-4 my-5"
      >
        <div className="text-center mb-4">
          <h3 className="fw-bold mb-3" style={{ color: '#f11c58ff' }}>Why Choose Glowora?</h3>
          <hr className="mx-auto" style={{ width: '100px', borderTop: '3px solid #f11c58ff' }} />
        </div>

        <div className="row g-0">
          <div className="col-6 col-md-3 p-0">
            <div className="card h-100 border-0 bg-transparent m-0">
              <div className="card-body text-center">
                <img 
                  src={ShippingLogo} 
                  alt="Free Shipping" 
                  className="img-fluid mb-2"
                  style={{ height: '50px' }}
                />
                <h5 className="fw-semibold mb-2" style={{ color: '#f11c58ff', fontSize: '1rem' }}>FREE SHIPPING</h5>
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
                  style={{ height: '50px' }}
                />
                <h5 className="fw-semibold mb-2" style={{ color: '#f11c58ff', fontSize: '1rem' }}>EASY RETURNS</h5>
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
                  style={{ height: '50px' }}
                />
                <h5 className="fw-semibold mb-2" style={{ color: '#f11c58ff', fontSize: '1rem' }}>100% AUTHENTIC</h5>
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
                  style={{ height: '50px' }}
                />
                <h5 className="fw-semibold mb-2" style={{ color: '#f11c58ff', fontSize: '1rem' }}>1000+ CUSTOMERS</h5>
                <p className="mb-0 small">Happy customers with 4.7 ratings</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Products Section */}

      <section className="py-4 mt-4">
        <div className="text-center mb-4">
          <h3 className="fw-bold mb-3" style={{ color: '#f11c58ff' }}>Featured Products</h3>
          <hr className="mx-auto" style={{ width: '100px', borderTop: '3px solid #f11c58ff' }} />
        </div>

        {productsError ? (
          <div className="alert alert-danger text-center">
            An error occurred while loading products: {productsError.message}
          </div>
        ) : productsLoading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading Products...</p>
          </div>
        ) : (
          <div className="row g-3 mt-3">
            {filterFeaturedProducts && filterFeaturedProducts.map((product) => (
              <div 
                key={product._id} 
                className="col-6 col-md-4 col-lg-3"
              >
                <Link
                  to={`/api/products/${product._id}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="card h-100 border-0 shadow-sm hover-shadow transition-all product-card">
                    <div className="ratio ratio-1x1">
                      <img
                        src={product.profileImage}
                        className="card-img-top object-fit-cover p-3"
                        alt={product.name}
                      
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div className="card-body p-2 text-center">
                      <h6 className="card-title fw-semibold mb-1" style={{ fontSize: '0.85rem' }}>
                        {product.name}
                      </h6>
                      <div className="small text-muted mb-1">Brand: {product.brand}</div>
                      <div className="mb-1">
                        {renderRatingStars(product.ratings)}{" "}
                        <span className="small">({product.ratings})</span>
                      </div>
                      <div className="fw-bold mb-1" style={{ color: '#f11c58ff', fontSize: '0.95rem' }}>
                        ₹{product.price}
                      </div>
                      <div 
                        className={`badge ${product.stock ? 'bg-success' : 'bg-danger'} py-1 mb-1`}
                        style={{ fontSize: '0.7rem' }}
                      >
                        {product.stock ? "In Stock" : "Out of Stock"}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}