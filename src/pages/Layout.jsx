import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen font-belleza">
      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
