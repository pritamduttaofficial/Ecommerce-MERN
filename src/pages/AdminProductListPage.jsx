import React from "react";
import AdminProductList from "../features/admin/adminComponents/AdminProductList";
import Navbar from "../components/Navbar/Navbar";

function AdminProductListPage() {
  return (
    <>
      <Navbar>
        <AdminProductList></AdminProductList>
      </Navbar>
    </>
  );
}

export default AdminProductListPage;
