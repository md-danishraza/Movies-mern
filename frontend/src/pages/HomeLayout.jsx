import React from "react";
import { Outlet } from "react-router-dom";
import Navigations from "./auth/Navigations";
import Footer from "../components/Footer";

import Loader from "../components/Loader";

function HomeLayout() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navigations />
      <div className="py-3">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default HomeLayout;
