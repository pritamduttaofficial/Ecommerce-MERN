import React from "react";
import Navbar from "../components/Navbar/Navbar";
import ProductList from "../components/PoductList/ProductList";

function Home() {
  return (
    <div>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
    </div>
  );
}

export default Home;
