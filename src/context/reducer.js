export const productReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        listOfProducts: [...state.listOfProducts, ...action.payload],
        isLoading: false,
        error: "",
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
        listOFavouriteProducts: action.payload,
      };
    case "IS_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "ERROR":
      return {
        ...state,
        error: "Sorry, something went wrong, try another time",
        isLoading: false,
      };
    default:
      return state;
  }
};
