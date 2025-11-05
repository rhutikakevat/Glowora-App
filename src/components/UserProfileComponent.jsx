import { useUsersProfileContext } from "../context/User.context";
import { GrEdit } from "react-icons/gr";

export default function UserProfile() {
  const { usersData, usersLoading, usersError } = useUsersProfileContext();

  const profileHandler = () => {};

  const AddressHandler = () => {};

  const orderHandler = () => {};

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
                          loading="lazy"
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

                      <button
                        onClick={() => profileHandler()}
                        className="position-absolute text-danger btn"
                        style={{
                          top: "0px",
                          right: "0px",
                          display: "flex",
                          alignItems: "end",
                          justifyContent: "end",
                        }}
                      >
                        <GrEdit />
                      </button>

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
                                {user.address.find((a) => a.isDefault).street},{" "}
                                {user.address.find((a) => a.isDefault).landmark}
                                , {user.address.find((a) => a.isDefault).city},{" "}
                                {user.address.find((a) => a.isDefault).state},{" "}
                                {user.address.find((a) => a.isDefault).country}{" "}
                                -{" "}
                                {user.address.find((a) => a.isDefault).zipCode}
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
                      loading="lazy"
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

                    <button
                      onClick={() => profileHandler()}
                      className="btn btn-sm btn-outline-danger mt-4 fw-semibold"
                    >
                      Edit Profile
                      <GrEdit className="ms-2" />
                    </button>
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
                            {user.address.find((a) => a.isDefault).landmark},{" "}
                            {user.address.find((a) => a.isDefault).city},{" "}
                            {user.address.find((a) => a.isDefault).state} -{" "}
                            {user.address.find((a) => a.isDefault).zipCode},{" "}
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
            onClick={() => orderHandler()}
            className="btn w-100 text-white fw-bold py-2"
            style={{ background: "#f11c58ff", border: "none" }}
          >
            View Orders
          </button>
        </div>

        <div className="col-12 col-md-6 mb-2">
          <button
            onClick={() => AddressHandler()}
            className="btn w-100 fw-bold text-white py-2"
            style={{ background: "#f11c58ff", border: "none" }}
          >
            Manage Addresses
          </button>
        </div>
      </div>
    </main>
  );
}
