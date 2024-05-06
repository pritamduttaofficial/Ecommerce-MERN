import React from "react";
import Cart from "../components/Cart/Cart";
import Navbar from "../components/Navbar/Navbar";

function CartPage() {
  return (
    <div>
      <Navbar>
        <Cart></Cart>
      </Navbar>
    </div>
  );
}

export default CartPage;
