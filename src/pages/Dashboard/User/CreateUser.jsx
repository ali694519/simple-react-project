import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Context/UserContext";

function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordR, setPasswordR] = useState('');
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const nav = useNavigate();

  const context = useContext(User);
  const token = context.auth.token;

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      let res = await axios.post(`http://127.0.0.1:8000/api/user/create`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordR
      }, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (res.status === 200) {
        nav(`/dashboard/users`);
      }
    } catch (error) {
      setEmailError(true);
    }
    setAccept(true);
  }


  return (

    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Create new user</h1>
        <form className="space-y-4" action="" onSubmit={Submit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-900 mb-2">
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              autoComplete="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {name === '' && accept && <p className="text-red-600">Name is Required</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-900 mb-2">
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
              placeholder="name@company.com"
              required
              value={email}
              autoComplete="new-email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {accept && emailError === 422 && <p className="text-red-600">Email is already been taken</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-blue-900 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
              placeholder="••••••••"
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {password.length < 8 && accept && <p className="text-red-600">Password must be more than 8 characters</p>}
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-blue-900 mb-2">
              Confirm password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600"
              placeholder="••••••••"
              value={passwordR}
              onChange={(e) => setPasswordR(e.target.value)}
            />
            {passwordR !== password && accept && <p className="text-red-600">Password does not match</p>}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300"
          >
            Save
          </button>

        </form>
      </div >
    </div >

  )
}

export default CreateUser