import React, { useState } from 'react';
import { MapPin, ArrowRight, LogOut, X, UserRound } from 'lucide-react';
import taxiIcon from '../assets/taxi.png';
import motoIcon from '../assets/moto.png';
import autoIcon from '../assets/auto.png';
import { Link } from 'react-router-dom';

const rideOptions = [
    {
        type: 'Car',
        image: taxiIcon,
        price: '₹190',
        capacity: '4',
        tagline: 'Comfortable and spacious rides',
    },
    {
        type: 'Motorcycle',
        image: motoIcon,
        price: '₹80',
        capacity: '1',
        tagline: 'Quick and agile rides',
    },
    {
        type: 'Auto',
        image: autoIcon,
        price: '₹120',
        capacity: '3',
        tagline: 'Affordable, compact rides',
    },
];

const Landing = () => {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [showFormFull, setShowFormFull] = useState(false);
    const [showRides, setShowRides] = useState(false);
    const [findingDriver, setFindingDriver] = useState(false);
    const [driverAssigned, setDriverAssigned] = useState(null);
    const [selectedRide, setSelectedRide] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Source:', source);
        console.log('Destination:', destination);
        setShowFormFull(false);
        setShowRides(true);
    };

    const handleLogout = () => {
        console.log('User logged out');
    };

    const handleRideSelect = (ride) => {
        setSelectedRide(ride);
        setShowRides(false);
        setFindingDriver(true);

        setTimeout(() => {
            setFindingDriver(false);
            setDriverAssigned({
                name: 'Rahul Singh',
                vehicle: ride.type,
                price: ride.price,
                numberPlate: 'DL3CAX1234',
                phone: '+91 9876543210',
                rating: '4.8',
                image: 'https://randomuser.me/api/portraits/men/32.jpg',
            });
        }, 2500);
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-200 relative overflow-hidden">
            {/* Header */}
            <header className="p-6 shadow-md bg-white flex items-center justify-between z-20 relative">
                <h1 style={{ fontFamily: 'Quantico, sans-serif' }} className="text-3xl text-black font-extrabold tracking-wide">Cabsy</h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 border font-semibold text-black rounded-lg hover:bg-red-700 hover:text-white transition"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </header>

            {/* Map Section */}
            <div className={`transition-all duration-300 mt-4 mx-4 ${showFormFull ? 'h-0 opacity-0' : 'h-72 md:h-96 opacity-100'} bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 font-medium shadow-lg`}>
                Google Map Loading...
            </div>

            {/* Full-Screen Form Overlay */}
            <div className={`transition-all duration-300 fixed inset-0 z-30 bg-white p-6 overflow-auto ${showFormFull ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Choose Your Route</h2>
                    <button onClick={() => setShowFormFull(false)}>
                        <X className="w-6 h-6 text-gray-500 hover:text-black" />
                    </button>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 mb-1 font-medium">Source</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                                placeholder="Start typing your location..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1 font-medium">Destination</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                placeholder="Where do you want to go?"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition"
                    >
                        Find Ride <ArrowRight className="w-5 h-5" />
                    </button>
                </form>
            </div>

            {/* Quick Access Form */}
            {!showFormFull && (
                <div className="py-4 absolute bottom-0 left-0 right-0 z-10">
                    <div className="bg-white shadow-2xl rounded-xl p-4 mx-4">
                        <h1 className='font-bold text-xl mb-3'>Find a trip</h1>
                        <div className="flex flex-col gap-3 text-sm">
                            <input
                                type="text"
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                                onFocus={() => setShowFormFull(true)}
                                placeholder="Add your pickup location"
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                            />
                            <input
                                type="text"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                onFocus={() => setShowFormFull(true)}
                                placeholder="Add your destination"
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Ride Selection Modal */}
            {showRides && (
                <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center">
                    <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
                        <button
                            onClick={() => setShowRides(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-black"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-xl font-bold mb-6 text-center">Choose Your Ride</h2>

                        <div className="space-y-4">
                            {rideOptions.map((ride) => (
                                <div
                                    key={ride.type}
                                    className="flex items-center justify-between border p-3 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                                    onClick={() => handleRideSelect(ride)}
                                >
                                    <div className="flex items-center gap-4">
                                        <img src={ride.image} alt={ride.type} className="w-18 h-12" />
                                        <div>
                                            <h3 className="text-lg font-semibold">
                                                {ride.type} <UserRound className='inline align-baseline h-4 stroke-3 m-0' /> {ride.capacity}
                                            </h3>
                                            <p className="text-gray-500 text-sm">{ride.tagline}</p>
                                        </div>
                                    </div>
                                    <div className="text-lg font-semibold text-black">
                                        {ride.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Finding Driver */}
            {findingDriver && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
                        <p className="text-lg font-semibold mb-3">Finding nearby drivers...</p>
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-black"></div>
                    </div>
                </div>
            )}

            {/* Driver Assigned */}
            {driverAssigned && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Driver Assigned</h2>
                            <button onClick={() => setDriverAssigned(null)}>
                                <X className="w-5 h-5 text-gray-500 hover:text-black" />
                            </button>
                        </div>
                        <div className="flex items-center gap-4 mb-4">
                            <img src={driverAssigned.image} alt="Driver" className="w-16 h-16 rounded-full" />
                            <div>
                                <h3 className="text-lg font-semibold">{driverAssigned.name}</h3>
                                <p className="text-gray-600 text-sm">⭐ {driverAssigned.rating} Rating</p>
                                <p className="text-gray-600 text-sm">📞 {driverAssigned.phone}</p>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            <p><strong>Vehicle:</strong> {driverAssigned.vehicle}</p>
                            <p><strong>Number Plate:</strong> {driverAssigned.numberPlate}</p>
                            <p><strong>Estimated Fare:</strong> {driverAssigned.price}</p>
                        </div>
                        <Link
                            to = "/riding"
                            //onClick={() => alert("Ride Confirmed!")}
                            className="mt-6 w-full flex justify-center bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-800 transition cursor-pointer"
                        >
                            Confirm Ride
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Landing;
