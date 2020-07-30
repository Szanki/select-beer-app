import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context/productContext";
import { BeerCard } from "../components/BeerCard";
import { LoadingComponent } from "../components/LoadingComponent";

export const BeerList = () => {
  const {
    getProducts,
    isLoading,
    showFavouritePage,
    listOFavouriteProducts,
    listOfProducts,
  } = useContext(ProductContext);

  useEffect(() => {
    listOfProducts.length === 0 && getProducts();
  }, []);

  const listToRender = showFavouritePage
    ? listOFavouriteProducts
    : listOfProducts;

  const renderList = () => {
    if (showFavouritePage && listOFavouriteProducts.length === 0) {
      return <div>Ops, looks like you don't have any favorite beers yet!</div>;
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
      {!showFavouritePage && (
        <button disabled={isLoading} className="show-more">
          Show more
        </button>
      )}
      {isLoading && <LoadingComponent />}
    </>
  );
};
