import logo from "/logo.jpg";
import { NavLink } from "react-router-dom";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { PiPhoneCallFill } from "react-icons/pi";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { useWishlistsContext } from "../context/Wishlists.context";
import { useCartContext } from "../context/Cart.context";
import { useState, useEffect } from "react";
import { useCategoriesContext } from "../context/Categories.context";
import { useProductContext } from "../context/Products.context";

export default function Header() {
  const { wishlistCount } = useWishlistsContext();
  const { cartCount } = useCartContext();
  const { products } = useProductContext();
  const { categories } = useCategoriesContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Search function
  const handleSearch = (term) => {
    if (!term.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const lowerTerm = term.toLowerCase();

    // Search in products
    const productResults = products.data.products
      .filter((product) => product.name.toLowerCase().includes(lowerTerm))
      .map((product) => ({
        ...product,
        type: "product",
      }));

    // Search in categories
    const categoryResults = categories.data.categories
      .filter((category) => category.name.toLowerCase().includes(lowerTerm))
      .map((category) => ({
        ...category,
        type: "category",
      }));

    const results = [...productResults, ...categoryResults];
    setSearchResults(results);
    setShowResults(results.length > 0);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  // Clear search when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowResults(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  // Handle search result click
  const handleResultClick = (result) => {
    if (result.type === "product") {
      // Navigate to product page
      window.location.href = `/products/${result._id}`;
    } else if (result.type === "category") {
      // Navigate to category page
      window.location.href = `/products?category=${result._id}`;
    }
    setShowResults(false);
    setSearchTerm("");
  };

  return (
    <header>
      <nav
        className={`navbar navbar-expand-lg navbar-light ${
          darkMode ? "navbar-dark bg-dark" : "bg-light"
        } shadow mb-3 py-2`}
      >
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand me-4 me-lg-5 ms-3 mb-2">
            <img
              src={logo}
              className="logo img-fluid rounded"
              style={{ width: "150px" }}
              alt="Glowora Logo"
            />
          </NavLink>

          {/* Dark Mode Toggle */}
          <button
            className="btn btn-outline-secondary me-3 d-none d-lg-block"
            onClick={toggleDarkMode}
            type="button"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Search Bar for Desktop */}
            <div
              className="d-none d-lg-flex align-items-center me-auto position-relative"
              style={{ width: "30%" }}
            >
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products or categories..."
                  aria-label="Search products"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onClick={(e) => e.stopPropagation()}
                  style={{ borderColor: "#b40c3cff", fontFamily: "cursive" }}
                />
                <button className="btn btn-outline-danger" type="button">
                  <FaSearch />
                </button>
              </div>

              {/* Search Results Dropdown */}
              {showResults && (
                <div
                  className="position-absolute top-100 start-0 end-0 mt-1 bg-white border rounded shadow-lg z-3"
                  style={{ maxHeight: "400px", overflowY: "auto" }}
                >
                  {searchResults.map((result) => (
                    <div
                      key={`${result.type}-${result._id}`}
                      className="p-3 border-bottom cursor-pointer hover-bg"
                      onClick={() => handleResultClick(result)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={result.profileImage || result.image}
                          alt={result.name}
                          className="rounded me-3"
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <div className="fw-semibold">{result.name}</div>
                          <small
                            className={`badge ${
                              result.type === "product"
                                ? "bg-primary"
                                : "bg-success"
                            }`}
                          >
                            {result.type === "product" ? "Product" : "Category"}
                          </small>
                          {result.type === "product" && (
                            <div className="text-muted">${result.price}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <ul className="navbar-nav mb-2 mb-lg-0 fw-semibold fs-6">
              {/* Dark Mode Toggle for Mobile */}
              <li className="nav-item ms-3 me-3 d-lg-none">
                <button
                  className="nav-link btn btn-link"
                  onClick={toggleDarkMode}
                  type="button"
                >
                  {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
                  <span className="ms-1">{darkMode ? "Light" : "Dark"}</span>
                </button>
              </li>

              <li className="nav-item ms-3 me-3">
                <NavLink
                  to="/products"
                  className="nav-link"
                  aria-current="page"
                >
                  <GiCardboardBoxClosed size={20} className="me-1" />
                  Products
                </NavLink>
              </li>

              <li className="nav-item ms-3 me-3">
                <NavLink to="/about" className="nav-link" aria-current="page">
                  <IoInformationCircle size={20} className="me-1" />
                  About
                </NavLink>
              </li>

              {/* Updated Wishlist with mobile-optimized badge */}
              <li className="nav-item ms-3 me-3">
                <NavLink to="/wishlist" className="nav-link position-relative">
                  <FaHeart size={18} className="me-1" />
                  Wishlist
                  {wishlistCount > 0 && (
                    <>
                      {/* Badge for desktop (positioned top-right) */}
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger d-none d-lg-inline">
                        {wishlistCount}
                      </span>
                      {/* Badge for mobile (inline with text) */}
                      <span className="badge rounded-pill bg-danger ms-1 d-inline d-lg-none">
                        {wishlistCount}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>

              {/* Updated Cart with mobile-optimized badge */}
              <li className="nav-item ms-3 me-3">
                <NavLink to="/cart" className="nav-link position-relative">
                  <FaShoppingCart size={18} className="me-1" />
                  Cart
                  {cartCount > 0 && (
                    <>
                      {/* Badge for desktop (positioned top-right) */}
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger d-none d-lg-inline">
                        {cartCount}
                      </span>
                      {/* Badge for mobile (inline with text) */}
                      <span className="badge rounded-pill bg-danger ms-1 d-inline d-lg-none">
                        {cartCount}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>

              <li className="nav-item ms-3 me-3">
                <NavLink to="/contact" className="nav-link" aria-current="page">
                  <PiPhoneCallFill size={20} className="me-1" />
                  Contact
                </NavLink>
              </li>
{/* 
              <li className="nav-item ms-3 me-3">
                <NavLink to="/wishlist" className="nav-link position-relative">
                  <FaHeart size={18} className="me-1" />
                  Wishlist
                  {wishlistCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {wishlistCount}
                    </span>
                  )}
                </NavLink>
              </li>

              <li className="nav-item ms-3 me-3">
                <NavLink to="/cart" className="nav-link position-relative">
                  <FaShoppingCart size={18} className="me-1" />
                  Cart
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              </li>

              <li className="nav-item ms-3 me-3">
                <NavLink to="/contact" className="nav-link" aria-current="page">
                  <PiPhoneCallFill size={20} className="me-1" />
                  Contact Us
                </NavLink>
              </li> */}

              <li className="nav-item ms-3 me-4">
                <NavLink to="/profile" className="nav-link">
                  <FaUser size={15} className="me-1" />
                  Profile
                </NavLink>
              </li>
            </ul>

            {/* Search Bar for Mobile */}
            <div className="d-lg-none mt-3 ms-3 me-2 position-relative">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products or categories..."
                  aria-label="Search products"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onClick={(e) => e.stopPropagation()}
                />
                <button className="btn btn-outline-secondary" type="button">
                  <FaSearch />
                </button>
              </div>

              {/* Search Results Dropdown for Mobile */}
              {showResults && (
                <div
                  className="position-absolute top-100 start-0 end-0 mt-1 bg-white border rounded shadow-lg z-3"
                  style={{ maxHeight: "300px", overflowY: "auto" }}
                >
                  {searchResults.map((result) => (
                    <div
                      key={`${result.type}-${result._id}`}
                      className="p-2 border-bottom cursor-pointer"
                      onClick={() => handleResultClick(result)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={result.profileImage || result.image}
                          alt={result.name}
                          className="rounded me-2"
                          style={{
                            width: "35px",
                            height: "35px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <div className="fw-semibold small">{result.name}</div>
                          <small
                            className={`badge ${
                              result.type === "product"
                                ? "bg-primary"
                                : "bg-success"
                            }`}
                          >
                            {result.type === "product" ? "Product" : "Category"}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Add this CSS for dark mode and hover effects */}
      <style>
        {`
          .dark-mode {
            background-color: #1a1a1a;
            color: #ffffff;
          }

          .dark-mode .navbar-dark {
            background-color: #2d3748 !important;
          }

          .dark-mode .card {
            background-color: #2d3748;
            color: #ffffff;
          }

          .hover-bg:hover {
            background-color: #f8f9fa;
          }

          .dark-mode .hover-bg:hover {
            background-color: #4a5568;
          }

          .cursor-pointer {
            cursor: pointer;
          }

          .z-3 {
            z-index: 1030;
          }
        `}
      </style>
    </header>
  );
}
