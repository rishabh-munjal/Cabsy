import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { FaMapMarkerAlt, FaRoute, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RideDataContext } from '../context/RideContext';
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const [rideStarted, setRideStarted] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpInput, setOtpInput] = useState("");

  const { captainRide } = useContext(RideDataContext);

  const navigate = useNavigate();

  const rideInfo = {
    otp: "2468",
    direction: "North-East",
    distance: "7.5 km",
    eta: "15 min",
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    //console.log(captainRide);

    //console.log(typeof (otpInput))

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/ride/start-ride`,
        {
          params: {
            rideId: captainRide._id,
            otp: otpInput,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setOtpVerified(true);
        setRideStarted(true);
        setOtpInput("");
      }
    } catch (err) {
      console.error("OTP verification failed", err);
      alert("Failed to verify OTP");
    }
  };


  return (
    <div className="h-screen w-full font-sans bg-[#f9fafb] text-black flex flex-col">
      {/* Header */}
      <header className="p-6 shadow-md bg-white flex items-center justify-between z-20 relative">
                            <h1 style={{ fontFamily: 'Quantico, sans-serif' }} className="text-3xl text-black font-extrabold tracking-wide">Cabsy</h1>
                            <button
                                className="flex items-center gap-2 px-4 py-2 border font-semibold text-black rounded-lg hover:bg-red-700 hover:text-white transition"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        </header>

      {/* Map */}
      <section className="flex-1 relative">
        <div className="absolute  m-4 inset-0">
          <LiveTracking />
                </div>
        {/* Overlay for subtle darkening */}
        
      </section>

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
              onClick={async () => {
                setRideStarted(false);
                setOtpVerified(false);
                setOtpInput("");

                let response; // ✅ Declare here so it's accessible later

                try {
                  response = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/api/ride/end-ride`,
                    {
                      rideId: captainRide._id,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                    }
                  );
                } catch (error) {
                  console.error("Error ending ride:", error);
                }

                if (response && response.status === 200) {
                  alert("Ride Completed");
                  navigate("/captain-landing");
                }
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
