import React, { useContext } from "react";
import { BeerList } from "../components/BeerList";
import { Header } from "../components/Header";
import { ProductContext } from "../context/productContext";

export const ProductList = () => {
  const { getProducts } = useContext(ProductContext);
  getProducts();
  return (
    <div>
      <Header />
      <BeerList />
    </div>
  );
};
