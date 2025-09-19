import { useCartContext } from "../context/Cart.context";
import { useProductContext } from "../context/Products.context";
import { useWishlistsContext } from "../context/Wishlists.context";
import { useNavigate } from "react-router-dom";

export default function CartProductsComponent() {
  const navigate = useNavigate();
  const {
    cart,
    cartLoading,
    cartError,
    removeFromCart,
    updateCartQuantity,
  } = useCartContext();

  const {
    wishlistLoading,
    isWishlisted,
    wishlistError,
    wishlistHandler,
  } = useWishlistsContext();

  const totalPrice = cart?.data?.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );
  const discount = 50; // Could be dynamic
  const deliveryCharge = totalPrice > 0 ? 30 : 0;
  const totalAmount = totalPrice - discount + deliveryCharge;

  if (cartLoading) {
    return (
      <main className="container vh-100 d-flex flex-column justify-content-center align-items-center text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-4 fs-4 fw-semibold">Loading your cart...</p>
      </main>
    );
  }

  if (cartError) {
    return (
      <main className="container py-5 text-center">
        <div className="alert alert-danger">
          An error occurred while loading your cart
        </div>
      </main>
    );
  }

  return (
    <main className="container py-4 mb-5">
      <div className="py-2 mb-3">
        <h2 className="text-center text-md-start" style={{ color: "#f11c58ff" }}>
          My Cart
        </h2>
        <hr className="mx-auto" style={{ borderTop: "1px solid #f11c58ff" }} />
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <h3 className="mb-5 py-2 border-bottom">
            Cart Products ({cart?.data?.length || 0})
          </h3>

          {cart?.data && cart?.data.length > 0 ? (
            <div className="row">
              {/* Products List */}
              <div className="col-lg-8 col-md-7">
                {cart.data.map((item) => (
                  <div key={item._id} className="card mb-3">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-3 col-md-2">
                          <img
                            src={item.productId.profileImage}
                            alt={item.productId.name}
                            className="img-fluid rounded"
                            style={{ objectFit: "cover", height: "100px" }}
                          />
                        </div>

                        <div className="col-9 col-md-10">
                          <div className="row">
                            <div className="col-md-6">
                              <h5 className="card-title">{item.productId.name}</h5>
                              <p className="card-text mb-1">
                                ₹{item.productId.price} | {item.productId.brand}
                              </p>
                              <small className="text-muted">
                                {item.productId.description.country}
                              </small>

                              <div className="mt-3 d-flex gap-2">
                                <button
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => removeFromCart(item._id)}
                                >
                                  Remove
                                </button>

                                <button
                                  className="btn btn-outline-secondary btn-sm"
                                  disabled={wishlistLoading === item.productId._id}
                                  onClick={() => wishlistHandler(item.productId._id)}
                                  aria-label={
                                    isWishlisted(item.productId._id)
                                      ? "Remove from wishlist"
                                      : "Add to wishlist"
                                  }
                                >
                                  {wishlistLoading === item.productId._id ? (
                                    <div
                                      className="spinner-border spinner-border-sm"
                                      role="status"
                                    ></div>
                                  ) : (
                                    <i
                                      className={`${
                                        isWishlisted(item.productId._id) ? "fas" : "far"
                                      } fa-heart`}
                                      style={{
                                        color: isWishlisted(item.productId._id)
                                          ? "#f11c58ff"
                                          : "#6c757d",
                                      }}
                                    ></i>
                                  )}
                                </button>
                              </div>
                            </div>

                            <div className="col-md-3 mt-3 mt-md-0">
                              <div className="input-group" style={{ width: "130px" }}>
                                <button
                                  className="btn btn-outline-dark"
                                  type="button"
                                  disabled={item.quantity <= 1}
                                  onClick={() => updateCartQuantity(item._id, item.quantity - 1)}
                                 >
                                  -
                                </button>
                                <input
                                  type="number"
                                  className="form-control text-center"
                                  value={item.quantity}
                                  min="1"
                                  max={item.productId.stock}
                                  onChange={(e) => {
                                    const newQuantity = parseInt(e.target.value) || 1;
                                    if (newQuantity <= item.productId.stock) {
                                      updateCartQuantity(item._id, newQuantity);
                                    }
                                  }}
                                />
                                <button
                                  className="btn btn-outline-dark"
                                  type="button"
                                  disabled={item.quantity >= item.productId.stock}
                                  onClick={() => updateCartQuantity(item._id, item.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>
                              {item.quantity >= item.productId.stock && (
                                <small className="text-danger d-block mt-1">
                                  Max stock reached
                                </small>
                              )}
                            </div>

                            <div className="col-md-3 text-md-end mt-3 mt-md-0">
                              <h5 className="text-danger">
                                ₹{(item.productId.price * item.quantity).toFixed(2)}
                              </h5>
                              {item.quantity > 1 && (
                                <small className="text-muted">
                                  ₹{item.productId.price} each
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="col-lg-4 col-md-5">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-danger mb-4">Order Summary</h5>
                    
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal ({cart.data.length} items)</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    
                    <div className="d-flex justify-content-between mb-2 text-success">
                      <span>Discount</span>
                      <span>- ₹{discount.toFixed(2)}</span>
                    </div>
                    
                    <div className="d-flex justify-content-between mb-2">
                      <span>Delivery</span>
                      <span>₹{deliveryCharge.toFixed(2)}</span>
                    </div>
                    
                    <hr />
                    
                    <div className="d-flex justify-content-between mb-4 fw-bold fs-5">
                      <span>Total Amount</span>
                      <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                    
                    <button className="btn btn-danger w-100 py-2">
                      Proceed to Checkout
                    </button>
                    
                    <div className="text-center mt-3">
                      <button
                        onClick={() => navigate("/products")}
                        className="btn btn-outline-dark btn-sm"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="alert alert-info">
                <i className="fas fa-shopping-cart fa-2x mb-3"></i>
                <h4>Your cart is empty</h4>
                <p>Start adding products to your cart!</p>
              </div>
              <button
                onClick={() => navigate("/products")}
                className="btn text-white mt-3"
                style={{ backgroundColor: "#f11c58ff" }}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}