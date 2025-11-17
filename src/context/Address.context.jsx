import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";
import { useUsersProfileContext } from "../context/User.context";
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

  const { usersData } = useUsersProfileContext();
  const currentUser = usersData?.data?.users?.[0];

  const [showCreateAddress, setShowCreateAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [addressLoading, setAddressLoading] = useState(null);
  const [addressError, setAddressError] = useState(null);

  const [editedAddressId, setEditedAddressId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || "Rhutika Kevat",
    street: "",
    landmark: "",
    city: "",
    state: "",
    country: "India",
    zipCode: "",
    isDefault: false,
  });

  useEffect(() => {
    if (fetchAddressesData?.data?.addresses) {
      setAddresses(fetchAddressesData?.data?.addresses);
    }
  }, [fetchAddressesData]);

  useEffect(() => {
    if (currentUser && !isEditing) {
      setFormData((preValue) => ({
        ...preValue,
        fullName: currentUser?.name || "Rhutika Kevat",
      }));
    }
  }, [currentUser, isEditing]);

  const resetForm = () => {
    setFormData({
      fullName: currentUser?.name || "Rhutika Kevat",
      street: "",
      landmark: "",
      city: "",
      state: "",
      country: "India",
      zipCode: "",
      isDefault: false,
    });

    setEditedAddressId(null);
    setIsEditing(false);
    setSubmitError("");
  };

  useEffect(() => {
    if (!showCreateAddress && !isEditing) {
      resetForm();
    }
  }, [showCreateAddress, isEditing, currentUser]);

  const changeHandler = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    setSubmitError("");
  };

  // useEffect(() => {
  //   console.log("Current user in checkout:", currentUser);
  // }, [currentUser]);

  const createAddressHandler = async (addressData) => {
    try {
      setAddressLoading(true);
      setAddressError(null);

      console.log("sending address data:", addressData);

      if (!addressData.userId) {
        throw new Error("User ID is required to create an address");
      }

      const response = await fetch(
        "https://glowora-app-backend-api.vercel.app/api/addresses",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(addressData),
        }
      );

      console.log("Response status", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response", errorText);

        throw new Error("Failed to create an address data");
      }

      const result = await response.json();
      console.log(result);

      if (result.data) {
        setAddresses[(preValue) => [...preValue, result.data]];

        toast.success("Address created successfully");

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }

      return result;
    } catch (error) {
      console.log("Error occurred while creating an address data", error);
      setAddressError(error.message);

      toast.error("Error occurred while creating address data");

      throw error;
    } finally {
      setAddressLoading(false);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setSubmitError("");

    try {
      if (isEditing && editedAddressId) {
        await updateAddressHandler(editedAddressId, formData);
      } else {
        if (!currentUser || !currentUser._id) {
          console.error("Current user not available:", currentUser);
          return;
        }
        const addressData = { ...formData, userId: currentUser?._id };

        console.log("Submitting address with userId:", addressData.userId);
        await createAddressHandler(addressData);
      }

      resetForm();
      setShowCreateAddress(false);
    } catch (error) {
      console.log("Error saving address", error);
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

  const handleEdit = (address) => {
    setFormData({
      fullName: address.fullName || currentUser?.name || "",
      street: address.street || "",
      landmark: address.landmark || "",
      city: address.city || "",
      state: address.state || "",
      country: address.country || "",
      zipCode: address.zipCode || "",
      isDefault: address.isDefault || false,
    });

    setEditedAddressId(address._id);
    setIsEditing(true);
    setShowCreateAddress(true);
  };

  const handleCancel = () => {
    resetForm();
    setShowCreateAddress(false);
  };

  const updateAddressHandler = async (addressId, dataToUpdate) => {
    try {
      setAddressLoading(true);
      setAddressError(null);

      // console.log("Updating address:", addressId, dataToUpdate);

      const response = await fetch(
        `https://glowora-app-backend-api.vercel.app/api/address/${addressId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToUpdate),
        }
      );

      // console.log("Update response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to update address: ${response.status} ${errorText}`
        );
      }

      const responseData = await response.json();

      // console.log("Update success:", responseData);

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

      throw error;
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
          "Address set as default address"
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

  const handleSetDefault = async (userId, addressId) => {
    try {
      await setDefaultAddressHandler(userId, addressId);
    } catch (error) {
      console.log("Error setting default address: ", error);
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
        fetchAddressesError,
        fetchAddressesLoading,
        addressLoading,
        addressError,
        currentUser,
        isEditing,
        resetForm,
        submitError,
        changeHandler,
        submitHandler,
        handleEdit,
        handleCancel,
        handleSetDefault,
        formData,
      }}
    >
      {children}
    </AddressesContext.Provider>
  );
};
