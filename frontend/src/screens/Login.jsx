import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios.js"; // fixed path
import {UserContext} from '../context/user.context.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useContext( UserContext )

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/users/login', {
        email,
        password,
      });
      console.log(res.data);

      localStorage.setItem('token', res.data.token)
      setUser(res.data.user);

      navigate('/');
    } catch (err) {
      console.log(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-gray-400 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 sm:p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 sm:p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 px-4 rounded transition-colors text-sm sm:text-base"
          >
            Login
          </button>
        </form>

        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
