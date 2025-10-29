import { useCartContext } from "../context/Cart.context";
import { useProductContext } from "../context/Products.context";

export default function CartProductsComponent() {
  const {
    cart,
    cartError,
    cartCount,
    removeFromCart,
    cartLoading,
    handleQuantityChangeCart,
    moveCartToWishlist,
  } = useCartContext();

  const { navigate } = useProductContext();

  const totalPriceOfItem = (item) => {
    return item?.productId?.price * item?.quantity;
  };

  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.productId.price * curr.quantity,
    0
  );

  const discount = totalPrice > 30 ? 10 : 5;

  const taxRate = totalPrice > 30 ? 0.05 : 0.03;

  const tax = totalPrice * taxRate;

  const deliveryCharge = totalPrice > 30 ? 0 : 5;

  const finalTotal = totalPrice - discount + tax + deliveryCharge;

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

  if (!cart || cart.length === 0) {
    return (
      <main>
        <div className="text-center py-5">
          <strong className="d-block fs-5 mb-3">Your Cart is Empty!</strong>
          <button
            className="btn btn-outline-danger"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="container py-4 mb-5">
        <div className="py-2 mb-3">
          <h2
            className="text-center text-md-start"
            style={{ color: "#f11c58ff" }}
          >
            My Cart
          </h2>
          <hr
            className="mx-auto"
            style={{ borderTop: "1px solid #f11c58ff" }}
          />
        </div>

        <div className="container mt-4">
          <div className="row g-5">
            <div className="col-lg-8 col-md-7 col-sm-12 mb-4">
              <h4>
                Cart Products ({cartCount}
                {cartCount > 1 ? " Items" : " Item"})
              </h4>

              {cart && cart.length > 0 && (
                <div className="mt-4">
                  <div className="row border-bottom py-2 d-none d-md-flex">
                    <div className="col-md-4 text-center">
                      <strong>Item's Details</strong>
                    </div>

                    <div className="col-md-6 text-center">
                      <strong>Quantity</strong>
                    </div>

                    <div className="col-md-2 text-center">
                      <strong>Total Price</strong>
                    </div>
                  </div>

                  {cart.map((item) => (
                    <div
                      className="row border-bottom py-3 align-items-center"
                      key={item._id}
                    >
                      <div className="col-md-6 col-12 mb-3 mb-md-0">
                        <div className="row align-items-center">
                          <div className="col-4 col-sm-3 d-flex justify-content-center">
                            <img
                              onClick={() =>
                                navigate(`/products/${item.productId._id}`)
                              }
                              src={item?.productId?.profileImage}
                              alt={item?.productId?.name}
                              className="img-fluid rounded"
                              style={{
                                width: "100px",
                                height: "80px",
                                objectFit: "cover",
                                cursor: "pointer",
                              }}
                            />
                          </div>

                          <div className="col-8 col-sm-9">
                            <h6
                              className="mb-1 fs-6 fs-sm-5"
                              onClick={() =>
                                navigate(`/products/${item.productId._id}`)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              {item?.productId?.name}
                            </h6>

                            <span className="text-danger d-block fw-semibold">
                              Price: ₹{item?.productId?.price} per item
                            </span>

                            <button
                              className="text-muted btn btn-link p-0 mt-3"
                              onClick={() =>
                                moveCartToWishlist(item?.productId?._id)
                              }
                            >
                              Move to Wishlist
                            </button>

                            <button
                              className="text-muted btn btn-link p-0 mt-3 ms-4"
                              onClick={() => removeFromCart(item._id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-md-4 mb-3 mb-md-0">
                        <div className="d-flex justify-content-center justify-content-md-start">
                          <div
                            className="input-group"
                            style={{ width: "135px" }}
                          >
                            <button
                              className="btn btn-outline-dark"
                              type="button"
                              disabled={item?.quantity < 1}
                              onClick={() =>
                                handleQuantityChangeCart(item._id, -1)
                              }
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="form-control text-center"
                              value={item?.quantity}
                              min={1}
                              disabled={item?.quantity === 1}
                              max={item?.productId?.stock}
                              style={{
                                borderColor: "black",
                              }}
                              onChange={(e) => e.target.value}
                            />
                            <button
                              className="btn btn-outline-dark"
                              type="button"
                              onClick={() =>
                                handleQuantityChangeCart(item._id, 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="col-2 col-md-2">
                        <div className="text-center text-md-center">
                          <span className="text-danger fs-4 fw-semibold">
                            ₹{totalPriceOfItem(item).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="col-lg-4 col-md-5 col-sm-12 mb-4">
              <div className="card py-1 mt-3 shadow-sm">
                <div className="card-body">
                  <div className="card-text">
                    <h4 className="text-danger fw-semibold">Order Summary</h4>
                    <hr />

                    <div>
                      <strong className="float-start">Total Items: </strong>
                      <span className="float-end">{cartCount}</span>

                      <br />

                      <strong className="float-start">Total Price: </strong>
                      <span className="float-end">
                        ₹{totalPrice.toFixed(2)}
                      </span>

                      <br />

                      <strong className="float-start">Discount: </strong>
                      <span className="float-end">₹{discount}</span>

                      <br />

                      <strong className="float-start">Tax: </strong>
                      <span className="float-end">
                        {taxRate === 0.05 ? "5%" : "3%"}
                      </span>

                      <br />

                      <strong className="float-start">Delivery Charge: </strong>
                      <span className="float-end">
                        {deliveryCharge === 0 ? (
                          <span className="text-success fw-semibold">FREE</span>
                        ) : (
                          `₹${deliveryCharge}`
                        )}
                      </span>

                      <br />
                      <hr />

                      <strong className="float-start fs-5">Grand Total:</strong>
                      <span className="float-end fw-bold fs-5">
                        ₹{finalTotal.toFixed(2)}
                      </span>
                    </div>
                    <br />
                    <hr />

                    <div className="d-grid gap-2">
                      <button type="button" className="btn btn-danger">
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-4">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => navigate("/products")}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
