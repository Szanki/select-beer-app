import React, { useContext } from "react";
import { ProductContext } from "../context/productContext";

export const ErrorComponent = () => {
  const { error } = useContext(ProductContext);

  return <div className="error-component">{error}</div>;
};
