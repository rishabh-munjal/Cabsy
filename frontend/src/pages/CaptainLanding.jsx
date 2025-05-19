import React, { useState } from "react";
import { LogOut } from "lucide-react";
import {
  FaClock,
  FaTachometerAlt,
  FaRegClipboard,
} from "react-icons/fa";

import RideRequestModal from "../components/RideRequestModal";
import { useNavigate } from "react-router-dom";

const CaptainLanding = () => {
  const [showRideRequest, setShowRideRequest] = useState(true);

  const navigate = useNavigate();

  const rideDetails = {
    pickup: "21, MG Road, Bangalore",
    drop: "12, Residency Road, Bangalore",
    fare: 250,
    distance: 5.2,
    customer: "Rahul Sharma",
  };

  const stats = {
    name: "Sarthak",
    earnings: "₹1,450.00",
    online1: "4.2",
    online2: "4.2",
    online3: "4.2",
  };

  return (
    <div className="h-screen font-sans bg-[#f9fafb] text-black flex flex-col">
      {/* Top Map Area */}
      <div className="relative h-[60%] w-full bg-gray-200">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 px-4 py-3 flex items-center justify-between z-10">
          <h1
            style={{ fontFamily: "Quantico, sans-serif" }}
            className="text-2xl font-bold tracking-wide text-black"
          >
            Cabsy
          </h1>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 bg-red-700 text-white text-sm font-medium rounded-md hover:bg-red-800 transition">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Map Placeholder */}
        <div className="h-full flex items-center justify-center text-sm text-gray-600 italic">
          Map loading...
        </div>
      </div>

      {/* Bottom Card */}
      <div className="h-[40%] w-full bg-white px-6 py-6 shadow-sm border-t border-gray-100">
        {/* Profile and Earnings */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-lg">
              <img
                className="h-10 w-10 rounded-full"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt=""
              />
            </div>
            <div>
              <p className="text-lg font-semibold">{stats.name}</p>
              <span className="text-xs text-green-500 font-medium">
                Online ●
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">{stats.earnings}</p>
            <p className="text-xs text-gray-500">Earned</p>
          </div>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-3 gap-4 text-center text-lg bg-gray-200 p-5 text-black rounded-lg shadow-md">
          <div className="flex flex-col items-center gap-1">
            <FaClock className="text-black text-2xl" />
            <p className="font-semibold">{stats.online1}</p>
            <span className="text-xs">Hours Online</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <FaTachometerAlt className="text-black text-2xl" />
            <p className="font-semibold">{stats.online2}</p>
            <span className="text-xs">Rating</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <FaRegClipboard className="text-black text-2xl" />
            <p className="font-semibold">{stats.online3}</p>
            <span className="text-xs">Trips</span>
          </div>
        </div>
      </div>

      {/* Ride Request Modal */}
      <RideRequestModal
        visible={showRideRequest}
        onAccept={() => {
          setShowRideRequest(false);
          console.log("Ride Accepted");
          navigate('/captain-riding');
        }}
        onIgnore={() => {
          setShowRideRequest(false);
          console.log("Ride Ignored");
        }}
        rideDetails={rideDetails}
      />
    </div>
  );
};

export default CaptainLanding;
