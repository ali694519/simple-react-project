import { useContext } from "react";
import { User } from "../../Context/UserContext";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function RequireAuth() {
  const user = useContext(User);
  const location = useLocation();
  return user.auth.userDetails ? (<Outlet />) :
    (<Navigate state={{ from: location }} replace to="/login" />);
}

export default RequireAuth;