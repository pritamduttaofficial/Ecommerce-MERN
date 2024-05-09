import React from "react";
import AdminProductDetails from "../features/admin/adminComponents/AdminProductDetails";
import Navbar from "../components/Navbar/Navbar";

function AdminProductDetailsPage() {
  return (
    <>
      <Navbar>
        <AdminProductDetails></AdminProductDetails>
      </Navbar>
    </>
  );
}

export default AdminProductDetailsPage;
