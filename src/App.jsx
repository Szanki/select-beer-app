import React from "react";
import { ProductList } from "./pages/ProductList";
import { ProductContextProvider } from "./context/productContext";

function App() {
  return (
    <ProductContextProvider>
      <div className="App">
        <ProductList />
      </div>
    </ProductContextProvider>
  );
}

export default App;
