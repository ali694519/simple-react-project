import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { User } from "../../Context/UserContext"
import Loading from "../../../components/Loading";
import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";



function PersistLogin() {
  const [loading, setLoading] = useState(true);
  //Get paren user
  const context = useContext(User);
  const token = context.auth.token;

  //cookies

  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");


  //send refresh token
  useEffect(() => {
    async function refresh() {

      try {
        await axios.post(`http://127.0.0.1:8000/api/refresh`, null, {
          headers: {
            Authorization: "Bearer " + getToken,
          },
        }).then((data) => {
          cookie.set("Bearer", data.data.token, { path: "/" });
          context.setAuth((prev) => {
            return { userDetails: data.data.user, token: data.data.token };
          }
          );
        }
        );
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    !token ? refresh() : setLoading(false);
  }, []);



  return (
    loading ? <Loading /> : <Outlet />
  )
}

export default PersistLogin


