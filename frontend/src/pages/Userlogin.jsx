import React, { useState , useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { UserDataContext } from '../context/UserContext';

import axios from 'axios'

const Userlogin = () => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")


    const [userData, setuserData] = useState({})

    const {user , setUser} = useContext(UserDataContext);

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        // Handle login logic here
        const userData = {
            email : email,
            password : password
        }

        const respone  = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/login` , userData);
        if (respone.status === 200) {
            const data = respone.data;

            setUser(data)

            localStorage.setItem("token" , data.token);

            navigate('/landing')
        }
        



        setemail("");
        setpassword("");
    }
  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-gray-100">
      {/* Header */}
      <div className="p-6 md:p-10">
        <h1
          style={{ fontFamily: 'Quantico, sans-serif' }}
          className="text-3xl text-black font-bold"
        >
          Cabsy
        </h1>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex justify-center items-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Login to your account
          </h2>

          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            New to Cabsy?{' '}
            <Link to="/signup" className="text-black font-medium hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Continue as Captain */}
      <div className="text-center p-6">
        <Link to="/captain-login" className="text-black font-semibold hover:underline text-lg">
          Continue as a Captain
        </Link>
      </div>
    </div>
  );
};

export default Userlogin;
