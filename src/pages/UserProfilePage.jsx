import React from "react";
import UserProfile from "../components/User/UserProfile";
import Navbar from "../components/Navbar/Navbar";

function UserOrderPage() {
  return (
    <>
      <Navbar>
        <UserProfile></UserProfile>
      </Navbar>
    </>
  );
}

export default UserOrderPage;
