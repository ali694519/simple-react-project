import { FaHome, FaCog } from 'react-icons/fa';
import { CiInboxIn } from "react-icons/ci";
import { HiUsers } from "react-icons/hi";
import { IoIosAddCircle } from "react-icons/io";
import { FaProductHunt } from "react-icons/fa6";

import { NavLink } from 'react-router-dom';

function SideBar({ sidebarOpen }) {
  return (
    <div className={`${sidebarOpen ? "hidden" : "block"} w-64 bg-gray-800 fixed h-full px-4 py-2`}>
      <div className='my-2 mb-4'>
        <h1 className="text-2xl text-white font-bold">Admin Dashboard</h1>
      </div>
      <hr />
      <ul className='mt-3 text-white font-bold'>
        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <NavLink
            to={'/dashboard'}
            className="px-3"
          >
            <FaHome className='inline-block w-6 h-6 mr-2 mt-2'></FaHome>
            Home
          </NavLink>
        </li>

        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <NavLink to={'/dashboard/users'} className="px-3">
            <HiUsers className='inline-block w-6 h-6 mr-2 mt-2' />
            Users
          </NavLink>
        </li>

        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <NavLink to={'/dashboard/users/create'} className="px-3">
            <IoIosAddCircle className='inline-block w-6 h-6 mr-2 mt-2' />
            New User
          </NavLink>
        </li>

        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <NavLink to={'/dashboard/products'} className="px-3">
            <FaProductHunt className='inline-block w-6 h-6 mr-2 mt-2'></FaProductHunt>
            Products
          </NavLink>
        </li>

        <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
          <NavLink to={'/dashboard/products/create'} className="px-3" >
            <IoIosAddCircle className='inline-block w-6 h-6 mr-2 mt-2'></IoIosAddCircle >
            New Products
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
