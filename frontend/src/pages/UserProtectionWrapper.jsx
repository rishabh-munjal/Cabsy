import React , {useContext , useEffect} from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const UserProtectionWrapper = ({children}) => {

    //const {user}  = useContext(UserDataContext);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    // if(!token){
    //     navigate('/login'); 
    // }

    useEffect(() => {
      if(!token){
        navigate('/login');
      }

    }, [token])
    


  return (
    <div>
        {children}
    </div>
  )
}

export default UserProtectionWrapper
