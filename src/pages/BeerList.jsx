import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context/productContext";
import { BeerCard } from "../components/BeerCard";
import { LoadingComponent } from "../components/LoadingComponent";
import { ErrorComponent } from "../components/ErrorComponent";
import { Grid } from "@material-ui/core";
import { EmptyResponseComponent } from "../components/EmptyResponseComponent";

export const BeerList = () => {
  const {
    getProducts,
    isLoading,
    showFavouritePage,
    listOFavouriteProducts,
    listOfProducts,
    pageCounter,
    error,
    isEmpty,
  } = useContext(ProductContext);

  useEffect(() => {
    pageCounter === 1 && getProducts();
  }, []);

  const listToRender = showFavouritePage
    ? listOFavouriteProducts
    : listOfProducts;

  const renderList = () => {
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

  const renderShowMoreButton = () =>
    !showFavouritePage &&
    !error &&
    !isEmpty && (
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
    );

  return (
    <>
      <Grid className="beer-list-container">
        <Grid
          container
          alignItems="center"
          justify="center"
          className="beer-list"
        >
          {renderList()}
        </Grid>
        {isEmpty && !showFavouritePage && <EmptyResponseComponent />}
        {error && !showFavouritePage && <ErrorComponent />}
      </Grid>
      {isLoading && <LoadingComponent />}
      {renderShowMoreButton()}
    </>
  );
};
