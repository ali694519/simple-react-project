import { Routes, Route } from 'react-router-dom';
import Home from "./Home"
import Register from "../src/pages/website/Auth/Register"
import Login from "../src/pages/website/Auth/Login"
import PersistLogin from "./pages/website/Auth/PersistLogin"
import RequireAuth from "./pages/website/Auth/RequireAuth"
import UserLayout from "./Layouts/UserLayout"
import UserHome from "./pages/website/User/UserHome"
import MainLayout from "./Layouts/MainLayout"
import Users from "./pages/Dashboard/User/Users"
import UpdateUser from "./pages/Dashboard/User/UpdateUser"
import CreateUser from "./pages/Dashboard/User/CreateUser"
import NotFound from "./NotFound"
import About from './pages/website/User/About';
import Products from './pages/Dashboard/Products/Products';
import CreateProduct from './pages/Dashboard/Products/CreateProduct';
import UpdateProduct from './pages/Dashboard/Products/UpdateProduct';
function App() {
  return (
    <div>

      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* path for website user */}
        <Route path='/' element={<UserLayout />} >
          <Route index element={<UserHome />} />
          <Route path='about' element={<About />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<PersistLogin />} >
          <Route element={<RequireAuth />} >
            <Route path='/dashboard' element={<MainLayout />} >
              <Route index element={<Home />} />
              {/* Users */}
              <Route path='users' element={<Users />} />
              <Route path='users/:id' element={<UpdateUser />} />
              <Route path='users/create' element={<CreateUser />} />
              {/* Products */}
              <Route path='products' element={<Products />} />
              <Route path='products/:id' element={<UpdateProduct />} />
              <Route path='products/create' element={<CreateProduct />} />
            </Route>
          </Route >
        </Route>
        {/* Catch-all route for 404 */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div >
  )
}

export default App