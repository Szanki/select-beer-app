import React from "react";
import { ProductContextProvider } from "./context/productContext";
import { Header } from "./components/Header";
import { BeerList } from "./pages/BeerList";
import "./app.scss";

function App() {
  return (
    <ProductContextProvider>
      <div className="app-container">
        <Header />
        <BeerList />
      </div>
    </ProductContextProvider>
  );
}

export default App;
