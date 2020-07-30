import React, { useContext } from "react";
import { ProductContext } from "../context/productContext";

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
    <li className="product-card">
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
    </li>
  );
};
