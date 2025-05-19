import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { FaMapMarkerAlt, FaRoute, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CaptainRiding = () => {
  const [rideStarted, setRideStarted] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpInput, setOtpInput] = useState("");

  const navigate = useNavigate();

  const rideInfo = {
    otp: "2468",
    direction: "North-East",
    distance: "7.5 km",
    eta: "15 min",
  };

  const verifyOtp = () => {
    if (otpInput === rideInfo.otp) {
      setOtpVerified(true);
      alert("OTP Verified");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="h-screen w-full font-sans bg-[#f9fafb] text-black flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 px-4 py-3 flex items-center justify-between z-10">
        <h1 className="text-2xl font-bold tracking-wide" style={{ fontFamily: "Quantico, sans-serif" }}>
          Cabsy
        </h1>
        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 bg-red-700 text-white text-sm font-medium rounded-md hover:bg-red-800 transition">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Map */}
      <div className="flex-1 bg-gray-200 relative">
        <div className="h-full w-full flex items-center justify-center text-gray-500 italic text-sm">
          Map loading...
        </div>
      </div>

      {/* Ride Info Card */}
      <div className="bg-white px-6 py-6 shadow-xl ">
        {/* OTP or Ride Info */}
        {!rideStarted ? (
          <>
            {!otpVerified ? (
              <>
                <h2 className="text-lg font-semibold mb-2">Verify Ride OTP</h2>
                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    placeholder="Enter OTP"
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none w-full"
                  />
                  <button
                    onClick={verifyOtp}
                    className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition"
                  >
                    Verify
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold mb-2">Trip Details</h2>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <FaRoute className="text-xl text-gray-600" />
                    <p className="font-medium">{rideInfo.distance}</p>
                    <span className="text-xs text-gray-500">Distance</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaMapMarkerAlt className="text-xl text-gray-600" />
                    <p className="font-medium">{rideInfo.direction}</p>
                    <span className="text-xs text-gray-500">Direction</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <FaClock className="text-xl text-gray-600" />
                    <p className="font-medium">{rideInfo.eta}</p>
                    <span className="text-xs text-gray-500">ETA</span>
                  </div>
                </div>
                <button
                  onClick={() => setRideStarted(true)}
                  className="mt-6 w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900 transition"
                >
                  Start Ride
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-2">Ride In Progress</h2>
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>Distance: {rideInfo.distance}</span>
              <span>ETA: {rideInfo.eta}</span>
            </div>
            <button
              onClick={() => {
                setRideStarted(false);
                setOtpVerified(false);
                setOtpInput("");
                alert("Ride Completed");
                navigate("/captain-landing");
                
              }}
              className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition"
            >
              Finish Ride
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CaptainRiding;
