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
    totalPriceOfItem,
    finalTotal,
    totalPrice,
    discount,
    taxRate,
    quantityLoadingId,
    deliveryCharge,
  } = useCartContext();

  const { navigate } = useProductContext();

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
                    // <div
                    //   className="row border-bottom py-3"
                    //   key={item._id}
                    // >
                    //   <div className="col-md-6 col-12 mb-3 mb-md-0 text-center">
                    //     {/* <div className="row align-items-center"> */}
                    //       {/* <div className="col-4 col-sm-3 d-flex justify-content-center"> */}
                    //         <img
                    //           onClick={() =>
                    //             navigate(`/products/${item.productId._id}`)
                    //           }
                    //           src={item?.productId?.profileImage}
                    //           alt={item?.productId?.name}
                    //           className="img-fluid rounded"
                    //           style={{
                    //             width: "100px",
                    //             height: "80px",
                    //             objectFit: "cover",
                    //             cursor: "pointer",
                    //           }}
                    //         />
                    //       </div>

                    //       <div className="col-8 col-12 mb-3 mb-md-0">
                    //         <h6
                    //           className="mb-1 fs-6 fs-sm-5"
                    //           onClick={() =>
                    //             navigate(`/products/${item.productId._id}`)
                    //           }
                    //           style={{ cursor: "pointer" }}
                    //         >
                    //           {item?.productId?.name}
                    //         </h6>

                    //         <span className="text-danger d-block fw-semibold">
                    //           Price: ₹{item?.productId?.price} per item
                    //         </span>

                    //         <button
                    //           className="text-muted d-block btn btn-link p-0 mt-3"
                    //           onClick={() =>
                    //             moveCartToWishlist(item?.productId?._id)
                    //           }
                    //         >
                    //           Move to Wishlist
                    //         </button>

                    //         <button
                    //           className="text-muted btn btn-link p-0"
                    //           onClick={() => removeFromCart(item._id)}
                    //         >
                    //           Remove
                    //         </button>
                    //       </div>
                    //     {/* </div> */}
                    //   {/* </div> */}

                    //   <div className="col-12 col-md-4 mb-4 mb-md-0">
                    //     <div className="d-flex align-items-center gap-2">
                    //       <span className="d-md-none fw-semibold">
                    //         Quantity:{" "}
                    //       </span>

                    //       <div
                    //         className="input-group"
                    //         style={{ width: "135px" }}
                    //       >
                    //         <button
                    //           className="btn btn-outline-dark"
                    //           type="button"
                    //           disabled={
                    //             item?.quantity < 1 ||
                    //             quantityLoadingId === item?._id
                    //           }
                    //           onClick={() =>
                    //             handleQuantityChangeCart(item._id, -1)
                    //           }
                    //         >
                    //           -
                    //         </button>
                    //         <input
                    //           type="number"
                    //           className="form-control text-center"
                    //           value={item?.quantity}
                    //           min={1}
                    //           disabled={item?.quantity === 1}
                    //           max={item?.productId?.stock}
                    //           style={{
                    //             borderColor: "black",
                    //           }}
                    //           onChange={(e) => e.target.value}
                    //         />
                    //         <button
                    //           className="btn btn-outline-dark"
                    //           type="button"
                    //           onClick={() =>
                    //             handleQuantityChangeCart(item._id, 1)
                    //           }
                    //         >
                    //           +
                    //         </button>
                    //       </div>
                    //     </div>
                    //   </div>

                    //   <div className="col-12 col-md-2 mt-2 mt-md-0">
                    //     <div className="text-start text-md-center">
                    //       <span className="text-danger fs-4 fw-semibold">
                    //         <small className="d-md-none">Total Price: </small>₹
                    //         {totalPriceOfItem(item).toFixed(2)}
                    //       </span>
                    //     </div>
                    //   </div>
                    // </div>

                    <div className="row border-bottom py-3" key={item._id}>
                      {/* IMAGE FIRST ON MOBILE */}
                      <div className="col-12 col-md-3 mb-3 mb-md-0 text-center">
                        <img
                          src={item?.productId?.profileImage}
                          alt={item?.productId?.name}
                          onClick={() =>
                            navigate(`/products/${item.productId._id}`)
                          }
                          className="img-fluid rounded"
                          style={{
                            width: "120px",
                            height: "100px",
                            objectFit: "cover",
                            cursor: "pointer",
                          }}
                        />
                      </div>

                      {/* DETAILS BELOW IMAGE ON MOBILE, RIGHT OF IMAGE ON DESKTOP */}
                      <div className="col-12 col-md-5 mb-3 mb-md-0">
                        <h6
                          className="mb-1"
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
                          className="btn btn-link p-0 d-block mt-2 text-muted"
                          onClick={() =>
                            moveCartToWishlist(item?.productId?._id)
                          }
                        >
                          Move to Wishlist
                        </button>

                        <button
                          className="btn btn-link p-0 text-muted"
                          onClick={() => removeFromCart(item._id)}
                        >
                          Remove
                        </button>
                      </div>

                      {/* QUANTITY */}
                      <div className="col-12 col-md-3 mb-3 mb-md-0">
                        <div className="d-flex align-items-center gap-2">
                          <span className="fw-semibold d-md-none">
                            Quantity:
                          </span>

                          <div
                            className="input-group"
                            style={{ width: "135px" }}
                          >
                            <button
                              className="btn btn-outline-dark"
                              disabled={
                                item.quantity < 1 ||
                                quantityLoadingId === item._id
                              }
                              onClick={() =>
                                handleQuantityChangeCart(item._id, -1)
                              }
                            >
                              -
                            </button>

                            <input
                              type="number"
                              className="form-control text-center"
                              value={item.quantity}
                              disabled={item.quantity === 1}
                              readOnly
                            />

                            <button
                              className="btn btn-outline-dark"
                              onClick={() =>
                                handleQuantityChangeCart(item._id, 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* TOTAL PRICE */}
                      <div className="col-12 col-md-1 text-start text-md-center mt-2 mt-md-0">
                        <small className="d-md-none fw-semibold">
                          Total Price:{" "}
                        </small>

                        <span className="text-danger fs-5 fw-semibold">
                          ₹{totalPriceOfItem(item).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="col-lg-4 col-md-5 col-sm-12 mb-4">
              <div
                className="card shadow-sm border-0 sticky-top"
                style={{ top: "20px" }}
              >
                <div className="card-body p-4">
                  <h4 className="text-danger fw-semibold mb-4">
                    Order Summary
                  </h4>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Total Items:</span>
                      <span className="fw-semibold">{cartCount}</span>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <span>Total Price:</span>
                      <span className="fw-semibold">
                        ₹{totalPrice.toFixed(2)}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <span>Discount:</span>
                      <span className="text-success fw-semibold">
                        -₹{discount}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <span>Tax ({taxRate === 0.05 ? "5%" : "3%"}):</span>
                      <span className="fw-semibold">
                        ₹{(totalPrice * taxRate).toFixed(2)}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                      <span>Delivery:</span>
                      <span
                        className={
                          deliveryCharge === 0
                            ? "text-success fw-semibold"
                            : "fw-semibold"
                        }
                      >
                        {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                      </span>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-between mb-3">
                      <span className="fw-bold fs-5">Grand Total:</span>
                      <span className="text-danger fw-bold fs-5">
                        ₹{finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      type="button"
                      onClick={() => navigate("/checkout")}
                      className="btn text-white fw-semibold py-2"
                      style={{
                        backgroundColor: "#f11c58ff",
                        borderRadius: "8px",
                        border: "none",
                        fontSize: "1.1rem",
                      }}
                    >
                      Proceed to Checkout
                    </button>
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
          </div>
        </div>
      </main>
    </>
  );
}
