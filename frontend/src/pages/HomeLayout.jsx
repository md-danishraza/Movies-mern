import React from "react";
import { Outlet } from "react-router-dom";
import Navigations from "./auth/Navigations";
function HomeLayout() {
  return (
    <>
      <Navigations />
      <div className="py-3">
        <Outlet />
      </div>
    </>
  );
}

export default HomeLayout;
