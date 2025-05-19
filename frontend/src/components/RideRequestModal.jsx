import React, { useEffect, useRef } from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

const RideRequestModal = ({ visible, onAccept, onIgnore, rideDetails }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (visible && audioRef.current) {
      audioRef.current.play().catch((e) => {
        console.log("Autoplay blocked. User interaction needed.");
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Sound alert */}
      <audio ref={audioRef} src="/alert.mp3" preload="auto" />

      {/* Soft dark backdrop */}
      <div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50">
        {/* Modal Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md transform transition-all duration-300 scale-95 animate-fadeInUp">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">🚖 New Ride Request</h2>
            <p className="text-sm text-gray-500">Incoming ride request details</p>
          </div>

          <div className="space-y-3 text-gray-700">
            <div className="flex items-center gap-3">
              <FaUser className="text-gray-500" />
              <span>{rideDetails.customer}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-emerald-500" />
              <span>{rideDetails.pickup}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMoneyBillWave className="text-green-500" />
              <span>₹{rideDetails.fare}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Distance: {rideDetails.distance} km</span>
              <span>ETA: {rideDetails.eta || "5 min"}</span>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={onIgnore}
              className="flex-1 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg py-2 hover:bg-gray-200 transition"
            >
              Ignore
            </button>
            <button
              onClick={onAccept}
              className="flex-1 bg-emerald-500 text-white rounded-lg py-2 hover:bg-emerald-600 transition"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RideRequestModal;
