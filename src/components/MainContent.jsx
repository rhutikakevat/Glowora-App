import { Link } from "react-router-dom";
import { useProductContext } from "../context/Products.context";
import ShippingLogo from "/shippingLogo.png";
import ReturnsLogo from "/Returns.png";
import AuthenticLogo from "/Authentic.png";
import CustomersLogo from "/Customers.png";
import Header from "./Header";
import Footer from "./Footer";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function MainContent() {
  const {
    categories,
    categoriesLoading,
    categoriesError,
    productsLoading,
    productsError,
    renderRatingStars,handleAddToWishlist,
    filterFeaturedProducts, navigate,
    carouselImages,wishlistItems
  } = useProductContext(); 
  
  if (categoriesLoading || productsLoading){
    return (
      <main className="container vh-100 d-flex 
      flex-column justify-content-center align-items-center text-center">
     
         <div className="spinner-border text-danger" role="status"> 
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-4 fs-4 fw-semibold">
          Please wait, Loading...
        </p>
       
      </main>
    )
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
        <div id="mainCarousel" className="carousel slide" 
        data-bs-ride="carousel">
          <div className="carousel-inner rounded-4">
            {carouselImages.map((img, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} 
              key={index}>
                <img 
                  src={img} 
                  className="d-block w-100" 
                  alt={`Promo ${index + 1}`}         
                 
                />
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" 
          data-bs-target="#mainCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" 
          data-bs-target="#mainCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>


      {/* Featured Categories Section */}
      
      <section className="py-4">
        <div className="text-center mb-4">
          <h3 className="fw-bold mb-3" style={{ color: '#f11c58ff' }}>
            Shop By Category
          </h3>
          <hr className="mx-auto" 
          style={{ width: '100px', borderTop: '3px solid #f11c58ff' }} />
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

         <div className="row g-3 mt-3">
            {filterFeaturedProducts.length > 0 ? filterFeaturedProducts.map((product) => (
              <div 
                key={product._id} 
                className="col-6 col-md-4 col-lg-3"
              >
                <div className="card h-100 border-0 shadow-sm hover-shadow transition-all product-card">
                    <div className="position-relative">
                      <img
                        src={product.profileImage}
                        className="card-img-top object-fit-cover p-3"
                        alt={product.name}
                        onClick={(event) => {
                           event.preventDefault();
                           navigate(`/api/products/${product._id}`)
                             }} 
                        style={{ objectFit: 'contain' }}
                      />

                       <button
                          onClick={() => handleAddToWishlist(product._id)}
                          className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle"
                          style={{
                              height: "40px",
                              width: "40px",
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                                  }}
                            aria-label={wishlistItems.includes(product._id) ? "Remove from wishlist" : "Add to wishlist"}
                           >{wishlistItems.includes(product._id) ?
                               <FavoriteIcon className="text-danger" /> :
                               <FavoriteBorderIcon />
                              }
                        </button>
                                                        
                    </div>
                    <div className="card-body p-2 text-center">
                      <h6  onClick={() => {
                            navigate(`/api/products/${product._id}`)
                                                        }} 
                       className="card-title fw-semibold mb-1" style={{ fontSize: '0.85rem' }}>
                        {product.name}
                      </h6>
                      <div className="small text-muted mb-1">Brand: {product.brand}</div>
                       <div 
                        className={`badge ${product.stock ? 'bg-success' : 'bg-danger'} py-1 mb-1`}
                        style={{ fontSize: '0.7rem' }}
                      >
                        {product.stock ? "In Stock" : "Out of Stock"}
                      </div>                      
                      <div className="fw-bold fs-5 mt-2 mb-2" style={{ color: '#f11c58ff', fontSize: '0.95rem' }}>
                        ₹{product.price}
                      </div>
                      <div className="mb-3">
                        {renderRatingStars(product.ratings)}{" "}
                        <span className="small">({product.ratings})</span>
                      </div>

                      <div className="d-grid gap-2 col-5 mb-2 mx-auto">
                       <button
                         onClick={() => handleAddToCart(product._id)}
                         className="btn text-light"
                           style={{
                             backgroundColor: "#f11c58ff",
                             border: 'none',
                             padding: '4px',
                             borderRadius: '8px'
                                }}
                        >
                           Add to Cart
                       </button>
                      </div>                     
                    </div>
                  </div>
              
              </div>
            ))
            :
            <p className="text-center text-muted">Products does not found!</p>
            }
          </div>
      </section>

      <style>
        {
          `
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
          `
        }
      </style>
    </main>

    <Footer />
</>
  );
}