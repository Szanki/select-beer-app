import React, { createContext, useState, useReducer, useEffect } from "react";
import { productReducer } from "./reducer.js";
import { baseApiUrl } from "../api/punkapi";

const initialState = {
  listOfProducts: localStorage.getItem("listOfProducts")
    ? JSON.parse(localStorage.getItem("listOfProducts"))
    : [],
  listOFavouriteProducts: localStorage.getItem("listOFavouriteProducts")
    ? JSON.parse(localStorage.getItem("listOFavouriteProducts"))
    : [],
  isLoading: false,
};

export const ProductContext = createContext(initialState);

export const ProductContextProvider = ({ children }) => {
  const [showFavouritePage, setFavouritePage] = useState(false);

  const [
    { isLoading, listOfProducts, listOFavouriteProducts },
    dispatch,
  ] = useReducer(productReducer, initialState);

  useEffect(() => {
    localStorage.setItem("listOfProducts", JSON.stringify(listOfProducts));
    localStorage.setItem(
      "listOFavouriteProducts",
      JSON.stringify(listOFavouriteProducts)
    );
  }, [listOfProducts, listOFavouriteProducts]);

  const getProducts = async () => {
    dispatch({ type: "IS_LOADING" });
    const data = await (await fetch(baseApiUrl)).json();
    dispatch({ type: "FETCH_PRODUCTS", payload: data });
  };

  const addProductToFavourite = (e, product) => {
    e.preventDefault();
    dispatch({ type: "ADD_FAVOURITE", payload: product });
  };

  const setShowFavouritePage = (e) => {
    e.preventDefault();
    setFavouritePage(!showFavouritePage);
  };

  const removeProductFromFavourite = (e, id) => {
    e.preventDefault();
    const filtredList = listOFavouriteProducts.filter((product) => {
      return product.id !== id;
    });

    dispatch({ type: "REMOVE_FAVOURITE", payload: filtredList });
  };

  return (
    <ProductContext.Provider
      value={{
        listOfProducts,
        listOFavouriteProducts,
        getProducts,
        addProductToFavourite,
        removeProductFromFavourite,
        showFavouritePage,
        setShowFavouritePage,
        isLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
