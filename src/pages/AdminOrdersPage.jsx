import React from "react";
import Navbar from "../components/Navbar/Navbar";
import AdminOrders from "../features/admin/adminComponents/AdminOrders";

function AdminOrdersPage() {
  return (
    <>
      <Navbar>
        <AdminOrders></AdminOrders>
      </Navbar>
    </>
  );
}

export default AdminOrdersPage;
