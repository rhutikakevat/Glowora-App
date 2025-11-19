import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="pt-5" style={{ backgroundColor: "#f11c58ff" }}>
      <div className="container">
        <div className="row g-4">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6">
            <div className="mb-4">
              <h5 className="fw-bold text-white mb-3">Glowora: Aura of You</h5>
              <p className="text-light mb-3 fs-6" style={{ opacity: 0.9 }}>
                Discover your unique aura with Glowora. We bring you authentic beauty products 
                that enhance your natural glow and celebrate your individuality.
              </p>
              <div className="d-flex gap-3">
                <a href="#" className="text-decoration-none">
                  <i className="fab fa-facebook fa-lg text-white" style={{ opacity: 0.9 }}></i>
                </a>
                <a href="#" className="text-decoration-none">
                  <i className="fab fa-instagram fa-lg text-white" style={{ opacity: 0.9 }}></i>
                </a>
                <a href="#" className="text-decoration-none">
                  <i className="fab fa-twitter fa-lg text-white" style={{ opacity: 0.9 }}></i>
                </a>
                <a href="#" className="text-decoration-none">
                  <i className="fab fa-pinterest fa-lg text-white" style={{ opacity: 0.9 }}></i>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold text-white mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-light fs-6" style={{ opacity: 0.9 }}>
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="text-decoration-none text-light fs-6" style={{ opacity: 0.9 }}>
                  Shop All
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-decoration-none text-light fs-6" style={{ opacity: 0.9 }}>
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-decoration-none text-light fs-6" style={{ opacity: 0.9 }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-white mb-3">Customer Service</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <span to="/shipping-info" className="text-decoration-none text-light fs-6" style={{ opacity: 0.9 }}>
                  Shipping Information
                </span>
              </li>
              <li className="mb-2">
                <span to="/returns" className="text-decoration-none text-light fs-6" style={{ opacity: 0.9 }}>
                  Returns & Exchanges
                </span>
              </li>
              <li className="mb-2">
                <span to="/faq" className="text-decoration-none text-light fs-6" style={{ opacity: 0.9 }}>
                  FAQ
                </span>
              </li>
              <li className="mb-2">
                <span to="/privacy-policy" className="text-decoration-none text-light fs-6" style={{ opacity: 0.9 }}>
                  Privacy Policy
                </span>
              </li>
              <li className="mb-2">
                <span to="/terms" className="text-decoration-none text-light fs-6" style={{ opacity: 0.9 }}>
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold text-white mb-3">Contact Info</h6>
            <ul className="list-unstyled text-light" style={{ opacity: 0.9 }}>
              <li className="mb-2 d-flex align-items-start">
                <i className="fas fa-map-marker-alt me-2 mt-1 fs-6"></i>
                <span className="fs-6">123 Beauty Street, Cosmetic City, India</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <i className="fas fa-phone me-2 fs-6"></i>
                <span className="fs-6">+91 123456789</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <i className="fas fa-envelope me-2 fs-6"></i>
                <span className="fs-6">support@glowora.com</span>
              </li>
              <li className="mb-2 d-flex align-items-start">
                <i className="fas fa-clock me-2 mt-1 fs-6"></i>
                <span className="fs-6">Mon-Fri: 9AM-6PM<br />Sat: 10AM-4PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        {/* <div className="row mt-4">
          <div className="col-lg-8 mx-auto">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="row align-items-center">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <h6 className="fw-bold mb-1" style={{ color: "#f11c58ff" }}>
                      Stay Updated
                    </h6>
                    <p className="mb-0 small text-muted">
                      Subscribe to get updates on new products and offers
                    </p>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter your email"
                        aria-label="Email address"
                      />
                      <button 
                        className="btn text-white fw-semibold"
                        style={{ backgroundColor: "#f11c58ff" }}
                        type="button"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Payment Methods */}
        <div className="row mt-4">
          <div className="col-12 text-center">
            <h6 className="fw-bold text-white mb-3">We Accept</h6>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <i className="fab fa-cc-visa fa-2x text-white" style={{ opacity: 0.9 }}></i>
              <i className="fab fa-cc-mastercard fa-2x text-white" style={{ opacity: 0.9 }}></i>
              <i className="fab fa-cc-paypal fa-2x text-white" style={{ opacity: 0.9 }}></i>
              <i className="fab fa-cc-apple-pay fa-2x text-white" style={{ opacity: 0.9 }}></i>
              <i className="fab fa-google-pay fa-2x text-white" style={{ opacity: 0.9 }}></i>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="row mt-5 pt-3 border-top pb-3" style={{ borderColor: 'rgba(255,255,255,0.2) !important' }}>
          <div className="col-md-6 text-center text-md-start">
            <span className="text-white fs-6" style={{ opacity: 0.9 }}>
              &copy; 2025 Glowora. All rights reserved.
            </span>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <span className="text-white fs-6 fst-italic" style={{ opacity: 0.9 }}>
              Glowora: Aura of You
            </span>
          </div>
        </div>
      </div>

      <style>
        {`
          .footer-link:hover {
            opacity: 1 !important;
            text-decoration: underline;
          }
        `}
      </style>
    </footer>
  );
}