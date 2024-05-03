import React from "react";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import Navbar from "../components/Navbar/Navbar";

function ProductDetailsPage() {
  return (
    <div>
      <Navbar>
        <ProductDetails />
      </Navbar>
    </div>
  );
}

export default ProductDetailsPage;
