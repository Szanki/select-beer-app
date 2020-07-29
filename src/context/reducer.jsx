import React from "react";

export const productReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        listOfProducts: [...state.listOfProducts, action.payload],
      };
    case "ADD_FAVOURITE":
      return {
        ...state,
        listOFavouriteProducts: [
          ...state.listOFavouriteProducts,
          action.payload,
        ],
      };
    case "REMOVE_FAVOURITE":
      return {
        ...state,
        listOFavouriteProducts: [action.payload],
      };
  }
};
