import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { User } from "../../Context/UserContext";
import Cookies from "universal-cookie";


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accept, setAccept] = useState(false);
  const [err, setErr] = useState(false);
  const nav = useNavigate();
  const userNow = useContext(User);
  //Cookies
  const cookie = new Cookies();

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/login', {
        email: email,
        password: password,
      });
      if (res.status === 200) {
        const token = res.data.data.token;
        cookie.set("Bearer", token, { path: "/" });
        const userDetails = res.data.data.user;
        userNow.setAuth({ token, userDetails });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have logged in successfully",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        });

        setTimeout(() => {
          nav('/');
        }, 2000);
      }
    }
    catch (error) {
      if (error.response.status === 401) {
        setErr(true);
      }
      // setAccept(true);
      setAccept(false);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Sign in to your account</h1>
        <form className="space-y-4" onSubmit={Submit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-900 mb-2">Your email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
              placeholder="name@company.com"
              required
              autoComplete="new-email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-blue-900 mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
              placeholder="••••••••"
              required
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {password.length < 8 && accept && <p className="text-red-600">Password must be more than 8 characters</p>}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-primary-300"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-500">Remember me</label>
            </div>
            <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2.5 bg-blue-600 hover:bg-primary-700 text-white font-medium rounded-lg focus:ring-4 focus:ring-primary-300"
          >
            Sign in
          </button>
          {accept && err && <p className="text-red-600">Wrong Email or Password</p>}
          <p className="text-sm text-gray-500">
            Don’t have an account yet?{" "}
            <Link to="/register" className="font-medium text-primary-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
