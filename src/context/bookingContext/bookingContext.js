'use client'

import { createContext, useContext, useEffect, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [bookingVehicleData, setBookingVehicleData] = useState({})
    const [vehicleSesionData, setVehicleSesionData] = useState({})
    const [extraQuantities, setExtraQuantities] = useState({});
    const [userType, setUserType] = useState('guest')
    const [userData, setUserData] = useState({})
    const [activeShuttle, setActiveShuttle] = useState(3);
    const [countryCode, setCountryCode] = useState('')
    const [selectedCountryDetails, setSelectedCountryDetails] = useState()
    const [bookingPayload, setBookingPayload] = useState({
        booking: {
            car_id: null,
            pickup_location: "",
            drop_location: "",
            pickup_time: "",
            drop_time: "",
            extras: [],
            insurance_id: null,
            shuttle_option: 3,
            flight_number: '',
            arrival_city: ''
        },
        user: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            local_phone: "",
            country: "New Zealand",
            driver_age: '24',
            how_find_us: "Google",
            travel_reason: "Leisure",
            customer_id: null,
        }
    });

    const [errors, setErrors] = useState({});

    const [arrivlaErrors, setArrivalErrors] = useState({})

    const validateForm = () => {
        const newErrors = {};

        Object.entries(bookingPayload.user).forEach(([key, value]) => {
            if (!value || value.trim() === "") {
                newErrors[key] = "Required"; // mark field as missing
            }
        });

        setErrors(newErrors);

        // Return true if no errors
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        const sellectedVehicleSessionData = JSON.parse(sessionStorage.getItem('selected-vehicle-details'));
        
        if (Object.keys(bookingVehicleData).length === 0) {
            setBookingVehicleData(sellectedVehicleSessionData);
        }
    }, [])

    useEffect(() => {
        const handleStorageChange = () => {
            const storedData = sessionStorage.getItem("selected-vehicle-details");
            if (storedData) {
                setVehicleSesionData(JSON.parse(storedData));
            }

            
        };

        // Run once on mount
        handleStorageChange();

        // Listen to storage changes (cross-tab)
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const storedData = sessionStorage.getItem("user-data");
            if (storedData) {
                setUserType('Member')
                setUserData(JSON.parse(storedData));
            } else {
                setUserType('guest')
            }
        };

        handleStorageChange()

        // // Run once on mount
        // handleStorageChange();

        // // Listen to storage changes (cross-tab)
        // window.addEventListener("storage", handleStorageChange);

        // return () => {
        //     window.removeEventListener("storage", handleStorageChange);
        // };
    }, []);

    return (
        <BookingContext.Provider value={{
            bookingPayload,
            setBookingPayload,
            bookingVehicleData,
            setBookingVehicleData,
            extraQuantities,
            setExtraQuantities,
            validateForm,
            errors,
            setErrors,
            vehicleSesionData,
            setVehicleSesionData,
            userType, 
            setUserType, 
            userData, 
            setUserData,
            activeShuttle, 
            setActiveShuttle,
            countryCode, 
            setCountryCode,
            selectedCountryDetails, 
            setSelectedCountryDetails,
            arrivlaErrors, 
            setArrivalErrors,
        }}>
            {children}
        </BookingContext.Provider>
    )
}

export const useBookingContext = () => useContext(BookingContext)