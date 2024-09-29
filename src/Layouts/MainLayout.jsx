import { useState } from "react";
import SideBar from "../components/Dashboard/SideBar";
// import Footer from "../components/Dashboard/Footer";
import NavBar from "../components/Dashboard/NavBar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <SideBar sidebarOpen={sidebarOpen} />
        <div className={`${sidebarOpen ? "" : "ml-64"} w-full`}>
          <NavBar sidebarOpen={sidebarOpen} setSideBarOpen={setSidebarOpen} />
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default MainLayout;
