import { useOrderContext } from "../context/Order.context";
import { useState } from "react";

export default function OrdersComponent() {
  const { orders } = useOrderContext();
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Pending': 'warning',
      'Processing': 'info',
      'Shipped': 'primary',
      'Delivered': 'success',
      'Cancelled': 'danger'
    };
    return statusConfig[status] || 'secondary';
  };

  const getPaymentStatusBadge = (status) => {
    const statusConfig = {
      'Paid': 'success',
      'Unpaid': 'danger',
      'Pending': 'warning',
      'Failed': 'danger'
    };
    return statusConfig[status] || 'secondary';
  };

  // console.log(orders);
  
  return (
    <>
      <main className="container py-4">
        <div className="py-2 mb-4">
          <h2 className="text-center text-md-start" style={{ color: "#f11c58ff" }}>
            My Orders
          </h2>
          <hr className="mx-auto" style={{ borderTop: "1px solid #f11c58ff" }} />
        </div>

        {!orders?.data?.orders || orders.data.orders.length === 0 ? (
          <div className="text-center py-5">
            <div className="alert alert-info">
              <i className="bi bi-inbox fs-1 d-block mb-3"></i>
              <h4>No Orders Found</h4>
              <p className="mb-0">You haven't placed any orders yet.</p>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-12">
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white py-3">
                  <h5 className="mb-0 fw-semibold">
                    Order History ({orders.data.orders.length})
                  </h5>
                </div>
                <div className="card-body p-0">
                  {orders.data.orders.map((order) => (
                    <div key={order._id} className="border-bottom">
                      {/* Order Header */}
                      <div 
                        className="p-4 d-flex justify-content-between align-items-center cursor-pointer"
                        onClick={() => toggleOrderDetails(order._id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="d-flex align-items-center">
                          <i 
                            className={`bi bi-chevron-${expandedOrder === order._id ? 'up' : 'down'} me-3`}
                            style={{ color: "#f11c58ff" }}
                          ></i>
                          <div>
                            <h6 className="mb-1 fw-bold">Order #{order.orderId}</h6>
                            <small className="text-muted">
                              Placed on {formatDateTime(order.placedDate)}
                            </small>
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold fs-5" style={{ color: "#f11c58ff" }}>
                            ₹{order.totalPayment}
                          </div>
                          <div className="d-flex gap-2 justify-content-end mt-1">
                            <span className={`badge bg-${getStatusBadge(order.status)}`}>
                              {order.status}
                            </span>
                            <span className={`badge bg-${getPaymentStatusBadge(order.paymentStatus)}`}>
                              {order.paymentStatus}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Order Details - Collapsible */}
                      {expandedOrder === order._id && (
                        <div className="px-4 pb-4">
                          {/* Order Products */}
                          <div className="mb-4">
                            <h6 className="fw-semibold mb-3" style={{ color: "#f11c58ff" }}>
                              Order Items ({order.orderProduct.length})
                            </h6>
                            {order.orderProduct.map((item, index) => (
                              <div key={item._id} className="card border-0 shadow-sm mb-3">
                                <div className="card-body">
                                  <div className="row align-items-center">
                                    <div className="col-md-2">
                                      <img
                                        src={item.productId.profileImage}
                                        alt={item.productId.name}
                                        className="img-fluid rounded"
                                        style={{
                                          height: "80px",
                                          objectFit: "contain"
                                        }}
                                      />
                                    </div>
                                    <div className="col-md-6">
                                      <h6 className="fw-semibold mb-1">{item.productId.name}</h6>
                                      <p className="text-muted small mb-1">{item.productId.brand}</p>
                                      <div className="d-flex align-items-center">
                                        <div className="text-warning small me-2">
                                          {Array.from({ length: 5 }, (_, i) => (
                                            <i
                                              key={i}
                                              className={`bi bi-star${i < Math.floor(item.productId.ratings) ? '-fill' : ''}`}
                                            ></i>
                                          ))}
                                        </div>
                                        <small className="text-muted">({item.productId.ratings})</small>
                                      </div>
                                    </div>
                                    <div className="col-md-2 text-center">
                                      <small className="text-muted">Quantity</small>
                                      <div className="fw-semibold">{item.quantity}</div>
                                    </div>
                                    <div className="col-md-2 text-end">
                                      <small className="text-muted">Price</small>
                                      <div className="fw-semibold" style={{ color: "#f11c58ff" }}>
                                        ₹{item.price}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="row">
                            {/* Order Summary */}
                            <div className="col-md-6 mb-4">
                              <div className="card border-0 shadow-sm">
                                <div className="card-header bg-white">
                                  <h6 className="mb-0 fw-semibold">Order Summary</h6>
                                </div>
                                <div className="card-body">
                                  <div className="d-flex justify-content-between mb-2">
                                    <span>Items Total:</span>
                                    <span>₹{order.totalPayment}</span>
                                  </div>
                                  <div className="d-flex justify-content-between mb-2">
                                    <span>Shipping:</span>
                                    <span className="text-success">FREE</span>
                                  </div>
                                  <hr />
                                  <div className="d-flex justify-content-between fw-bold fs-5">
                                    <span>Total Amount:</span>
                                    <span style={{ color: "#f11c58ff" }}>₹{order.totalPayment}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Shipping & Payment Info */}
                            <div className="col-md-6">
                              <div className="card border-0 shadow-sm mb-3">
                                <div className="card-header bg-white">
                                  <h6 className="mb-0 fw-semibold">Shipping Information</h6>
                                </div>
                                <div className="card-body">
                                  <p className="mb-1">
                                    <strong>Address:</strong> {order.shippingAddress.street}
                                  </p>
                                  <p className="mb-1">
                                    <strong>City:</strong> {order.shippingAddress.city}, {order.shippingAddress.state}
                                  </p>
                                  <p className="mb-1">
                                    <strong>ZIP:</strong> {order.shippingAddress.zipCode}
                                  </p>
                                  {order.shippingAddress.landmark && (
                                    <p className="mb-1">
                                      <strong>Landmark:</strong> {order.shippingAddress.landmark}
                                    </p>
                                  )}
                                  <p className="mb-0">
                                    <strong>Expected Delivery:</strong> {formatDate(order.expectedDelivery)}
                                  </p>
                                </div>
                              </div>

                              <div className="card border-0 shadow-sm">
                                <div className="card-header bg-white">
                                  <h6 className="mb-0 fw-semibold">Payment Information</h6>
                                </div>
                                <div className="card-body">
                                  <p className="mb-1">
                                    <strong>Method:</strong> {order.paymentMethod}
                                  </p>
                                  <p className="mb-1">
                                    <strong>Status:</strong> 
                                    <span className={`badge bg-${getPaymentStatusBadge(order.paymentStatus)} ms-2`}>
                                      {order.paymentStatus}
                                    </span>
                                  </p>
                                  <p className="mb-0">
                                    <strong>Tracking ID:</strong> 
                                    <code className="ms-2">{order.trackingId}</code>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          {/* <div className="d-flex gap-2 justify-content-end mt-4">
                            <button className="btn btn-outline-primary btn-sm">
                              <i className="bi bi-truck me-2"></i>
                              Track Order
                            </button>
                            <button className="btn btn-outline-success btn-sm">
                              <i className="bi bi-download me-2"></i>
                              Download Invoice
                            </button>
                            {order.status === 'Pending' && (
                              <button className="btn btn-outline-danger btn-sm">
                                <i className="bi bi-x-circle me-2"></i>
                                Cancel Order
                              </button>
                            )}
                          </div> */}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}