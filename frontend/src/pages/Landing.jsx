import React, { useEffect, useState , } from 'react';
import { MapPin, ArrowRight, LogOut, X, UserRound } from 'lucide-react';
import taxiIcon from '../assets/taxi.png';
import motoIcon from '../assets/moto.png';
import autoIcon from '../assets/auto.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { RideDataContext } from '../context/RideContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTraking';



// const rideOptions = [
//     {
//         type: 'Car',
//         image: taxiIcon,
//         price: '₹190',
//         capacity: '4',
//         tagline: 'Comfortable and spacious rides',
//     },
//     {
//         type: 'Motorcycle',
//         image: motoIcon,
//         price: '₹80',
//         capacity: '1',
//         tagline: 'Quick and agile rides',
//     },
//     {
//         type: 'Auto',
//         image: autoIcon,
//         price: '₹120',
//         capacity: '3',
//         tagline: 'Affordable, compact rides',
//     },
// ];

const Landing = () => {
    const navigate = useNavigate();
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [showFormFull, setShowFormFull] = useState(false);
    const [showRides, setShowRides] = useState(false);
    const [findingDriver, setFindingDriver] = useState(false);

    const [rideOptions, setRideOptions] = useState([
        {
            type: 'Auto',
            image: autoIcon,
            price: '₹--',
            capacity: '3',
            tagline: 'Affordable, compact rides',
        },
        {
            type: 'Car',
            image: taxiIcon,
            price: '₹--',
            capacity: '4',
            tagline: 'Comfortable and spacious rides',
        },
        {
            type: 'Motorcycle',
            image: motoIcon,
            price: '₹--',
            capacity: '1',
            tagline: 'Quick and agile rides',
        }
    ])
    const [driverAssigned, setDriverAssigned] = useState(null);
    const [selectedRide, setSelectedRide] = useState(null);

    //Ride options
    //     name: 'Rahul Singh',
    // vehicle: rideOptions.type,
    // price: rideOptions.price,
    // numberPlate: 'DL3CAX1234',
    // phone: '+91 9876543210',
    // rating: '4.8',
    // image: 'https://randomuser.me/api/portraits/men/32.jpg',


    // NEW: Suggestion states
    const [sourceSuggestions, setSourceSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [focusedInput, setFocusedInput] = useState(null);

    const { socket } = React.useContext(SocketContext);
    const { user } = React.useContext(UserDataContext);
    const { ride, setRide } = React.useContext(RideDataContext);

    useEffect(() => {



        console.log(user);
        if (user != null) {

            socket.emit("join", { userType: "User", userId: user._id })
        }
    }, [user, socket])




    // Helper to fetch suggestions
    const fetchSuggestions = async (input, setSuggestions) => {
        if (!input || input.length < 2) {
            setSuggestions([]);
            return;
        }
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/api/maps/get-suggestions`,
                {
                    params: { input },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            setSuggestions(res.data || []);
        } catch (err) {
            setSuggestions([]);
        }
    };

    // Handlers for input change
    const handleSourceChange = (e) => {
        const val = e.target.value;
        setSource(val);
        fetchSuggestions(val, setSourceSuggestions);
    };
    const handleDestinationChange = (e) => {
        const val = e.target.value;
        setDestination(val);
        fetchSuggestions(val, setDestinationSuggestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Source:', source);
        console.log('Destination:', destination);

        try {
            const fare = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/ride/get-fare`, {
                params: { pickup: source, destination },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });

            console.log(fare.data);

            // Update ride options with correct price from fare data
            setRideOptions((prevOptions) =>
                prevOptions.map((option) => {
                    const key = option.type.toLowerCase(); // match "Auto" with "auto"
                    const updatedPrice = fare.data[key];
                    return {
                        ...option,
                        price: updatedPrice !== undefined ? `₹${updatedPrice.toFixed(2)}` : '₹--',
                    };
                })
            );

            setShowFormFull(false);
            setShowRides(true);
        } catch (error) {
            console.error('Error fetching fare:', error);
            alert('Failed to fetch fare. Please try again.');
        }
    };


    const handleLogout = () => {
        console.log('User logged out');
    };

    const handleRideSelect = async (ride) => {
        setSelectedRide(ride);
        setShowRides(false);
        setFindingDriver(true);



        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/ride/create`,
                {
                    pickup: source,
                    destination: destination,
                    vehicleType: ride.type,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            );





        } catch (error) {
            console.error('Failed to create ride:', error);
            alert('Failed to assign a driver. Please try again.');
            setFindingDriver(false);
        }

    };

    socket.on('ride-confirmed', (data) => {
        console.log(data);
        setFindingDriver(false);
        setRide(data);
        setDriverAssigned(data);

    })

    socket.on('ride-started' , (data) => {
        setFindingDriver(false);
        setRide(data);
        navigate('/riding');
    })

    useEffect(() => {
        if (driverAssigned) {
            console.log("DRIVER ASSIGNED", driverAssigned);
        }
    }, [driverAssigned]);

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
            <div className={`transition-all duration-300 mt-4 mx-4 ${showFormFull ? 'h-0 opacity-0' : 'h-122 md:h-122 opacity-100'} bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 font-medium shadow-lg`}>
                <LiveTracking />
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
                    <div className="relative">
                        <label className="block text-gray-700 mb-1 font-medium">Source</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                value={source}
                                onChange={handleSourceChange}
                                onFocus={() => setFocusedInput('source')}
                                onBlur={() => setTimeout(() => setFocusedInput(null), 100)}
                                placeholder="Start typing your location..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                required
                                autoComplete="off"
                            />
                            {/* Suggestions Dropdown */}
                            {focusedInput === 'source' && sourceSuggestions.length > 0 && (
                                <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow z-20 max-h-48 overflow-y-auto">
                                    {sourceSuggestions.map((s, i) => (
                                        <li
                                            key={i}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onMouseDown={() => {
                                                setSource(s);
                                                setSourceSuggestions([]);
                                            }}
                                        >
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="relative">
                        <label className="block text-gray-700 mb-1 font-medium">Destination</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                value={destination}
                                onChange={handleDestinationChange}
                                onFocus={() => setFocusedInput('destination')}
                                onBlur={() => setTimeout(() => setFocusedInput(null), 100)}
                                placeholder="Where do you want to go?"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                required
                                autoComplete="off"
                            />
                            {/* Suggestions Dropdown */}
                            {focusedInput === 'destination' && destinationSuggestions.length > 0 && (
                                <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow z-20 max-h-48 overflow-y-auto">
                                    {destinationSuggestions.map((s, i) => (
                                        <li
                                            key={i}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onMouseDown={() => {
                                                setDestination(s);
                                                setDestinationSuggestions([]);
                                            }}
                                        >
                                            {s}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => { handleSubmit }}
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
                        <div className="flex flex-col gap-3 text-sm w-full ">
                            <div className="w-full ">
                                <input
                                    type="text"
                                    value={source}
                                    onChange={handleSourceChange}
                                    onFocus={() => setShowFormFull(true)}
                                    placeholder="Add your pickup location"
                                    className="px-4 py-3  w-full border border-gray-300 rounded-lg focus:outline-none"
                                    autoComplete="off"
                                />
                                {/* Optionally show suggestions here too if you want */}
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={destination}
                                    onChange={handleDestinationChange}
                                    onFocus={() => setShowFormFull(true)}
                                    placeholder="Add your destination"
                                    className="px-4 w-full py-3 border border-gray-300 rounded-lg focus:outline-none"
                                    autoComplete="off"
                                />
                                {/* Optionally show suggestions here too if you want */}
                            </div>
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
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Driver" className="w-16 h-16 rounded-full" />
                            <div>
                                <h3 className="text-lg font-semibold">{driverAssigned?.captain.fullname.firstname}</h3>
                                <p className="text-gray-600 text-sm">⭐ 4.6 Rating</p>
                                <p className="text-gray-600 text-sm">📞 +91 9876787656</p>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            <p><strong>Vehicle:</strong> {driverAssigned?.captain.vehicle.type}</p>
                            <p><strong>Number Plate:</strong> {driverAssigned?.captain.vehicle.plate}</p>
                            <p><strong>Estimated Fare:</strong> {driverAssigned.fare}</p>
                        </div>
                        <Link
                            to="/riding"
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
