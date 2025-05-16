import React from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../assets/view-taxi-cabs-new-york-city.jpg';

const Home = () => {
  return (
    <div
      className="h-screen w-full flex flex-col justify-between bg-cover bg-center md:bg-bottom relative"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Header */}
        <div className="p-6 md:p-10">
          <h1
            style={{ fontFamily: 'Quantico, sans-serif' }}
            className="text-3xl text-white font-bold"
          >
            Cabsy
          </h1>
        </div>

        {/* Bottom card */}
        <div className="w-full">
          <div className="bg-white rounded-t-3xl p-8 md:p-12 shadow-2xl space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Get Started with <span className="text-yellow-600">Cabsy</span>
            </h2>

            <Link
              to="/login"
              className="bg-black text-white text-lg font-semibold px-6 py-4 rounded-xl w-full block text-center hover:bg-gray-900 transition duration-200"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
