import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function ContactComponent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <main className="container py-4">
        <div className="py-2">
          <h2
            className="text-center text-md-start"
            style={{ color: "#f11c58ff" }}
          >
            Contact Us
          </h2>
          <hr
            className="mx-auto"
            style={{ borderTop: "1px solid #f11c58ff" }}
          />
        </div>
        {/* Hero Section */}
        <section className="mb-5 mt-1">
          <div className="text-start">
            <p className="lead mb-4">
              We'd love to hear from you. Get in touch with any questions or
              feedback!
            </p>
          </div>
        </section>

        {/* Contact Info & Form Section */}
        <section className="py-4">
          <div className="row g-5  d-flex justify-content-center">
            {/* Contact Information */}
            <div className="col-lg-5 col-md-6 col-12">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h3 className="fw-bold mb-4" style={{ color: "#f11c58ff" }}>
                    Get In Touch
                  </h3>

                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3">
                        <i
                          className="fas fa-map-marker-alt fa-lg"
                          style={{ color: "#f11c58ff" }}
                        ></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Address</h6>
                        <p className="mb-0 text-muted">
                          123 Beauty Street
                          <br />
                          Cosmetic City, CC 12345
                          <br />
                          India
                        </p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3">
                        <i
                          className="fas fa-phone fa-lg"
                          style={{ color: "#f11c58ff" }}
                        ></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Phone</h6>
                        <p className="mb-0 text-muted">+91 123456789</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3">
                        <i
                          className="fas fa-envelope fa-lg"
                          style={{ color: "#f11c58ff" }}
                        ></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Email</h6>
                        <p className="mb-0 text-muted">support@glowora.com</p>
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <i
                          className="fas fa-clock fa-lg"
                          style={{ color: "#f11c58ff" }}
                        ></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">Business Hours</h6>
                        <p className="mb-0 text-muted">
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Saturday: 10:00 AM - 4:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h6 className="fw-bold mb-3">Follow Us</h6>
                    <div className="d-flex gap-3">
                      <a href="#" className="text-decoration-none">
                        <i
                          className="fab fa-facebook fa-lg"
                          style={{ color: "#f11c58ff" }}
                        ></i>
                      </a>
                      <a href="#" className="text-decoration-none">
                        <i
                          className="fab fa-instagram fa-lg"
                          style={{ color: "#f11c58ff" }}
                        ></i>
                      </a>
                      <a href="#" className="text-decoration-none">
                        <i
                          className="fab fa-twitter fa-lg"
                          style={{ color: "#f11c58ff" }}
                        ></i>
                      </a>
                      <a href="#" className="text-decoration-none">
                        <i
                          className="fab fa-pinterest fa-lg"
                          style={{ color: "#f11c58ff" }}
                        ></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            {/* <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <h3 className="fw-bold mb-4" style={{ color: "#f11c58ff" }}>
                    Send us a Message
                  </h3>

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label
                          htmlFor="name"
                          className="form-label fw-semibold"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                        />
                      </div>

                      <div className="col-md-6">
                        <label
                          htmlFor="email"
                          className="form-label fw-semibold"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div className="col-12">
                        <label
                          htmlFor="subject"
                          className="form-label fw-semibold"
                        >
                          Subject *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="What is this regarding?"
                        />
                      </div>

                      <div className="col-12">
                        <label
                          htmlFor="message"
                          className="form-label fw-semibold"
                        >
                          Message *
                        </label>
                        <textarea
                          className="form-control"
                          id="message"
                          name="message"
                          rows="5"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Tell us how we can help you..."
                        ></textarea>
                      </div>

                      <div className="col-12">
                        <button
                          type="submit"
                          className="btn text-light fw-semibold w-100 py-2"
                          style={{
                            backgroundColor: "#f11c58ff",
                            border: "none",
                          }}
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div> */}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-4 bg-light rounded-4 my-5">
          <div className="text-center mb-4">
            <h3 className="fw-bold mb-3" style={{ color: "#f11c58ff" }}>
              Frequently Asked Questions
            </h3>
            <hr
              className="mx-auto"
              style={{ width: "100px", borderTop: "3px solid #f11c58ff" }}
            />
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item border-0 mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed fw-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq1"
                      style={{ backgroundColor: "transparent" }}
                    >
                      What is your return policy?
                    </button>
                  </h2>
                  <div
                    id="faq1"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body text-muted">
                      We offer a 15-day return policy for all unused products in
                      their original packaging. Please contact us within 15 days
                      of delivery to initiate a return.
                    </div>
                  </div>
                </div>

                <div className="accordion-item border-0 mb-3">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed fw-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq2"
                      style={{ backgroundColor: "transparent" }}
                    >
                      Do you offer international shipping?
                    </button>
                  </h2>
                  <div
                    id="faq2"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body text-muted">
                      Currently, we only ship within India. We're working on
                      expanding our shipping options to serve international
                      customers in the future.
                    </div>
                  </div>
                </div>

                <div className="accordion-item border-0">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed fw-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq3"
                      style={{ backgroundColor: "transparent" }}
                    >
                      How can I track my order?
                    </button>
                  </h2>
                  <div
                    id="faq3"
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body text-muted">
                      Once your order is shipped, you'll receive a tracking
                      number via email and SMS. You can use this number to track
                      your order on our website or the courier partner's
                      website.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
