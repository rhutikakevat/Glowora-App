import logo from "/logo.jpg";
import { NavLink } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { useWishlistsContext } from "../context/Wishlists.Context";

export default function Header() {
  const { wishlistCount } = useWishlistsContext()
  const cartCount = 5;
  // Change after have original count  

    return (
        <header>
            <nav className="navbar navbar-expand-lg py-2 shadow mb-3">
                <div className="container-fluid">

                    <NavLink to="/" className="navbar-brand me-4 me-lg-5 ms-3">
                        <img
                            src={logo}
                            className="logo img-fluid rounded"
                            style={{ width: "150px" }}
                            alt="Glowora Logo"
                        />
                    </NavLink>                    

                    <div className="d-none d-lg-flex align-items-center justify-content-center mx-auto" 
                    style={{ width: "30%"}}>

                        <div className="input-group"> 
                            <input
                                type="text"
                                className="form-control ms-5"
                                placeholder= "Search products..."
                                aria-label="Search products"
                                style={{borderColor:"#b40c3cff", fontFamily:"cursive"}}
                            />
                            <button className="btn btn-outline-danger" type="button">
                               <FaSearch />
                            </button>
                        </div>
                    </div>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                   
                    <div
                        className="offcanvas offcanvas-start"
                        tabIndex="-1"
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                    >
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Navigation Pages</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="offcanvas-body">
                          
                            <div className="d-lg-none align-items-center mb-3">
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

                            <ul className="navbar-nav justify-content-end fw-semibold flex-grow-1 pe-5 fs-6">

                                <li className="nav-item">
                                    <NavLink to="/products" className="nav-link ms-3" aria-current="page"><GiCardboardBoxClosed size={20}/> Products</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/wishlist" className="nav-link position-relative ms-3"><FaHeart size={18}/> Wishlist
                                      {wishlistCount > 0 && (
                                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                              
                                          >
                                            {wishlistCount}
                                          </span>
                                      )}
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink to="/cart" className="nav-link position-relative ms-3"><FaShoppingCart size={18}/> Cart
                                    {cartCount >0 && (
                                          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                              
                                          >
                                            {cartCount}
                                          </span>
                                    )}
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink to="/profile" className="nav-link  ms-3"><FaUser size={15}/> Profile</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}