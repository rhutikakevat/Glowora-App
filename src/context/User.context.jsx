import { createContext, useContext } from "react";
import useFetch from "../hooks/useFetch";

const UsersProfileContext = createContext();

export const useUsersProfileContext = () => {
  const context = useContext(UsersProfileContext);

  if (!context) {
    throw new Error(
      "useUsersContext must be used within a UsersProfileContextProvider"
    );
  }

  return context;
};

export const UsersProfileContextProvider = ({ children }) => {
  const usersDataApi = "https://glowora-app-backend-api.vercel.app/api/users";

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useFetch(usersDataApi);

  return (
    <UsersProfileContext.Provider
      value={{ usersData, usersLoading, usersError }}
    >
      {children}
    </UsersProfileContext.Provider>
  );
};
