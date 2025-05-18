import React, { useState , useContext , createContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext.jsx';

const UserSignup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {user , setUser} = useContext(UserDataContext)

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      firstname,
      lastname,
      email,
      password,
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/register` , newUser);

    if (response.status === 201) {
        const data = response.data;

        setUser(data)
                    localStorage.setItem("token" , data.token);



        navigate('/landing')

    }

    console.log('User Signup Data:', newUser);

    // Reset
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
  };

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

      {/* Signup Form */}
      <div className="flex-1 flex justify-center items-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Create a new Account
          </h2>

          <form className="space-y-4" onSubmit={submitHandler}>
            {/* First and Last Name */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-black font-medium hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>

      {/* Continue as Captain */}
      <div className="p-6 text-center">
        <Link
          to="/captain-login"
          className="text-lg font-semibold text-black hover:underline"
        >
          Continue as a Captain
        </Link>
      </div>


    </div>
  );
};

export default UserSignup;
