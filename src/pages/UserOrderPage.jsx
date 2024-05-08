import React from "react";
import UserOrders from "../components/User/UserOrders";
import Navbar from "../components/Navbar/Navbar";

function UserOrderPage() {
  return (
    <>
      <Navbar>
        <UserOrders></UserOrders>
      </Navbar>
    </>
  );
}

export default UserOrderPage;
