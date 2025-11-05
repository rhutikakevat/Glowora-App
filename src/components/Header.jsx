import logo from "/logo.jpg";
import { NavLink } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { useWishlistsContext } from "../context/Wishlists.context";
import { useCartContext } from "../context/Cart.context";

export default function Header() {
  const { wishlistCount } = useWishlistsContext();
  const { cartCount } = useCartContext();

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow mb-3 py-2">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand me-4 me-lg-5 ms-3 ">
            <img
              src={logo}
              className="logo img-fluid rounded"
              style={{ width: "150px" }}
              alt="Glowora Logo"
            />
          </NavLink>

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
            <div
              className="d-none d-lg-flex align-items-center me-auto"
              style={{ width: "30%" }}
            >
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  aria-label="Search products"
                  style={{ borderColor: "#b40c3cff", fontFamily: "cursive" }}
                />
                <button className="btn btn-outline-danger" type="button">
                  <FaSearch />
                </button>
              </div>
            </div>

            <ul className="navbar-nav mb-2 mb-lg-0 fw-semibold fs-6">
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

              <li className="nav-item ms-3 me-4">
                <NavLink to="/profile" className="nav-link">
                  <FaUser size={15} className="me-1" />
                  Profile
                </NavLink>
              </li>
            </ul>

            <div className="d-lg-none mt-3 ms-3 me-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  aria-label="Search products"
                />
                <button className="btn btn-outline-secondary" type="button">
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
