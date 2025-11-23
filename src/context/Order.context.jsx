import { createContext, useContext, useEffect, useState } from "react";
import { useCartContext } from "./Cart.context";
import { useAddressesContext } from "./Address.context";
import { useUsersProfileContext } from "./User.context";
import useFetch from "../hooks/useFetch";

const OrderContext = createContext();

export function useOrderContext() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }

  return context;
}

export function OrderProvider({ children }) {
  const { cart, finalTotal, clearCart } = useCartContext();
  const { addresses } = useAddressesContext();
  const { usersData } = useUsersProfileContext();

  const [orderLoading, setOrderLoading] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [orderError, setOrderError] = useState(null);

  const apiURL =
    "https://glowora-app-backend-api.vercel.app/api/ordered/products";

  const currentUser = usersData?.data?.users?.[0];

  const { data: orders } = useFetch(apiURL);

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      const defaultAddress = addresses.find((address) => address.isDefault);

      if (defaultAddress) {
        setSelectedAddressId(defaultAddress._id);
      } else if (addresses.length > 0) {
        setSelectedAddressId(addresses[0]._id);
      }
    }
  }, [addresses]);

  const generateTrackingId = () => {
    return `TRK${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
  };

  const generateOrderId = () => {
    return `ORD${Math.floor(Math.random() * 10000000000)}`;
  };

  const calculateExpectedDelivery = () => {
    const deliveryDate = new Date();

    deliveryDate.setDate(deliveryDate.getDate() + 10);

    return deliveryDate;
  };

  const createOrderData = async (orderData) => {
    try {
      setOrderLoading(true);
      setOrderError(null);

      const response = await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        throw new Error("Failed to creating a new order's data");
      }

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.log("Error occurred while creating order's data", error);
      setOrderError(error.message);
      throw error;
    } finally {
      setOrderLoading(false);
    }
  };

  const handlePlaceOrderInDatabase = async (
    selectedAddressId = null,
    paymentMethod = null
  ) => {
    try {
      let shippingAddressId = selectedAddressId;

      if (!shippingAddressId && addresses && addresses.length > 0) {
        const defaultAddress =
          addresses.find((address) => address.isDefault) || addresses[0];

        shippingAddressId = defaultAddress?._id;
      }

      if (!shippingAddressId) {
        setOrderError("Please add a shipping address to continue");

        return;
      }

      const finalPaymentMethod = paymentMethod || "Cash on Delivery (COD)";

      const orderData = {
        orderId: generateOrderId(),
        orderProduct: cart.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
          price: item.productId.price,
        })),
        userId: currentUser?._id,
        paymentMethod: finalPaymentMethod,
        trackingId: generateTrackingId(),
        expectedDelivery: calculateExpectedDelivery(),
        totalPayment: finalTotal,
        shippingAddress: shippingAddressId,
      };

      // console.log("Place Order: \n", orderData);

      const placeOrder = await createOrderData(orderData);

      if (placeOrder) {
        setShowOrderSuccess(true);
        clearCart();

        return placeOrder;
      }
    } catch (error) {
      console.log("Error occurred while placing order: ", error);
      setOrderError(error.message);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      if (!addresses || addresses.length === 0) {
        alert("Please add a shipping address to place order");
        return;
      }

      const finalAddressId =
        selectedAddressId ||
        addresses.find((address) => address.isDefault)?._id ||
        addresses[0]._id;

      const finalPaymentMethod = selectedPaymentMethod;

      handlePlaceOrderInDatabase(finalAddressId, finalPaymentMethod);
    } catch (error) {
      console.log("Error occurred while placing order: ", error);
      setOrderError(error.message);
      throw error;
    }
  };

  const closeOrderSuccess = () => {
    setShowOrderSuccess(false);

    window.location.href = "/orders";
  };

  const onSelectAddressId = (addressId) => {
    setSelectedAddressId(addressId);
  };

  const onPaymentMethodChange = (selectPaymentMethod) => {
    setSelectedPaymentMethod(selectPaymentMethod);
  };

  return (
    <OrderContext.Provider
      value={{
        createOrderData,
        handlePlaceOrder,
        orderLoading,
        showOrderSuccess,
        closeOrderSuccess,
        orderError,
        onSelectAddressId,
        onPaymentMethodChange,
        selectedAddressId,
        selectedPaymentMethod,
        orders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
