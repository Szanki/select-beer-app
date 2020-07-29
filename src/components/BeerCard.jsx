import React from "react";

export const BeerCard = ({ product }) => {
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
        <button type="submit" className="favourite-btn">
          Add to Favourite
        </button>
      </div>
    </li>
  );
};
