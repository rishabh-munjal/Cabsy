import React, { useState, useContext, useEffect } from "react";
import { LogOut } from "lucide-react";
import {
  FaClock,
  FaTachometerAlt,
  FaRegClipboard,
} from "react-icons/fa";
import RideRequestModal from "../components/RideRequestModal";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";
import { RideDataContext } from "../context/RideContext";
import axios from 'axios'
import LiveTracking from "../components/LiveTraking";

const CaptainLanding = () => {
  const [showRideRequest, setShowRideRequest] = useState(false);

  const { captainRide, setCaptainRide } = useContext(RideDataContext);
  const [ride, setRide] = React.useState({
    _id: "",
    user: {
      _id: "",
      firstname: "",
      email: "",
    },
    pickup: "",
    destination: "",
    fare: 0,
    status: "",
  });

  const navigate = useNavigate();
  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (captain?.captain?._id) {
      socket.emit("join", {
        userId: captain.captain._id,
        userType: "captain",
      });
    }

    const updateLocation = () => {
      if (navigator.geolocation && captain?.captain?._id) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("update-location-captain", {
              userId: captain.captain._id,
              location: {
                ltd: latitude,
                lng: longitude,
              },
            });
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      }
    };

    const intervalId = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(intervalId);
  }, [socket, captain?.captain?._id]);

  useEffect(() => {
    socket.on("new-ride", (data) => {
      setShowRideRequest(true);
      setRide(data);
    });

    return () => {
      socket.off("new-ride");
    };
  }, [socket]);

  if (!captain?.captain) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">Loading captain data...</div>
      </div>
    );
  }

  const stats = {
    name: `${captain.captain.fullname?.firstname ?? "Captain"} ${captain.captain.fullname?.lastname ?? ""}`,
    earnings: "₹1,450.00",
    online1: "4.2",
    online2: "4.2",
    online3: "4.2",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold tracking-wide text-[#2d2d2d] font-quantico">Cabsy</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </header>

      {/* Map Section */}
      <section className="flex-1 relative">
        <div className="absolute inset-0">
          <LiveTracking />
        </div>
        {/* Overlay for subtle darkening */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-100 opacity-80 pointer-events-none" />
      </section>

      {/* Bottom Card */}
      <section className="relative z-10">
        <div className="max-w-2xl mx-auto -mt-16 pb-8 px-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            {/* Profile and Earnings */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <img
                  className="h-12 w-12 rounded-full border-2 border-gray-200 object-cover"
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Captain"
                />
                <div>
                  <p className="text-lg font-semibold capitalize">{stats.name}</p>
                  <span className="text-xs text-green-500 font-medium">Online ●</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">{stats.earnings}</p>
                <p className="text-xs text-gray-500">Earned</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center text-lg bg-gray-50 p-4 rounded-lg">
              <div className="flex flex-col items-center gap-1">
                <FaClock className="text-blue-500 text-2xl" />
                <p className="font-semibold">{stats.online1}</p>
                <span className="text-xs text-gray-500">Hours Online</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <FaTachometerAlt className="text-yellow-500 text-2xl" />
                <p className="font-semibold">{stats.online2}</p>
                <span className="text-xs text-gray-500">Rating</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <FaRegClipboard className="text-purple-500 text-2xl" />
                <p className="font-semibold">{stats.online3}</p>
                <span className="text-xs text-gray-500">Trips</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ride Request Modal */}
      <RideRequestModal
        visible={showRideRequest}
        onAccept={async () => {
          setShowRideRequest(false);
          try {
            const response = await axios.post(
              `${import.meta.env.VITE_BASE_URL}/api/ride/confirm`,
              { rideId: ride._id },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            setCaptainRide(response.data);
            navigate("/captain-riding");
          } catch (error) {
            console.error("Error confirming ride:", error.response?.data || error.message);
          }
        }}
        onIgnore={() => {
          setShowRideRequest(false);
        }}
        rideDetails={ride}
      />
    </div>
  );
};

export default CaptainLanding;
