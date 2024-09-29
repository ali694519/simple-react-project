import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

function Header() {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  const nav = useNavigate();
  async function handleLogout() {
    try {
      if (!token) {
        console.error("No token found in cookies");
        return;
      }
      await axios.post(`http://127.0.0.1:8000/api/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      cookie.remove("Bearer");
      nav('/');
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <nav className="bg-slate-100 border-b border-gray-200">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold text-blue-900">MyApp</span>
        </Link>

        <div className="w-full md:block md:w-auto">
          <ul className="flex justify-between items-center p-4 border-b border-gray-100 md:border-0">
            <li className="mr-auto">
              <Link to="/" className="py-2 px-3 text-blue-700 hover:text-blue-900 font-bold">
                Home
              </Link>
            </li>

            <div className="flex space-x-4">
              {token ? (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      className="py-2 px-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="py-2 px-3 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="py-2 px-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="py-2 px-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
