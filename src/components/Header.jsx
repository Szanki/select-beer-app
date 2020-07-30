import React, { useContext } from "react";
import { ProductContext } from "../context/productContext";

export const Header = () => {
  const { showFavouritePage, setShowFavouritePage } = useContext(
    ProductContext
  );

  return (
    <header className="header">
      <p className="header-text">Find Your Favourite Beer</p>
      <button
        onClick={(e) => setShowFavouritePage(e)}
        type="submit"
        className="header-button"
      >
        {showFavouritePage ? "Beer List" : "Favourite Beer List"}
      </button>
    </header>
  );
};
