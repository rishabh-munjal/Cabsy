import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainLogout = () => {

    const token  = localStograge.getItem("token");
    const navigate = useNavigate();

    axios.get(`${import.meta.env.VITE_BASE_URL}/api/captain/logout` , {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }).then((response) => {

        if(response.status === 200)

            localStorage.removeItem("token")

            navigate('/');


    })
  return (
    <div>
      
    </div>
  )
}

export default CaptainLogout
