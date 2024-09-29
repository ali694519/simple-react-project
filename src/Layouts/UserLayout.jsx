import Footer from "../components/User/Footer";
import Header from "../components/User/Header";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default UserLayout