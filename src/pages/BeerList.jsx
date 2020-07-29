import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context/productContext";
import { BeerCard } from "../components/BeerCard";

export const BeerList = () => {
  const { getProducts, listOfProducts } = useContext(ProductContext);

  useEffect(() => {
    getProducts();
  }, []);

  const renderList = () => {
    return listOfProducts.map((product) => {
      return <BeerCard key={product.id} product={product} />;
    });
  };

  return (
    <>
      <div className="beer-list-container">
        <ul className="beer-list">{renderList()}</ul>
      </div>
      <button className="show-more">Show more</button>
    </>
  );
};
