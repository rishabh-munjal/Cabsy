import React from "react";
import { Children } from "react";
import { createContext , useState , useContext } from "react";

export const RideDataContext = createContext();

const RideContext = ({children}) => {
    const [ride , setRide] = useState(null);
    const [captainRide , setCaptainRide] = useState(null);

    return(
        <RideDataContext.Provider value = {{ride , setRide, captainRide, setCaptainRide}}>
            {children}
        </RideDataContext.Provider>
    )
}

export default RideContext


