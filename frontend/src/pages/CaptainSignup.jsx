import React, { useState , useContext} from 'react';
import { Link } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainSignup = () => {
    const [fullname, setFullname] = useState({ firstname: '', lastname: '' });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [vehicle, setVehicle] = useState({
        color: '',
        plate: '',
        capacity: '',
        type: '',
    });

    const { captain, setCaptain } = useContext(CaptainDataContext);

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const newCaptain = {
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname,
            },
            email,
            password: password, 
            vehicle: {
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                type: vehicle.type,
            },
        };

       // console.log('Captain Signup Data:', newCaptain);

        const respone = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/captain/register` , newCaptain);

        //console.log(respone.data);

        if(respone.status === 201){
            const data = respone.data;

            setCaptain(data);
            localStorage.setItem("token" , data.token);

            // console.log("inn");
            navigate('/captain-landing');

        }



        // Reset form
        setFullname({ firstname: '', lastname: '' });
        setEmail('');
        setPassword('');
        setVehicle({ color: '', plate: '', capacity: '', type: '' });
    };

    return (
        <div className="min-h-screen w-full flex flex-col justify-between bg-gray-100">
            {/* Header */}
            <div className="p-6 md:p-10">
                <h1
                    style={{ fontFamily: 'Quantico, sans-serif' }}
                    className="text-3xl text-black font-bold"
                >
                    Cabsy
                </h1>
            </div>

            {/* Signup Form */}
            <div className="flex-1 flex justify-center items-center">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center">
                        Captain Registration
                    </h2>

                    <form className="space-y-4" onSubmit={submitHandler}>
                        {/* Full Name */}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={fullname.firstname}
                                onChange={(e) =>
                                    setFullname({ ...fullname, firstname: e.target.value })
                                }
                                className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={fullname.lastname}
                                onChange={(e) =>
                                    setFullname({ ...fullname, lastname: e.target.value })
                                }
                                className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        {/* Email */}
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />

                        {/* Password */}
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />

                        {/* Vehicle Info */}
                        <input
                            type="text"
                            placeholder="Vehicle Color"
                            value={vehicle.color}
                            onChange={(e) => setVehicle({ ...vehicle, color: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Plate Number"
                            value={vehicle.plate}
                            onChange={(e) => setVehicle({ ...vehicle, plate: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Capacity"
                            value={vehicle.capacity}
                            onChange={(e) =>
                                setVehicle({ ...vehicle, capacity: e.target.value })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                        <select
                            value={vehicle.type}
                            onChange={(e) => setVehicle({ ...vehicle, type: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="" disabled className='text-gray-600'>
                                Select Vehicle Type
                            </option>
                            <option value="Car">Car</option>
                            <option value="Motorcycle">Motorcycle</option>
                            <option value="Auto">Auto</option>
                        </select>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            to="/captain-login"
                            className="text-black font-medium hover:underline"
                        >
                            Login here
                        </Link>
                    </p>
                </div>
            </div>

            {/* Continue as User */}
            <div className="p-6 text-center">
                <Link
                    to="/login"
                    className="text-lg font-semibold text-black hover:underline"
                >
                    Continue as a User
                </Link>
            </div>

        </div>
    );
};

export default CaptainSignup;
