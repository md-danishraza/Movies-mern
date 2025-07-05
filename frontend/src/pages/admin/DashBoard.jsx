import React from "react";
import AdminMain from "../../components/dashboard/AdminMain";
import AdminSidebar from "../../components/dashboard/AdminSidebar";

function DashBoard() {
  return (
    <div>
      <AdminSidebar />
      <AdminMain />
    </div>
  );
}

export default DashBoard;
