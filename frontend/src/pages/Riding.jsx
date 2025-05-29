import React from 'react';
import taxiIcon from '../assets/taxi.png'; // Replace with your taxi icon path
import { FaMapMarkerAlt, FaMoneyBillAlt, FaCarAlt, FaPhoneAlt } from 'react-icons/fa';
import { RideDataContext } from '../context/RideContext';
import {SocketContext} from '../context/SocketContext';
import { useEffect , useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';
import { LogOut } from 'lucide-react';

const Riding = () => {
    // const rideDetails = {
    //     name: "Rahul Sharam",
    //     image: taxiIcon, // car icon
    //     rating: 4.8,
    //     phone: "+91 796546839",
    //     vehicle: "Maruti Suzuki Alto",
    //     numberPlate: "MP04 AB 1234",
    //     price: "₹193.20",
    //     source: "562/11-A, Kankariya Talab, Bhopal",
    //     paymentMode: "Cash"
    // };

    const { ride, setRide } = useContext(RideDataContext);
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();

    //console.log("This is Context of Ride", ride);

    socket.on('ride-ended' , () => {
        navigate('/landing')
    })

    return (
        <div className="relative h-screen w-full bg-gray-100">
            {/* Top Bar */}
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

            {/* Map Placeholder */}
            <div className="h-[40%] bg-grey-300 m-4 text-gray-700">
                {/* Replace with actual Google Map */}
                

                <LiveTracking />
                
            </div>

            {/* Bottom Sheet */}
            <div className="m-4  rounded-xl    bg-white  shadow-lg p-6">
                {/* Driver Info */}
                <div className="flex items-center gap-4 mb-5">
                    <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="Vehicle"
                        className="w-18 h-18 object-contain"
                    />
                    <div>
                        <p className="text-gray-600 text-sm">Driver</p>
                        <p className="text-lg font-bold">{ride.captain.fullname.firstname + " " + ride.captain.fullname.lastname}</p>
                        <p className="text-sm text-gray-500">+91 976868798</p>
                    </div>
                    <div className="ml-auto flex items-center space-x-2">
                        <FaCarAlt className="text-gray-600 text-xl" />
                        <div>
                            <p className="font-semibold">{ride.captain.vehicle.plate}</p>
                            <p className="text-sm text-gray-500">{ride.captain.vehicle.type}</p>
                        </div>
                    </div>
                </div>

                {/* Source Address */}
                <div className='flex items-above justify-between'>


                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <FaMapMarkerAlt />
                            <p className="text-sm font-medium text-gray-700">{ride.pickup}</p>
                        </div>

                        {/* Fare Info */}
                        <div className="flex items-center gap-3 mb-6">
                            <FaMoneyBillAlt />
                            <p className="text-sm font-medium text-gray-700">
                                {ride.fare.toFixed(2)} <span className="text-gray-500">Cash</span>
                            </p>
                        </div>
                    </div>
                    <div className='font-bold text-3xl mr-3'> 
                        {ride.otp}
                    </div>
                </div>

                {/* Payment Button */}
                <button className="w-full cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg text-lg">
                    Make a Payment
                </button>
            </div>
        </div>
    );
};

export default Riding;
