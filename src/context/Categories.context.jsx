import { createContext, useContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router";

const CategoriesContext = createContext();

export const useCategoriesContext = () => {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error(
      "useCategoriesContext must be used within a CategoriesContextProvider"
    );
  }
  return context;
};

export const CategoriesContextProvider = ({ children }) => {
  const categoryApi =
    "https://glowora-app-backend-api.vercel.app/api/categories";

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch(categoryApi);

  useEffect(() => {
    if (categoryParam && categories?.data?.categories) {
      const categoryExists = categories.data.categories.filter(
        (categoryForFilter) => categoryForFilter.name === categoryParam
      );

      if (categoryExists && !selectedCategories.includes(categoryParam)) {
        setSelectedCategories((preValue) => [...preValue, categoryParam]);
      }
    } else if (!categoryParam) {
      setSelectedCategories([]);
    }
  }, [categoryParam, categories]);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) =>
        prev.filter((category) => category !== value)
      );
    }
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        categoriesError,
        categoriesLoading,
        selectedCategories,
        handleCategoryChange,
        setSearchParams,
        setSelectedCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};