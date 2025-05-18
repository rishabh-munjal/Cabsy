import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainLogin = () => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const {captain , setCaptain} = useContext(CaptainDataContext);
    const navigate = useNavigate();


    const submitHandler = async (e) => {
        e.preventDefault();
        // Handle login logic here
        const captainData = {
            email: email,
            password: password
        }

        //console.log(captainData);


        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/captain/login`, captainData);
        if (response.status === 200) {
            const data = response.data;

            setCaptain(data);

            localStorage.setItem("token", data.token);

            //console.log(data);

            navigate('/captain-landing');
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
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center">
                        Captain Login
                    </h2>

                    <form className="space-y-4" onSubmit={submitHandler}>
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
                        New to Cabsy Captain?{' '}
                        <Link to="/captain-signup" className="text-black font-medium hover:underline">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>

            {/* Continue as User */}
            <div className="p-6 text-center">
                <Link
                    to="/login"
                    className="text-lg font-semibold text-black hover:underline"
                >
                    Continue as a User
                </Link>
            </div>
        </div>
    );
};

export default CaptainLogin;
