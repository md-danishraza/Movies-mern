import React from "react";
import { Outlet } from "react-router-dom";
import Navigations from "./auth/Navigations";
import Footer from "../components/Footer";
import { useNavigation } from "react-router-dom";
import Loader from "../components/Loader";
function HomeLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state == "loading";
  return (
    <main className="flex flex-col min-h-screen">
      <Navigations />

      <div className="py-3">{isLoading ? <Loader /> : <Outlet />}</div>
      <Footer />
    </main>
  );
}

export default HomeLayout;
