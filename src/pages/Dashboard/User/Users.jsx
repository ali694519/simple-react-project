import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { User } from "../../Context/UserContext";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [runUserEffect, setRun] = useState(0);
  const token = useContext(User);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/user/show", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token.auth.token}`
      }
    })
      .then((data) => {
        setUsers(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, [runUserEffect]);

  function deleteUser(id) {
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token.auth.token}`
          }
        })
          .then(() => {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            setRun((prev) => prev + 1);
          })
          .catch(() => {
            Swal.fire("Error!", "There was an error deleting the user.", "error");
          });
      }
    });
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <hr className="p-2" />
      {loading ? (
        <div role="status" className="max-w-sm animate-pulse">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full  text-left text-white ">
            <thead className="text-white font-bold uppercase dark:bg-gray-600 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Id</th>
                <th scope="col" className="px-6 py-3">User</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4 flex space-x-4">
                      <Link to={`${user.id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => deleteUser(user.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )
      }
    </div >
  );
}

export default Users;
