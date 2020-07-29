import React, { createContext, useContext, useReducer } from "react";
import { productReducer } from "./reducer";
import { baseApiUrl } from "../api/punkapi";

const initialState = {
  listOfProducts: [],
  listOFavouriteProducts: [],
};

export const ProductContext = createContext(initialState);

export const ProductContextProvider = ({ children }) => {
  const { listOfProducts, listOFavouriteProducts } = useContext(ProductContext);

  const [state, dispatch] = useReducer(productReducer, initialState);

  const getProducts = async () => {
    const data = await (await fetch(baseApiUrl)).json();
    console.log(data);
  };

  return (
    <ProductContext.Provider
      value={{ listOfProducts, listOFavouriteProducts, getProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};
