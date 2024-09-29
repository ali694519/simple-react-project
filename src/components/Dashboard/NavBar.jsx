import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { Link } from "react-router-dom";

function NavBar({ sidebarOpen, setSideBarOpen }) {
  return (
    <nav>
      <div className="bg-gray-800 px-4 py-3 flex justify-between">
        <div className="flex items-center text-xl">
          <FaBars className="text-white me-4 cursor-pointer" onClick={() => setSideBarOpen(!sidebarOpen)} />
          <span className="text-white font-semibold">E-commerce</span>
        </div>
        <div className="flex items-center gap-x-5">
          <div className="relative md:w-65">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button className="p-1 focus:outline-none text-white md:text-black">
                <FcSearch />
              </button>
            </span>
            <input
              type="text"
              className="w-full px-4 py-1 pl-12 rounded shadow outline-none hidden md:block"
              placeholder="Search..."
            />
          </div>
          <div className="text-white">
            <FaBell className="w-6 h-6" />
          </div>
          <div className="relative group">
            <button className="text-white">
              <FaUserCircle className="w-6 h-6 mt-1" />
            </button>

            <div className="z-10 hidden absolute bg-white rounded-lg w-32 group-hover:block group-focus:block top-full right-0">
              <ul className="py-2 text-gray-950">
                <li className="px-4 py-2 hover:bg-gray-200">
                  <Link to={'/'}>Website</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <a href="#">Settings</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200">
                  <a href="#">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
