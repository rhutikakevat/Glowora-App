import { useUsersProfileContext } from "../context/User.context";
import { GrEdit } from "react-icons/gr";
import { AiFillHome } from "react-icons/ai";
import { useProductContext } from "../context/Products.context";
import { useAddressesContext } from "../context/Address.context";
import { useState } from "react";

export default function UserProfile() {
  const { usersData, usersLoading, usersError } = useUsersProfileContext();

  const {
    addresses,
    addressLoading,
    addressError,
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

  const { navigate } = useProductContext();

  const defaultAddress = usersData?.data?.users?.map((user) =>
    user.address.find((add) => add.isDefault)
  );

  const userDefaultAddress = defaultAddress?.[0];

  const [showAddress, setShowAddress] = useState();

  if (usersLoading) {
    return (
      <>
        <main
          className="container vh-100 d-flex 
                    flex-column justify-content-center align-items-center text-center"
        >
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-4 fs-4 fw-semibold">Loading your profile...</p>
        </main>
      </>
    );
  }

  if (usersError) {
    return (
      <>
        <main className="container py-5 text-center">
          <div className="alert alert-danger">
            An error occurred while loading your profile
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
          My Profile
        </h2>
        <hr className="mx-auto" style={{ borderTop: "1px solid #f11c58ff" }} />
      </div>

      <div className="card shadow-lg border-0">
        <div className="card-body p-4">
          {usersData?.data?.users ? (
            <div className="row align-items-center">
              {usersData?.data?.users.map((user) => (
                <div className="row align-items-center" key={user._id}>
                  {/* Mobile screen => Small Screen */}

                  <div className="col-12 d-md-none">
                    <div className="row align-items-center position-relative">
                      <div className="col-4 text-center">
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="img-fluid rounded-circle shadow"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      </div>

                      <div className="col-8">
                        <h4 className="mb-3" style={{ color: "#fb3b72ff" }}>
                          {user.name}
                        </h4>

                        <div className="text-muted">
                          <strong>Username: </strong>
                          {user.username}
                        </div>

                        <div className="text-muted">
                          <strong>User ID: </strong>
                          {user.userId}
                        </div>
                      </div>

                      <hr className="mt-4" />

                      <div className="mt-1">
                        <div className="row g-2">
                          <div className="col-12">
                            <div className="p-2">
                              <strong
                                className="d-block"
                                style={{ color: "#f11c58ff" }}
                              >
                                Gender
                              </strong>
                              <span>{user.gender}</span>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="p-2">
                              <strong
                                className="d-block"
                                style={{ color: "#f11c58ff" }}
                              >
                                Mobile Number
                              </strong>
                              <span>{user.phoneNo}</span>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="p-2">
                              <strong
                                className="d-block"
                                style={{ color: "#f11c58ff" }}
                              >
                                Email ID
                              </strong>

                              <span>{user.emailId}</span>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="p-2">
                              <strong
                                className="d-block"
                                style={{ color: "#f11c58ff" }}
                              >
                                Account Created On
                              </strong>

                              <span>
                                {new Date(user.accountCreated).toLocaleString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="p-2">
                              <strong
                                className="d-block"
                                style={{ color: "#f11c58ff" }}
                              >
                                Address
                              </strong>
                              <span>
                                {userDefaultAddress ? (
                                  <>
                                    {userDefaultAddress.street}
                                    {userDefaultAddress.landmark &&
                                      `, ${userDefaultAddress.landmark}`}
                                    {`, ${userDefaultAddress.city}, ${userDefaultAddress.state} - ${userDefaultAddress.zipCode}`}
                                  </>
                                ) : (
                                  "No default address set"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop => Large Screen */}

                  <div className="col-md-4 text-center d-none d-md-block">
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="img-fluid rounded-circle shadow mb-4"
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />

                    <h4 className="fw-semibold" style={{ color: "#f11c58ff" }}>
                      {user.name}
                    </h4>

                    <div className="text-muted mt-3">
                      <strong>Username: </strong>
                      {user.username}
                    </div>

                    <div className="text-muted mt-1">
                      <strong>User ID: </strong>
                      {user.userId}
                    </div>
                  </div>

                  <div className="col-md-8 d-none d-md-block">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="p-3 border rounded">
                          <strong
                            className="d-block mb-1"
                            style={{ color: "#f11c58ff" }}
                          >
                            Gender
                          </strong>
                          <span>{user.gender}</span>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="p-3 border rounded">
                          <strong
                            className="d-block mb-1"
                            style={{ color: "#f11c58ff" }}
                          >
                            Mobile Number
                          </strong>
                          <span>{user.phoneNo}</span>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="p-3 border rounded">
                          <strong
                            className="d-block mb-1"
                            style={{ color: "#f11c58ff" }}
                          >
                            Email ID
                          </strong>
                          <span>{user.emailId}</span>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="p-3 border rounded">
                          <strong
                            className="d-block mb-1"
                            style={{ color: "#f11c58ff" }}
                          >
                            Account Created On
                          </strong>
                          <span>
                            {new Date(user.accountCreated).toLocaleString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="p-3 border rounded">
                          <strong
                            className="d-block mb-1"
                            style={{ color: "#f11c58ff" }}
                          >
                            Delivery Address
                          </strong>
                          <span>
                            {user.address.find((a) => a.isDefault).street},{" "}
                            {user.address.find((a) => a.isDefault).landmark
                              ? `${
                                  user.address.find((a) => a.isDefault).landmark
                                }, `
                              : ""}
                            {user.address.find((a) => a.isDefault).city},{" "}
                            {user.address.find((a) => a.isDefault).state} -{" "}
                            {user.address.find((a) => a.isDefault).zipCode}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center fw-semibold">
              <span>User Profile not found!</span>
            </div>
          )}
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12 col-md-6 mb-2">
          <button
            onClick={() => navigate("/orders")}
            className="btn w-100 text-white fw-bold py-2"
            style={{ background: "#f11c58ff", border: "none" }}
          >
            View Orders
          </button>
        </div>

        <div className="col-12 col-md-6 mb-2">
          <button
            onClick={() => setShowAddress(!showAddress)}
            className="btn w-100 fw-bold text-white py-2"
            style={{ background: "#f11c58ff", border: "none" }}
          >
            Manage Addresses
          </button>
        </div>
      </div>

      {showAddress && (
        <div>
          {/* Address Form Section */}
          {showCreateAddress && (
            <div className="card border-0 shadow-sm mt-4">
              <div className="card-body p-4">
                <h4 className="mb-4" style={{ color: "#f11c58ff" }}>
                  {isEditing ? "Edit Address" : "Add New Address"}
                </h4>

                {submitError && (
                  <div className="alert alert-danger">{submitError}</div>
                )}

                <form onSubmit={submitHandler}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label
                        htmlFor="fullName"
                        className="form-label fw-semibold"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={changeHandler}
                        required
                        placeholder="Enter full name"
                      />
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="phoneNo"
                        className="form-label fw-semibold"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phoneNo"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={changeHandler}
                        required
                        placeholder="Enter phone number"
                      />
                    </div>

                    <div className="col-12">
                      <label
                        htmlFor="street"
                        className="form-label fw-semibold"
                      >
                        Street Address *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={changeHandler}
                        required
                        placeholder="Enter street address"
                      />
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="landmark"
                        className="form-label fw-semibold"
                      >
                        Landmark
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="landmark"
                        name="landmark"
                        value={formData.landmark}
                        onChange={changeHandler}
                        placeholder="Enter landmark (optional)"
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="city" className="form-label fw-semibold">
                        City *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={changeHandler}
                        required
                        placeholder="Enter city"
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="state" className="form-label fw-semibold">
                        State *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={changeHandler}
                        required
                        placeholder="Enter state"
                      />
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="zipCode"
                        className="form-label fw-semibold"
                      >
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={changeHandler}
                        required
                        placeholder="Enter ZIP code"
                      />
                    </div>

                    <div className="col-12">
                      <label
                        htmlFor="country"
                        className="form-label fw-semibold"
                      >
                        Country *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={changeHandler}
                        required
                        placeholder="Enter country"
                      />
                    </div>

                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="isDefault"
                          name="isDefault"
                          checked={formData.isDefault}
                          onChange={changeHandler}
                        />
                        <label
                          className="form-check-label fw-semibold"
                          htmlFor="isDefault"
                        >
                          Set as default address
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="d-flex gap-2">
                        <button
                          type="submit"
                          className="btn text-white fw-semibold"
                          style={{ backgroundColor: "#f11c58ff" }}
                          disabled={addressLoading}
                        >
                          {addressLoading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" />
                              {isEditing ? "Updating..." : "Adding..."}
                            </>
                          ) : isEditing ? (
                            "Update Address"
                          ) : (
                            "Add Address"
                          )}
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            handleCancel();
                            setShowCreateAddress(false);
                          }}
                          disabled={addressLoading}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Address List Section */}
          <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
            <h4 className="m-0" style={{ color: "#f11c58ff" }}>
              Saved Addresses
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

          {addresses && addresses?.length > 0 ? (
            <div className="row g-3 mt-2">
              {addresses?.map((address) => (
                <div className="col-12" key={address._id}>
                  <div
                    className={`card border-0 shadow-sm ${
                      address.isDefault ? "border-primary" : ""
                    }`}
                    style={{
                      cursor: "pointer",
                      border: address.isDefault
                        ? "2px solid #f11c58ff"
                        : "none",
                    }}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="card-title mb-1">
                          {address.fullName || address?.userId?.name}
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
                        <AiFillHome className="text-muted" />{" "}
                        <span>
                          {address.street},{" "}
                          {address.landmark && `${address.landmark}, `}
                          {address.city}, {address.state}, {address.country} -{" "}
                          {address.zipCode}
                        </span>
                      </p>

                      <div className="d-flex gap-2 flex-wrap">
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
                              handleSetDefault(currentUser?._id, address._id)
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
      )}
    </main>
  );
}
