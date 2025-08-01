import logo from "/logo.jpg";
import { NavLink } from "react-router-dom";

export default function Header(){
    return (
        <header>
        <nav className="navbar navbar-expand-lg py-2" style={{backgroundColor:"pink"}}>
          <div className="container-fluid">
           
            <NavLink to="/" className="navbar-brand me-4 me-lg-5 ms-3">
              <img 
                src={logo} 
                className="logo img-fluid rounded" 
                style={{width: "150px"}} 
                alt="Glowora Logo" 
              />
            </NavLink>

          

            <button 
              className="navbar-toggler ms-auto" 
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
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Products Pages</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  data-bs-dismiss="offcanvas" 
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-start fw-semibold flex-grow-1 pe-3 fs-5">
                  <li className="nav-item">
                    <NavLink to="/" className="nav-link" aria-current="page">Home</NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink to="/products?category=Makeup" className="nav-link" aria-current="page">Products</NavLink>
                  </li>

                  {/* Add more nav items here */}
                  {/* change for make e-commerce page nav*/}
                  {/* add active link feature */}
                  
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    )
}