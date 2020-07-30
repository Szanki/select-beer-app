import React, { useContext } from "react";
import { ProductContext } from "../context/productContext";
import { Grid } from "@material-ui/core";

export const BeerCard = ({ product }) => {
  const {
    listOFavouriteProducts,
    addProductToFavourite,
    removeProductFromFavourite,
  } = useContext(ProductContext);

  const isFavourite = listOFavouriteProducts.find(
    (element) => element.id === product.id
  );

  return (
    <Grid item xs={12} md={5} lg={4} xl={3} sm={5} className="product-card">
      <img
        className="product-card-image"
        src={product.image_url}
        alt={product.name}
      />
      <div className="product-card-descriptiion">
        <p className="product-card-name">{product.name}</p>
        <p className="product-card-tagline">{product.tagline}</p>
        <p className="product-card-about">{product.description}</p>
        {isFavourite ? (
          <button
            onClick={(e) => removeProductFromFavourite(e, product.id)}
            type="submit"
            className="favourite-btn"
          >
            Remove from Favourite
          </button>
        ) : (
          <button
            onClick={(e) => addProductToFavourite(e, product)}
            type="submit"
            className="favourite-btn"
          >
            Add to Favourite
          </button>
        )}
      </div>
    </Grid>
  );
};
