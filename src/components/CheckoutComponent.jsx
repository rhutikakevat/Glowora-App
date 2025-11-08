import { useState } from "react";
import { useAddressesContext } from "../context/Address.context";

export default function CheckoutComponent() {
  const {
    addresses,
    addressLoading,
    addressError,
    createAddressHandler,
    showCreateAddress,
    setShowCreateAddress,
    removeAddressHandler,
    updateAddressHandler,
    setDefaultAddressHandler,
  } = useAddressesContext();

  const [editedAddress,setEditedAddress] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    isDefault: false,
  });

  const changeHandler = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    createAddressHandler(formData);

    setFormData({
      fullName: "",
      street: "",
      landmark: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      isDefault: false,
    });

    setShowCreateAddress(false);
  };

  if (addressLoading) {
    return (
      <>
        <main
          className="container vh-100 d-flex 
                    flex-column justify-content-center align-items-center text-center"
        >
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-4 fs-4 fw-semibold">
            Loading your checkout products...
          </p>
        </main>
      </>
    );
  }

  if (addressError) {
    return (
      <>
        <main className="container py-5 text-center">
          <div className="alert alert-danger">
            An error occurred while loading your checkout product's data
          </div>
        </main>
      </>
    );
  }

  return (
    <main className="container py-4 mb-5">
      <div className="py-2 mb-3">
        <h2
          className="text-center text-md-start"
          style={{ color: "#f11c58ff" }}
        >
          My Checkout Information
        </h2>
        <hr className="mx-auto" style={{ borderTop: "1px solid #f11c58ff" }} />
      </div>

      <div className="card">
        <div className="card-body p-3">
          <h3>Addresses for Delivery</h3>

          <button
            className="btn btn-outline-danger mb-3"
            onClick={() => setShowCreateAddress(!showCreateAddress)}
          >
            {showCreateAddress ? "Cancel" : "Add a new address"}
          </button>

          {showCreateAddress && (
            <div className="card">
              <div className="card-body">
                <h4>Add Address Information</h4>

                <form onSubmit={submitHandler}>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label" htmlFor="fullNameInput">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullNameInput"
                        value={formData.fullName}
                        onChange={changeHandler}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="streetInput" className="form-label">
                        Street:
                      </label>
                      <input
                        type="text"
                        name="street"
                        id="streetInput"
                        value={formData.street}
                        onChange={changeHandler}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="landmarkInput" className="form-label">
                        Landmark:
                      </label>
                      <input
                        type="text"
                        name="landmark"
                        id="landmarkInput"
                        value={formData.landmark}
                        onChange={changeHandler}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="cityInput" className="form-label">
                        City:
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="cityInput"
                        value={formData.city}
                        onChange={changeHandler}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="stateInput" className="form-label">
                        State:
                      </label>
                      <input
                        type="text"
                        name="state"
                        id="stateInput"
                        value={formData.state}
                        onChange={changeHandler}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="countryInput" className="form-label">
                        Country:
                      </label>
                      <input
                        type="text"
                        name="country"
                        id="countryInput"
                        value={formData.country}
                        onChange={changeHandler}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="zipCodeInput" className="form-label">
                        Zipcode:
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        id="zipCodeInput"
                        value={formData.zipCode}
                        onChange={changeHandler}
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
                          value={formData.isDefault}
                          onChange={changeHandler}
                        />
                        <label
                          htmlFor="isDefaultInput"
                          className="form-check-label"
                        >
                          set as default address in profile
                        </label>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-danger w-100">
                      Save address
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <h4>Saved Address</h4>

          {addresses && addresses.length > 0 ? (
            <div className="row">
              {addresses?.map((address) => (
                <div className="col-12" key={address._id}>
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">{address?.userId?.name}</h5>

                      <span className="card-text mb-1 text-muted">
                        <strong>Email ID: </strong>
                        {address.userId.emailId}
                      </span>
                      <br />

                      <span>
                        <strong className="card-text mb-1 text-muted">
                          Mobile Number:{" "}
                        </strong>
                        {address.userId.phoneNo}
                      </span>
                      <br />

                      <span className="card-text">
                        <strong>Address: </strong>
                        {address.street}, {address.landmark}, {address.city},{" "}
                        {address.state}, {address.country} - {address.zipCode}
                      </span>
                      {address.isDefault && <div>Default</div>}

                      <div className="mt-3 d-flex g-2">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => updateAddressHandler(address._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeAddressHandler(address._id)}
                        >
                          Delete
                        </button>

                        {!address.isDefault && (
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() =>
                              setDefaultAddressHandler(
                                address?.userId?._id,
                                address._id
                              )
                            }
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
            <div>Saved address not found</div>
          )}

          <h3>Payment Method</h3>
          <select
            name="payment"
            id="paymentMethod"
            className="form-select"
            required
          >
            <option value="">Select For Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="UPI ID/QR Code">UPI ID/QR Code</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Cash on Delivery (COD)">Cash on Delivery</option>
          </select>
        </div>
      </div>
    </main>
  );
}
