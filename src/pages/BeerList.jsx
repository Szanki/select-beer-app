import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context/productContext";
import { BeerCard } from "../components/BeerCard";
import { LoadingComponent } from "../components/LoadingComponent";
import { ErrorComponent } from "../components/ErrorComponent";

export const BeerList = () => {
  const {
    getProducts,
    isLoading,
    showFavouritePage,
    listOFavouriteProducts,
    listOfProducts,
    pageCounter,
    error,
  } = useContext(ProductContext);

  useEffect(() => {
    pageCounter === 1 && getProducts();
  }, []);

  const listToRender = showFavouritePage
    ? listOFavouriteProducts
    : listOfProducts;

  const renderList = () => {
    if (error) {
      return <ErrorComponent />;
    }

    if (showFavouritePage && listOFavouriteProducts.length === 0) {
      return (
        <div className="empty-favourite-list">
          <p>Ops, looks like you don't have any favorite beers yet!</p>
        </div>
      );
    } else {
      return listToRender.map((product) => {
        return <BeerCard key={product.id} product={product} />;
      });
    }
  };

  return (
    <>
      <div className="beer-list-container">
        <ul className="beer-list">{renderList()}</ul>
      </div>

      {isLoading && <LoadingComponent />}
      {!showFavouritePage && (
        <button
          onClick={(e) => {
            e.preventDefault();
            getProducts();
          }}
          disabled={isLoading || error}
          className="show-more"
        >
          Show more
        </button>
      )}
    </>
  );
};
