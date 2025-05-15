import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-between bg-cover bg-center md:bg-bottom"
      style={{
        backgroundImage:
          'url(https://plus.unsplash.com/premium_vector-1726299021219-b9b740da70ff?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
      }}
    >
      {/* Optional overlay (for readability) */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Content wrapper to maintain position above overlay */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Header */}
        <div className="p-6 md:p-10">
          <h1
            style={{ fontFamily: 'Quantico, sans-serif' }}
            className="text-5xl text-white font-bold"
          >
            Cabsy
          </h1>
        </div>

        {/* Bottom card */}
        <div className="w-full">
          <div className="bg-white  p-4  shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-10">
              Get Started with Cabsy
            </h2>
            <Link to="/login" className="bg-black  text-white px-6 py-3 rounded-xl font-semibold text-xl w-full hover:bg-gray-800 transition flex items-center justify-center ">
              Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
