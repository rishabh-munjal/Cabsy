import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserLogout = () => {


    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/logout` , {
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
        UserLogout
    </div>
  )
}

export default UserLogout
