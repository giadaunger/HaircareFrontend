import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen font-belleza">
      <Navbar />
      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
