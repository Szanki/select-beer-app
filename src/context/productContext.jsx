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
  error: "",
  isEmpty: localStorage.getItem("isEmpty")
    ? JSON.parse(localStorage.getItem("isEmpty"))
    : false,
};

export const ProductContext = createContext(initialState);

export const ProductContextProvider = ({ children }) => {
  const [showFavouritePage, setFavouritePage] = useState(false);
  const [pageCounter, setPageCounter] = useState(
    localStorage.getItem("pageCounter")
      ? JSON.parse(localStorage.getItem("pageCounter"))
      : 1
  );

  const [
    { isLoading, listOfProducts, listOFavouriteProducts, error, isEmpty },
    dispatch,
  ] = useReducer(productReducer, initialState);

  useEffect(() => {
    localStorage.setItem("listOfProducts", JSON.stringify(listOfProducts));
    localStorage.setItem(
      "listOFavouriteProducts",
      JSON.stringify(listOFavouriteProducts)
    );
    localStorage.setItem("pageCounter", JSON.stringify(pageCounter));
    localStorage.setItem("isEmpty", JSON.stringify(isEmpty));
  }, [listOfProducts, listOFavouriteProducts, pageCounter]);

  const getProducts = async () => {
    const urlParams = `${baseApiUrl}beers?page=${pageCounter}&per_page=30`;

    try {
      dispatch({ type: "IS_LOADING" });
      const data = await (await fetch(urlParams)).json();
      data.length === 0 && dispatch({ type: "IS_EMPTY" });
      dispatch({ type: "FETCH_PRODUCTS", payload: data });
      data.length > 1 && setPageCounter(pageCounter + 1);
    } catch {
      dispatch({ type: "ERROR", payload: error });
    }
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
        pageCounter,
        error,
        isEmpty,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
