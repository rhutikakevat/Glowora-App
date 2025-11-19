import { useAddressesContext } from "../context/Address.context";
import { useUsersProfileContext } from "../context/User.context";
import { useCartContext } from "../context/Cart.context";
import { useProductContext } from "../context/Products.context";
import { AiFillHome } from "react-icons/ai";
import { useOrderContext } from "../context/Order.context";

export default function CheckoutComponent() {
  const {
    addresses,
    addressLoading,
    addressError,
    fetchAddressesError,
    fetchAddressesLoading,
    showCreateAddress,
    setShowCreateAddress,
    removeAddressHandler,
    isEditing,
    resetForm,
    submitError,
    changeHandler,
    submitHandler,
    handleEdit,
    handleCancel,
    handleSetDefault,
    formData,
    currentUser,
  } = useAddressesContext();

  const { usersLoading, usersError } = useUsersProfileContext();

  const {
    cart,
    totalPriceOfItem,
    cartCount,
    totalPrice,
    discount,
    taxRate,
    deliveryCharge,
    finalTotal,
  } = useCartContext();

  const { navigate } = useProductContext();

  const {
    selectedAddressId,
    selectedPaymentMethod,
    handlePlaceOrder,
    orderLoading,
    showOrderSuccess,
    closeOrderSuccess,
    orderError,
    onSelectAddressId,
    onPaymentMethodChange,
  } = useOrderContext();

  if (addressLoading || fetchAddressesLoading || usersLoading || orderLoading) {
    return (
      <main className="container vh-100 d-flex flex-column justify-content-center align-items-center text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-4 fs-4 fw-semibold">
          {orderLoading
            ? "Placing your order..."
            : "Loading your checkout products..."}
        </p>
      </main>
    );
  }

  if (addressError || fetchAddressesError || usersError) {
    return (
      <main className="container py-5 text-center">
        <div className="alert alert-danger">
          An error occurred while loading your checkout product's data
        </div>

        <button
          className="btn btn-primary mt-3"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </main>
    );
  }

  if (showOrderSuccess) {
    return (
      <div
        className="modal show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* <div className="modal-header border-0">
              <h6 className="modal-title">
                Placed Order Deatils
              </h6>
            </div> */}

            <div className="modal-body text-center mt-4">
              <div className="mb-3">
                <i
                  className="fas fa-check-circle text-success"
                  style={{ fontSize: "4rem" }}
                ></i>
              </div>

              <span className="d-block  text-success fw-bold mb-3">
                Order Placed Successfully!
              </span>
              <span className="d-block fw-semibold">
                Your order has been placed successfully.
              </span>
              <span className="d-block fw-semibold">
                You will be redirected shortly...
              </span>
            </div>

            <div className="modal-footer border-0 justify-content-center">
              <button
                type="button"
                className="btn btn-danger mb-3 mt-2"
                onClick={() => {
                  closeOrderSuccess();
                  navigate("/orders");
                }}
              >
                View Placed Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <main>
        <div className="text-center py-5">
          <strong className="d-block fs-5 mb-3">There is no checkout's product</strong>
          <strong className="d-block mb-5">
            For Placed order, We required cart products
          </strong>
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
    <main className="container py-4 mb-5">
      <div className="py-2 mb-4">
        <h2
          className="text-center text-md-start"
          style={{ color: "#f11c58ff" }}
        >
          My Checkout & Payment
        </h2>
        <hr className="mx-auto" style={{ borderTop: "1px solid #f11c58ff" }} />
      </div>

      <div className="row">
        {/* Left Column - Address & Payment */}

        <div className="col-lg-8 col-md-7">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="m-0" style={{ color: "#f11c58ff" }}>
                  Delivery Address
                </h4>
                <button
                  className="btn btn-sm text-white fw-semibold"
                  onClick={() => {
                    resetForm();
                    setShowCreateAddress(!showCreateAddress);
                  }}
                  style={{
                    backgroundColor: "#f11c58ff",
                    borderRadius: "8px",
                    padding: "8px 16px",
                  }}
                >
                  {showCreateAddress ? "Cancel" : "Add New Address"}
                </button>
              </div>

              {(showCreateAddress || isEditing) && (
                <div className="card border-0 bg-light mb-4">
                  <div className="card-body">
                    <h5 className="mb-3">
                      {isEditing ? "Edit Address" : "Add New Address"}
                    </h5>

                    {submitError && (
                      <div className="alert alert-danger">{submitError}</div>
                    )}

                    <form onSubmit={submitHandler}>
                      <div className="row g-3">
                        <div className="col-12">
                          <label
                            className="form-label fw-semibold"
                            htmlFor="fullNameInput"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="fullNameInput"
                            className="form-control"
                            name="fullName"
                            value={formData.fullName}
                            onChange={changeHandler}
                            required
                          />
                        </div>
                        <div className="col-12">
                          <label
                            className="form-label fw-semibold"
                            htmlFor="streetInput"
                          >
                            Street
                          </label>
                          <input
                            type="text"
                            name="street"
                            id="streetInput"
                            className="form-control"
                            value={formData.street}
                            onChange={changeHandler}
                            required
                          />
                        </div>

                        <div className="col-12">
                          <label
                            className="form-label fw-semibold"
                            htmlFor="landmarkInput"
                          >
                            Landmark
                          </label>
                          <input
                            type="text"
                            name="landmark"
                            id="landmarkInput"
                            className="form-control"
                            value={formData.landmark}
                            onChange={changeHandler}
                          />
                        </div>

                        <div className="col-md-6">
                          <label
                            className="form-label fw-semibold"
                            htmlFor="cityInput"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            id="cityInput"
                            value={formData.city}
                            onChange={changeHandler}
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label
                            className="form-label fw-semibold"
                            htmlFor="stateInput"
                          >
                            State
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="state"
                            id="stateInput"
                            value={formData.state}
                            onChange={changeHandler}
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label
                            className="form-label fw-semibold"
                            htmlFor="countryInput"
                          >
                            Country
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="country"
                            id="countryInput"
                            value={formData.country}
                            onChange={changeHandler}
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label
                            className="form-label fw-semibold"
                            htmlFor="zipCodeInput"
                          >
                            Zipcode
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="zipCode"
                            id="zipCodeInput"
                            value={formData.zipCode}
                            onChange={changeHandler}
                            pattern="[0-9]{6}"
                            placeholder="Enter 6-digit zip code"
                            required
                          />
                        </div>

                        <div className="col-12">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="isDefault"
                              id="isDefaultInput"
                              checked={formData.isDefault}
                              onChange={changeHandler}
                            />
                            <label
                              className="form-check-label fw-semibold"
                              htmlFor="isDefaultInput"
                            >
                              Set as default address
                            </label>
                          </div>
                        </div>

                        <div className="col-12 d-flex gap-2 pt-2">
                          <button
                            type="submit"
                            className="btn text-white fw-semibold"
                            style={{
                              backgroundColor: "#f11c58ff",
                            }}
                          >
                            {isEditing ? "Update Address" : "Save Address"}
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <h5 className="mb-3">Saved Addresses</h5>

              {addresses && addresses?.length > 0 ? (
                <div className="row g-3">
                  {addresses?.map((address) => (
                    <div className="col-12" key={address._id}>
                      <div
                        className={`card border-0 shadow-sm ${
                          selectedAddressId === address._id
                            ? "bord-primary"
                            : ""
                        }`}
                        style={{
                          cursor: "pointer",
                          border:
                            selectedAddressId === address._id
                              ? "2px solid #007bff"
                              : "1px solid #dee2e6",
                        }}
                        onClick={() => onSelectAddressId(address._id)}
                      >
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h6 className="card-title mb-1">
                              {address.fullName || address?.userId?.name}
                              {selectedAddressId === address._id && (
                                <span className="badge bg-primary ms-2">
                                  Selected
                                </span>
                              )}
                            </h6>
                            {address.isDefault && (
                              <span
                                className="badge text-white"
                                style={{ backgroundColor: "#f30a4cff" }}
                              >
                                Default
                              </span>
                            )}
                          </div>

                          <p className="card-text mb-3">
                            <AiFillHome />{" "}
                            <span>
                              {address.street},{" "}
                              {address.landmark && `${address.landmark}, `}
                              {address.city}, {address.state}, {address.country}{" "}
                              - {address.zipCode}
                            </span>
                          </p>

                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => handleEdit(address)}
                              disabled={addressLoading}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => removeAddressHandler(address._id)}
                              disabled={addressLoading}
                            >
                              Delete
                            </button>

                            {!address.isDefault && (
                              <button
                                className="btn btn-outline-success btn-sm"
                                onClick={() =>
                                  handleSetDefault(
                                    currentUser?._id,
                                    address._id
                                  )
                                }
                                disabled={addressLoading}
                              >
                                Set as Default
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="alert alert-info">
                    No saved addresses found. Please add an address to continue.
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4">
              <h4 className="mb-3" style={{ color: "#f11c58ff" }}>
                Payment Method
              </h4>
              <select
                name="payment"
                id="paymentMethod"
                value={selectedPaymentMethod}
                onChange={(e) => onPaymentMethodChange(e.target.value)}
                className="form-select mb-2"
                style={{ borderRadius: "8px", padding: "10px" }}
                required
              >
                <option value="">Select Payment Method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="UPI ID/QR Code">UPI ID/QR Code</option>
                <option value="Net Banking">Net Banking</option>
                <option value="Cash on Delivery (COD)">
                  Cash on Delivery "(COD)"
                </option>
              </select>
            </div>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h4 className="mb-2" style={{ color: "#f11c58ff" }}>
                Order Items ({cart.length})
              </h4>

              {cart.map((item) => (
                <div className="row py-3 align-items-center" key={item._id}>
                  <hr className="mb-5" />
                  <div className="col-md-2 col-4">
                    <img
                      onClick={() =>
                        navigate(`/products/${item.productId._id}`)
                      }
                      src={item?.productId?.profileImage}
                      alt={item?.productId?.name}
                      className="img-fluid rounded"
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  </div>

                  <div className="col-md-6 col-8">
                    <h6
                      className="mb-1 fw-bold"
                      onClick={() =>
                        navigate(`/products/${item.productId._id}`)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {item?.productId?.name}
                    </h6>
                    <p className="mb-0 mt-3">
                      Price: ₹{item?.productId?.price}
                    </p>
                    <p className="mb-0">
                      Quantity: {item?.quantity}
                      {item?.quantity > 1 ? " Items" : " Item"}
                    </p>
                  </div>

                  <div className="col-md-4 col-12 mt-2 mt-md-0">
                    <div className="text-sm-center">
                      <span className="text-danger fs-5 fw-bold">
                        <small className="text-muted">Total Price: </small>₹
                        {totalPriceOfItem(item).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="col-lg-4 col-md-5">
          <div
            className="card shadow-sm border-0 sticky-top"
            style={{ top: "20px" }}
          >
            <div className="card-body p-4">
              <h4 className="text-danger fw-semibold mb-4">Order Summary</h4>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Total Items:</span>
                  <span className="fw-semibold">{cartCount}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Total Price:</span>
                  <span className="fw-semibold">₹{totalPrice.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Discount:</span>
                  <span className="text-success fw-semibold">-₹{discount}</span>
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

              {orderError && (
                <div className="alert alert-danger mb-3" role="alert">
                  {orderError}
                </div>
              )}

              <div className="d-grid gap-2">
                <button
                  onClick={handlePlaceOrder}
                  type="button"
                  className="btn text-white fw-semibold py-2"
                  style={{
                    backgroundColor: "#f11c58ff",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "1.1rem",
                  }}
                  disabled={
                    orderLoading ||
                    !addresses ||
                    addresses.length === 0 ||
                    !selectedPaymentMethod
                  }
                >
                  {orderLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Placing Order...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>

              <div className="text-center mt-3">
                <small className="text-muted">
                  By placing this order, you agree to our Terms of Service and
                  Privacy Policy
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
