import { Link } from "react-router-dom";
import Logo from "/logo.jpg";

export default function AboutUsComponent() {
  return (
    <main className="container py-4">
      <div className="py-2">
        <h2
          className="text-center text-md-start"
          style={{ color: "#f11c58ff" }}
        >
          About Glowora
        </h2>
        <hr className="mx-auto" style={{ borderTop: "1px solid #f11c58ff" }} />
      </div>

      {/* Hero Section */}
      <section className="mb-5 mt-3">
        <div className="row align-items-center">
          <div className="col-lg-6">
            {/* <h1
              className="fw-bold display-4 mb-3"
              style={{ color: "#f11c58ff" }}
            >
              About Glowora
            </h1> */}

            <h2 className="h3 mb-4 text-muted">Aura of You</h2>
            <p className="lead mb-4">
              Welcome to Glowora, where beauty meets authenticity. We believe
              that every individual has a unique aura, and our mission is to
              help you discover and enhance your natural glow.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="ratio ratio-16x9">
              <div
                className="rounded-4 d-flex align-items-center justify-content-center"
                style={{ backgroundColor: "#f71a59ff" }}
              >
                {/* <i
                  className="fas fa-spa display-1"
                  style={{ color: "#f11c58ff" }}
                ></i> */}

                <img src={Logo} alt="App Logo" className="img-fluid rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-4 bg-light rounded-4 my-5">
        <div className="text-center mb-4">
          <h3 className="fw-bold mb-3" style={{ color: "#f11c58ff" }}>
            Our Story
          </h3>
          <hr
            className="mx-auto"
            style={{ width: "100px", borderTop: "3px solid #f11c58ff" }}
          />
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 bg-transparent">
              <div className="card-body text-center">
                <p className="mb-4 fs-5">
                  Founded with a passion for authentic beauty, Glowora emerged
                  from the simple idea that everyone deserves access to genuine,
                  high-quality beauty products that celebrate their
                  individuality.
                </p>
                <p className="mb-4 fs-5">
                  Our journey began with a small collection of carefully curated
                  products and has grown into a trusted destination for beauty
                  enthusiasts who value quality, authenticity, and exceptional
                  customer experience.
                </p>
                <p className="mb-0 fs-5">
                  Today, we continue to uphold our commitment to sourcing only
                  the finest products while maintaining the personal touch that
                  makes Glowora special.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-4">
        <div className="text-center mb-4">
          <h3 className="fw-bold mb-3" style={{ color: "#f11c58ff" }}>
            Our Values
          </h3>
          <hr
            className="mx-auto"
            style={{ width: "100px", borderTop: "3px solid #f11c58ff" }}
          />
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm text-center hover-card">
              <div className="card-body p-4">
                <div className="mb-3">
                  <i
                    className="fas fa-gem fa-2x"
                    style={{ color: "#f11c58ff" }}
                  ></i>
                </div>
                <h5 className="fw-bold mb-3">Authenticity</h5>
                <p className="mb-0">
                  Every product is carefully vetted to ensure 100% authenticity
                  and quality.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm text-center hover-card">
              <div className="card-body p-4">
                <div className="mb-3">
                  <i
                    className="fas fa-heart fa-2x"
                    style={{ color: "#f11c58ff" }}
                  ></i>
                </div>
                <h5 className="fw-bold mb-3">Customer Care</h5>
                <p className="mb-0">
                  Your satisfaction is our priority. We're here to support your
                  beauty journey.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm text-center hover-card">
              <div className="card-body p-4">
                <div className="mb-3">
                  <i
                    className="fas fa-star fa-2x"
                    style={{ color: "#f11c58ff" }}
                  ></i>
                </div>
                <h5 className="fw-bold mb-3">Quality</h5>
                <p className="mb-0">
                  We never compromise on quality, offering only the best
                  products for our customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 text-center">
        <div
          className="card border-0 text-white py-5 rounded-4"
          style={{ backgroundColor: "#f9225fff" }}
        >
          <div className="card-body">
            <h3 className="fw-bold mb-3">Ready to Discover Your Glow?</h3>
            <p className="mb-4 fs-5">
              Explore our collection and find products that enhance your natural
              aura.
            </p>
            <Link
              to="/products"
              className="btn btn-light btn-lg fw-semibold px-4"
              style={{ color: "#f11c58ff" }}
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      <style>
        {`
                    .hover-card:hover {
                      transform: translateY(-5px);
                      transition: transform 0.3s ease;
                      cursor: pointer;
                    }
                  `}
      </style>
    </main>
  );
}
