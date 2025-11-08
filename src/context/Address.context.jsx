import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";

const AddressesContext = createContext();

export const useAddressesContext = () => {
  const context = useContext(AddressesContext);

  if (!context) {
    throw new Error(
      "useAddressesContext must be used within a AddressesContextProvider"
    );
  }

  return context;
};

export const AddressesContextProvider = ({ children }) => {
  const {
    data: fetchAddressesData,
    loading: fetchAddressesLoading,
    error: fetchAddressesError,
  } = useFetch("https://glowora-app-backend-api.vercel.app/api/addresses");

  const [showCreateAddress, setShowCreateAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [addressLoading, setAddressLoading] = useState(null);
  const [addressError, setAddressError] = useState(null);

  useEffect(() => {
    if (fetchAddressesData?.data?.addresses) {
      setAddresses(fetchAddressesData?.data?.addresses);
    }
  }, [fetchAddressesData]);

  const createAddressHandler = async (addressData) => {
    try {
      setAddressLoading(true);
      setAddressError(null)

      const user = JSON.parse(localStorage.getItem("user"));
      const finalData = { ...addressData, userId: user?._id };

      const response = await fetch(
        "https://glowora-app-backend-api.vercel.app/api/addresses",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create an address data");
      }

      const responseData = await response.json();

      if (responseData?.data) {
        setAddresses((preValue) => [...preValue, responseData.data]);
        toast.success("Address created successfully.");
      }
    } catch (error) {
      console.log("Error occurred while creating an address data", error);
      setAddressError(error.message);

      toast.error("Error occurred while creating address data");
    } finally {
      setAddressLoading(false);
    }
  };

  const removeAddressHandler = async (addressId) => {
    try {
      setAddressLoading(true);

      const response = await fetch(
        `https://glowora-app-backend-api.vercel.app/api/address/${addressId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete an address data");
      }

      const responseData = await response.json();

      if (responseData) {
        setAddresses((preValue) =>
          preValue.filter((address) => address._id !== addressId)
        );

        toast.success("Address deleted successfully.");
      }
    } catch (error) {
      console.log("Error occurred while deleting the address data", error);
      setAddressError(error.message);

      toast.error("Error occurred while deleting the address data");
    } finally {
      setAddressLoading(false);
    }
  };

  const updateAddressHandler = async (addressId, dataToUpdate) => {
    try {
      setAddressLoading(true);
      setAddressError(null)

      const response = await fetch(
        `https://glowora-app-backend-api.vercel.app/api/address/${addressId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToUpdate),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update an address data");
      }

      const responseData = await response.json();

      if (responseData) {
        setAddresses((preValue) =>
          preValue.map((address) =>
            address._id === addressId
              ? { ...address, ...responseData.data }
              : address
          )
        );

        toast.success("Address updated successfully.");
      }
    } catch (error) {
      console.log("Error occurred while updating an address data", error);
      setAddressError(error.message);

      toast.error("Error occurred while updating an address data");
    } finally {
      setAddressLoading(false);
    }
  };

  const setDefaultAddressHandler = async (userId, addressId) => {
    try {
      setAddressLoading(true);

      const response = await fetch(
        `https://glowora-app-backend-api.vercel.app/api/address/default/${addressId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to set an default address");
      }

      const responseData = await response.json();

      if (responseData) {
        setAddresses((preValue) =>
          preValue.map((address) =>
            address._id === addressId
              ? { ...address, isDefault: true }
              : { ...address, isDefault: false }
          )
        );

        toast.success(
          "An Address set as default address and also show in profile"
        );
      }
    } catch (error) {
      console.log("Error occurred while setting default address", error);
      setAddressError(error.message);

      toast.error("Error occurred while setting default address");
    } finally {
      setAddressLoading(false);
    }
  };

  return (
    <AddressesContext.Provider
      value={{
        createAddressHandler,
        showCreateAddress,
        setShowCreateAddress,
        removeAddressHandler,
        updateAddressHandler,
        setDefaultAddressHandler,
        addresses,
        addressLoading,
        addressError,
      }}
    >
      {children}
    </AddressesContext.Provider>
  );
};
