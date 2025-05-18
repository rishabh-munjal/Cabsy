import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectionWrapper = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { setCaptain } = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // If no token, redirect immediately
        if (!token) {
            navigate('/captain-login');
            return;
        }

        // Validate token and get profile
        const fetchCaptain = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/captain/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setCaptain(response.data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Token validation failed:", error);
                navigate('/captain-login');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCaptain();
    }, [token, navigate, setCaptain]);

    if (isLoading) {
        return <div className="text-center mt-10 text-lg font-medium">Loading...</div>;
    }

    return <>{children}</>;
};

export default CaptainProtectionWrapper;
